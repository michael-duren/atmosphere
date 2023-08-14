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

                    var updatedDistortion = _mapper.Map<EffectQueryDto, DistortionQueryDto>(effectQueryDto);

                    oldDistortion.PresetName = updatedDistortion.PresetName;
                    oldDistortion.Mix = updatedDistortion.Mix;
                    oldDistortion.Amount = updatedDistortion.Amount;
                    oldDistortion.FilterFrequency = updatedDistortion.FilterFrequency; 

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

                    var updatedReverb = _mapper.Map<EffectQueryDto, ReverbQueryDto>(effectQueryDto);

                    oldReverb.PresetName = updatedReverb.PresetName;
                    oldReverb.Mix = updatedReverb.Mix;
                    oldReverb.Decay = updatedReverb.Decay;
                    oldReverb.PreDelay = updatedReverb.PreDelay; 

                    var reverbResult = await _context.SaveChangesAsync(cancellationToken) > 0;

                    var updated = await _context.ReverbPresets.Where(p => p.AppUserId == user.Id)
                        .ProjectTo<EffectQueryDto>(_mapper.ConfigurationProvider)
                        .FirstOrDefaultAsync(p => p.Id == id, cancellationToken: cancellationToken);

                    return new UpdateResult { Result = reverbResult, UpdatedPreset = updated };
                case "delay":
                    var oldDelay = await _context.DelayPresets.Where(p => p.AppUserId == user.Id)
                        .FirstOrDefaultAsync(p => p.Id == id, cancellationToken: cancellationToken);

                    if (oldDelay is null)
                        return new UpdateResult { Result = false, UpdatedPreset = null };

                    var updatedDelay = _mapper.Map<EffectQueryDto, DelayQueryDto>(effectQueryDto);

                    oldDelay.PresetName = updatedDelay.PresetName;
                    oldDelay.Mix = updatedDelay.Mix;
                    oldDelay.Time = updatedDelay.Time;
                    oldDelay.Feedback = updatedDelay.Feedback; 

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