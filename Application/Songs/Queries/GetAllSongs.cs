using DataAccess;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Songs.Queries;

public class GetAllSongs
{
    public class Query : IRequest<ICollection<Song>>
    {
    }
    
    public class Handler : IRequestHandler<Query, ICollection<Song>>
    {
        private readonly AppDbContext _context;


        public Handler(AppDbContext context)
        {
            _context = context;
        }

        public async Task<ICollection<Song>> Handle(Query request, CancellationToken cancellationToken)
        {
            return await _context.Songs.ToListAsync(cancellationToken);
        }
    }
}