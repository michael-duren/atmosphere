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
            var user = _userManager.Users.FirstOrDefault(u => u.UserName == _userAccessor.GetUsername()); // get user who is making request

            if (user is null) // if user is somehow null, return error
                return Result<Unit>.Failure(new ErrorMessage(new List<string>
                    { "You must be signed in to make this request" }));

            var song = await _context.Songs.FindAsync(request.Song.Id, cancellationToken); // find song by id
            
            if (song is null) // if song is null, return error
                return Result<Unit>.Failure(new ErrorMessage(new List<string>
                    { "Song not found" }));
            
            if (song.AppUserId != user.Id)  // if song's user id does not match the user's id who is making the request, return error
                return Result<Unit>.Failure(new ErrorMessage(new List<string>
                    { "The song does not exist or you are not allowed to edit it" }));
            
            _context.ChangeTracker.Clear(); // clear change tracker to update song without error
            request.Song.AppUserId = user.Id; // set song's user id to the user's id who is making the request
            
            _context.Songs.Update(request.Song); // update song

            bool result = await _context.SaveChangesAsync(cancellationToken) > 0; // save changes to db
            
            return result
                ? Result<Unit>.Success(Unit.Value)
                : Result<Unit>.Failure(new ErrorMessage(new List<string> { "Failed to update song" }));
        }
    }
}