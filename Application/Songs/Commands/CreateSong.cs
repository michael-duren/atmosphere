using Application.Songs.DTOs;
using Application.Songs.Validators;
using DataAccess;
using Domain;
using FluentValidation;
using MediatR;

namespace Application.Songs.Commands;

public class CreateSong
{
    public class Command : IRequest<Unit>
    {
        public Song Song { get; set; }
    }

    public class CommandValidator : AbstractValidator<Command>
    {
        public CommandValidator()
        {
            RuleFor(x => x.Song).SetValidator(new SongValidator());
        }
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
            _context.Songs.Add(request.Song);
            await _context.SaveChangesAsync(cancellationToken);
            return Unit.Value;
        }
    }
}