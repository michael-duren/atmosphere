using Application.Core;
using Application.Interfaces;
using Application.Presets.Effects.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using DataAccess;
using Domain;
using Domain.Presets;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Presets.Effects.Commands;

public abstract class CreateEffect
{
    public class Command : IRequest<Result<EffectQueryDto>>
    {
        public EffectQueryDto EffectQueryDto { get; set; } = null!;
        public string? Type { get; set; }
    }

    public class Handler : IRequestHandler<Command, Result<EffectQueryDto>>
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

        public async Task<Result<EffectQueryDto>> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == _userAccessor.GetUsername(),
                cancellationToken: cancellationToken);

            if (user is null)
                return Result<EffectQueryDto>.Failure(
                    new ErrorMessage(new List<string> { "User not found" }));

            var createResult = await CreateEffect(request.Type!, user, request.EffectQueryDto, cancellationToken);


            return createResult.Result
                ? Result<EffectQueryDto>.Success(createResult.CreatedPreset!)
                : Result<EffectQueryDto>.Failure(
                    new ErrorMessage(new List<string> { $"Failed to create {request.Type} preset" }));
        }

        private async Task<CreateResult> CreateEffect(string type, AppUser user, EffectQueryDto effectQueryDto,
            CancellationToken cancellationToken)
        {
            switch (type.ToLower())
            {
                case "distortion":
                    var distortion = _mapper.Map<EffectQueryDto, DistortionPreset>(effectQueryDto);
                    distortion.AppUserId = user.Id;
                    distortion.AppUser = user;

                    await _context.DistortionPresets.AddAsync(distortion, cancellationToken);

                    var distortionResult = await _context.SaveChangesAsync(cancellationToken) > 0;

                    var createdDistortion = await _context.DistortionPresets.Where(p => p.AppUserId == user.Id)
                        .ProjectTo<EffectQueryDto>(_mapper.ConfigurationProvider)
                        .FirstOrDefaultAsync(p => p.Id == distortion.Id, cancellationToken: cancellationToken);

                    return new CreateResult { Result = distortionResult, CreatedPreset = createdDistortion };

                case "reverb":
                    var reverb = _mapper.Map<EffectQueryDto, ReverbPreset>(effectQueryDto);
                    reverb.AppUserId = user.Id;
                    reverb.AppUser = user;

                    await _context.ReverbPresets.AddAsync(reverb, cancellationToken);

                    var reverbResult = await _context.SaveChangesAsync(cancellationToken) > 0;

                    var createdReverb = await _context.ReverbPresets.Where(p => p.AppUserId == user.Id)
                        .ProjectTo<EffectQueryDto>(_mapper.ConfigurationProvider)
                        .FirstOrDefaultAsync(p => p.Id == reverb.Id, cancellationToken: cancellationToken);

                    return new CreateResult { Result = reverbResult, CreatedPreset = createdReverb };
                case "delay":
                    var delay = _mapper.Map<EffectQueryDto, DelayPreset>(effectQueryDto);
                    delay.AppUserId = user.Id;
                    delay.AppUser = user;

                    await _context.DelayPresets.AddAsync(delay, cancellationToken);

                    var delayResult = await _context.SaveChangesAsync(cancellationToken) > 0;

                    var createdDelay = await _context.DelayPresets.Where(p => p.AppUserId == user.Id)
                        .ProjectTo<EffectQueryDto>(_mapper.ConfigurationProvider)
                        .FirstOrDefaultAsync(p => p.Id == delay.Id, cancellationToken: cancellationToken);

                    return new CreateResult { Result = delayResult, CreatedPreset = createdDelay };
                default:
                    return new CreateResult { Result = false, CreatedPreset = null };
            }
        }
    }

    private class CreateResult
    {
        public bool Result { get; set; }
        public EffectQueryDto? CreatedPreset { get; set; }
    }
}