using Application.Core;
using Application.Interfaces;
using DataAccess;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Application.Presets.Effects.Commands;

public class DeleteEffectById
{
    public class Command : IRequest<Result<Unit>>
    {
        public int Id { get; set; }
        public string? Type { get; set; }
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
            var user = await _userManager.Users.FirstOrDefaultAsync(u => u.UserName == _userAccessor.GetUsername());
            if (user is null)
                return Result<Unit>.Failure(new ErrorMessage(new List<string> { "User could not be found" }));

            switch (request.Type!.ToLower())
            {
                case "distortion":
                    var distortion = await _context.DistortionPresets.Where(d => d.AppUserId == user.Id)
                        .FirstOrDefaultAsync(d => d.Id == request.Id, cancellationToken);
                    if (distortion is null)
                        return Result<Unit>.Failure(new ErrorMessage(new List<string>
                            { "Distortion preset could not be found" }));
                    _context.DistortionPresets.Remove(distortion);
                    break;
                case "reverb":
                    var reverb = await _context.ReverbPresets.Where(d => d.AppUserId == user.Id)
                        .FirstOrDefaultAsync(d => d.Id == request.Id, cancellationToken);
                    if (reverb is null)
                        return Result<Unit>.Failure(new ErrorMessage(new List<string>
                            { "Reverb preset could not be found" }));
                    _context.ReverbPresets.Remove(reverb);
                    break;
                case "delay":
                    var delay = await _context.DelayPresets.Where(d => d.AppUserId == user.Id)
                        .FirstOrDefaultAsync(d => d.Id == request.Id, cancellationToken);
                    if (delay is null)
                        return Result<Unit>.Failure(new ErrorMessage(new List<string>
                            { "Delay preset could not be found" }));
                    _context.DelayPresets.Remove(delay);
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