using Application.Core;
using Application.Interfaces;
using AutoMapper;
using DataAccess;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Application.Songs.Commands;

public class UpdateSong
{
    public class Command : IRequest<Result<Unit>>
    {
        public int Id { get; set; }
        public Song Song { get; set; } = null!;
    }

    public class Handler : IRequestHandler<Command, Result<Unit>>
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;
        private readonly IUserAccessor _userAccessor;
        private readonly UserManager<AppUser> _userManager;

        public Handler(AppDbContext context, IMapper mapper, IUserAccessor userAccessor,
            UserManager<AppUser> userManager)
        {
            _context = context;
            _mapper = mapper;
            _userAccessor = userAccessor;
            _userManager = userManager;
        }

        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = _userManager.Users.FirstOrDefault(u => u.UserName == _userAccessor.GetUsername());

            if (user is null)
                return Result<Unit>.Failure(new ErrorMessage(new List<string>
                    { "You must be signed in to make this request" }));

            if (!_context.Songs.Any(s => s.Id == request.Id))
                return Result<Unit>.Failure(new ErrorMessage(new List<string>
                    { "Song not found" }));

            if (request.Song.AppUserId != user.Id)
                return Result<Unit>.Failure(new ErrorMessage(new List<string>
                    { "You are not authorized to edit this song" }));

            var song = await _context.Songs.FindAsync(request.Id, cancellationToken);
            _mapper.Map(request.Song, song);

            bool result = await _context.SaveChangesAsync(cancellationToken) > 0;
            return result
                ? Result<Unit>.Success(Unit.Value)
                : Result<Unit>.Failure(new ErrorMessage(new List<string> { "Failed to update song" }));
        }
    }
}