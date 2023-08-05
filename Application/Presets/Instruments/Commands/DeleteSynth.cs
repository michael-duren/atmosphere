using Application.Core;
using Application.Interfaces;
using DataAccess;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Application.Presets.Instruments.Commands;

public class DeleteSynth
{
    public class Command : IRequest<Result<Unit>>
    {
        public int Id { get; set; }
        public string Type { get; set; } = null!;
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
            var user = await _userManager.Users.FirstOrDefaultAsync(u => u.UserName == _userAccessor.GetUsername(),
                cancellationToken: cancellationToken);
            if (user is null)
                return Result<Unit>.Failure(new ErrorMessage(new List<string> { "User could not be found" }));

            switch (request.Type!.ToLower())
            {
                case "melodic":
                    var melodicSynth = await _context.MelodicSynthPresets.Where(d => d.AppUserId == user.Id)
                        .FirstOrDefaultAsync(d => d.Id == request.Id, cancellationToken);
                    if (melodicSynth is null)
                        return Result<Unit>.Failure(new ErrorMessage(new List<string>
                            { "Melodic Synth preset could not be found" }));
                    _context.MelodicSynthPresets.Remove(melodicSynth);
                    break;
                case "bass":
                    var bassSynth = await _context.BassSynthPresets.Where(d => d.AppUserId == user.Id)
                        .FirstOrDefaultAsync(d => d.Id == request.Id, cancellationToken);
                    if (bassSynth is null)
                        return Result<Unit>.Failure(new ErrorMessage(new List<string>
                            { "Kit Pattern preset could not be found" }));
                    _context.BassSynthPresets.Remove(bassSynth);
                    break;
                default:
                    return Result<Unit>.Failure(new ErrorMessage(new List<string> { "Invalid preset type" }));
            }

            bool result = await _context.SaveChangesAsync(cancellationToken) > 0;
            return result
                ? Result<Unit>.Success(Unit.Value)
                : Result<Unit>.Failure(new ErrorMessage(new List<string>
                    { $"Failed to delete {request.Type.ToLower()}" }));
        }
    }
}