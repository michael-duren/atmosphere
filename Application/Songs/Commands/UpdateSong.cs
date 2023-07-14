using DataAccess;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Songs.Commands;

public class UpdateSong
{
    public class Command : IRequest<Unit?>
    {
        public Song Song { get; set; }
    }

    public class Handler : IRequestHandler<Command, Unit?>
    {
        private readonly AppDbContext _context;

        public Handler(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Unit?> Handle(Command request, CancellationToken cancellationToken)
        {
            _context.Songs.Update(request.Song);
            await _context.SaveChangesAsync(cancellationToken);
            return Unit.Value;
        }
    }
}