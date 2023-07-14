using DataAccess;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Songs.Commands;

public class DeleteSong
{
    public class Command : IRequest<Unit>
    {
        public int Id { get; set; }
    }

    public class Handler : IRequestHandler<Command, Unit>
    {
        private readonly AppDbContext _context;

        public Handler(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
        {
            var song = await _context.Songs.FirstOrDefaultAsync(s => s.Id == request.Id, cancellationToken);
            if (song != null) _context.Songs.Remove(song);
            await _context.SaveChangesAsync(cancellationToken);
            return Unit.Value;
        }
    }
}