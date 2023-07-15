using Application.Core;
using Application.Interfaces;
using DataAccess;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Application.Songs.Commands;

public class DeleteSong
{
    public class Command : IRequest<Result<Unit>>
    {
        public int Id { get; set; }
    }

    public class Handler : IRequestHandler<Command, Result<Unit>>
    {
        private readonly AppDbContext _context;
        private readonly IUserAccessor _userAccessor;
        private readonly UserManager<AppUser> _userManager;

        public Handler(AppDbContext context, IUserAccessor userAccessor, UserManager<AppUser> userManager)
        {
            _context = context;
            _userAccessor = userAccessor;
            _userManager = userManager;
        }

        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var song = await _context.Songs.FirstOrDefaultAsync(s => s.Id == request.Id, cancellationToken);
            var user = await _userManager.Users.FirstOrDefaultAsync(u => u.UserName == _userAccessor.GetUsername());

            if (song is null || user is null)
                return Result<Unit>.Failure(new ErrorMessage(new List<string> { "Song or user could not be found" }));

            if (song.AppUserId != user.Id)
                return Result<Unit>.Failure(new ErrorMessage(new List<string>
                    { "You are not authorized to delete this song" }));

            _context.Songs.Remove(song);
            bool result = await _context.SaveChangesAsync(cancellationToken) > 0;
            return result
                ? Result<Unit>.Success(Unit.Value)
                : Result<Unit>.Failure(new ErrorMessage(new List<string> { "Failed to delete song" }));
        }
    }
}