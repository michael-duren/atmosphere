using DataAccess;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Songs.Queries;

public class GetSongById
{
    public class Query : IRequest<Song>
    {
        public int Id { get; set; }
    }

    public class Handler : IRequestHandler<Query, Song>
    {
        private readonly AppDbContext _context;

        public Handler(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Song> Handle(Query request, CancellationToken cancellationToken)
        {
            return await _context.Songs.FirstOrDefaultAsync(s => s.Id == request.Id);
        }
    }
}