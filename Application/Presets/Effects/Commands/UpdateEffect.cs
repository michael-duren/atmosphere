using Application.Core;
using Application.Interfaces;
using Application.Presets.Effects.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using DataAccess;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Presets.Effects.Commands;

public abstract class UpdateEffect
{
    public class Command : IRequest<Result<Unit>>
    {
        public int Id { get; init; }
        public EffectQueryDto Effect { get; init; } = null!;
        public string Type { get; init; } = null!;
    }

    public class Handler : IRequestHandler<Command, Result<Unit>>
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;
        private readonly IUserAccessor _userAccessor;

        public Handler(AppDbContext context, IMapper mapper, IUserAccessor userAccessor)
        {
            _context = context;
            _mapper = mapper;
            _userAccessor = userAccessor;
        }

        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == _userAccessor.GetUsername(),
                cancellationToken: cancellationToken);

            if (user is null)
                return Result<Unit>.Failure(
                    new ErrorMessage(new List<string> { "User not found" }));
            // attempt to update preset
            var updatedResult = await UpdateEffect(request.Type, user, request.Effect, request.Id, cancellationToken);


            return updatedResult.Result
                ? Result<Unit>.Success(Unit.Value)
                : Result<Unit>.Failure(
                    new ErrorMessage(new List<string> { $"Failed to update {request.Type} preset" }));
        }

        private async Task<UpdateResult> UpdateEffect(string type, AppUser user, EffectQueryDto effectQueryDto, int id,
            CancellationToken cancellationToken)
        {
            switch (type.ToLower())
            {
                case "distortion":
                    var oldDistortion = await _context.DistortionPresets.Where(p => p.AppUserId == user.Id)
                        .FirstOrDefaultAsync(p => p.Id == id, cancellationToken: cancellationToken);

                    if (oldDistortion is null)
                        return new UpdateResult { Result = false, UpdatedPreset = null };


                    oldDistortion.PresetName = effectQueryDto.PresetName;
                    oldDistortion.Mix = effectQueryDto.Mix;
                    oldDistortion.Amount = effectQueryDto.Amount ?? oldDistortion.Amount;
                    oldDistortion.FilterFrequency = effectQueryDto.FilterFrequency ?? oldDistortion.FilterFrequency;

                    var distortionResult = await _context.SaveChangesAsync(cancellationToken) > 0;

                    var createdDistortion = await _context.DistortionPresets.Where(p => p.AppUserId == user.Id)
                        .ProjectTo<EffectQueryDto>(_mapper.ConfigurationProvider)
                        .FirstOrDefaultAsync(p => p.Id == id, cancellationToken: cancellationToken);

                    return new UpdateResult { Result = distortionResult, UpdatedPreset = createdDistortion };

                case "reverb":
                    var oldReverb = await _context.ReverbPresets.Where(p => p.AppUserId == user.Id)
                        .FirstOrDefaultAsync(p => p.Id == id, cancellationToken: cancellationToken);

                    if (oldReverb is null)
                        return new UpdateResult { Result = false, UpdatedPreset = null };

                    _context.ChangeTracker.Clear();

                    oldReverb.PresetName = effectQueryDto.PresetName;
                    oldReverb.Mix = effectQueryDto.Mix;
                    oldReverb.Decay = effectQueryDto.Decay ?? oldReverb.Decay;
                    oldReverb.PreDelay = effectQueryDto.PreDelay ?? oldReverb.PreDelay;

                    var reverbResult = await _context.SaveChangesAsync(cancellationToken) > 0;

                    var createdReverb = await _context.ReverbPresets.Where(p => p.AppUserId == user.Id)
                        .ProjectTo<EffectQueryDto>(_mapper.ConfigurationProvider)
                        .FirstOrDefaultAsync(p => p.Id == id, cancellationToken: cancellationToken);

                    return new UpdateResult { Result = reverbResult, UpdatedPreset = createdReverb };
                case "delay":
                    var oldDelay = await _context.DelayPresets.Where(p => p.AppUserId == user.Id)
                        .FirstOrDefaultAsync(p => p.Id == id, cancellationToken: cancellationToken);

                    if (oldDelay is null)
                        return new UpdateResult { Result = false, UpdatedPreset = null };

                    _context.ChangeTracker.Clear();

                    oldDelay.PresetName = effectQueryDto.PresetName;
                    oldDelay.Mix = effectQueryDto.Mix;
                    oldDelay.Time = effectQueryDto.Time ?? oldDelay.Time;
                    oldDelay.Feedback = effectQueryDto.Feedback ?? oldDelay.Feedback;

                    var delayResult = await _context.SaveChangesAsync(cancellationToken) > 0;

                    var createdDelay = await _context.DelayPresets.Where(p => p.AppUserId == user.Id)
                        .ProjectTo<EffectQueryDto>(_mapper.ConfigurationProvider)
                        .FirstOrDefaultAsync(p => p.Id == id, cancellationToken: cancellationToken);

                    return new UpdateResult { Result = delayResult, UpdatedPreset = createdDelay };
                default:
                    return new UpdateResult { Result = false, UpdatedPreset = null };
            }
        }
    }

    private class UpdateResult
    {
        public bool Result { get; init; }
        public EffectQueryDto? UpdatedPreset { get; set; }
    }
}