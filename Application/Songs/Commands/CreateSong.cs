using Application.Core;
using Application.Interfaces;
using Application.Songs.DTOs;
using Application.Songs.Validators;
using AutoMapper;
using DataAccess;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Songs.Commands;

public class CreateSong
{
    public class Command : IRequest<Result<Unit>>
    {
        public SongCreateDto Song { get; set; }
    }

    public class CommandValidator : AbstractValidator<Command>
    {
        public CommandValidator()
        {
            RuleFor(x => x.Song).SetValidator(new SongValidator());
        }
    }

    public class Handler : IRequestHandler<Command, Result<Unit>>
    {
        private readonly AppDbContext _context;
        private readonly IUserAccessor _userAccessor;
        private readonly IMapper _mapper;

        public Handler(AppDbContext context, IUserAccessor userAccessor, IMapper mapper)
        {
            _context = context;
            _userAccessor = userAccessor;
            _mapper = mapper;
        }

        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername(),
                cancellationToken);
            if (user is null)
                return Result<Unit>.Failure(new ErrorMessage(new List<string>
                    { "Must be logged in to create a song" }));

            var song = _mapper.Map<SongCreateDto, Song>(request.Song);

            song.AppUser = user;
            song.AppUserId = user.Id;

            _context.Songs.Add(song);
            user.Songs.Add(song);
            await _context.SaveChangesAsync(cancellationToken);
            return Result<Unit>.Success(Unit.Value);
        }
    }
}