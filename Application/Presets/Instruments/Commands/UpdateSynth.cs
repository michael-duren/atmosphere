using Application.Core;
using Application.Interfaces;
using Application.Presets.Instruments.DTOs;
using Application.Presets.Patterns.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using DataAccess;
using Domain;
using Domain.Presets;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Presets.Instruments.Commands;

public class UpdateSynth
{
    public class Command : IRequest<Result<Unit>>
    {
        public SynthQueryDto SynthQueryDto { get; set; } = null!;
        public string Type { get; set; } = null!;
        public int Id { get; set; }
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

            var updated = await UpdateSynth(request.Type, user, request.SynthQueryDto, request.Id,
                cancellationToken);


            return updated.Result
                ? Result<Unit>.Success(Unit.Value)
                : Result<Unit>.Failure(
                    new ErrorMessage(new List<string> { $"Failed to create {request.Type} preset" }));
        }

        private async Task<UpdatedResult> UpdateSynth(string type, AppUser user, SynthQueryDto synthQueryDto,
            int id,
            CancellationToken cancellationToken)
        {
            switch (type.ToLower())
            {
                case "melodic":
                    var oldMelodicSynth = await _context.MelodicSynthPresets.Where(p => p.AppUserId == user.Id)
                        .FirstOrDefaultAsync(p => p.Id == id, cancellationToken: cancellationToken);

                    if (oldMelodicSynth is null)
                        return new UpdatedResult { Result = false };

                    // map new values
                    var melodicSynth = _mapper.Map<SynthQueryDto, MelodicSynthPreset>(synthQueryDto);
                    oldMelodicSynth.PresetName = melodicSynth.PresetName;
                    oldMelodicSynth.Waveform = melodicSynth.Waveform;
                    oldMelodicSynth.Attack = melodicSynth.Attack;
                    oldMelodicSynth.Decay = melodicSynth.Decay;
                    oldMelodicSynth.Sustain = melodicSynth.Sustain;
                    oldMelodicSynth.Release = melodicSynth.Release;
                    oldMelodicSynth.FilterFrequency = melodicSynth.FilterFrequency;
                    melodicSynth.FilterMod = melodicSynth.FilterMod;
                    melodicSynth.FilterType = melodicSynth.FilterType;
                    melodicSynth.Metal = melodicSynth.Metal;
                    melodicSynth.Chorus = melodicSynth.Chorus;
                    melodicSynth.LfoFrequency = melodicSynth.LfoFrequency;
                    melodicSynth.LfoShape = melodicSynth.LfoShape;

                    var melodicPatternResult = await _context.SaveChangesAsync(cancellationToken) > 0;

                    return new UpdatedResult { Result = melodicPatternResult };

                case "bass":
                    var oldBassSynth = await _context.BassSynthPresets.Where(p => p.AppUserId == user.Id)
                        .FirstOrDefaultAsync(p => p.Id == id, cancellationToken: cancellationToken);

                    if (oldBassSynth is null)
                        return new UpdatedResult { Result = false };

                    // map new values
                    var bassSynth = _mapper.Map<SynthQueryDto, BassSynthPreset>(synthQueryDto);
                    oldBassSynth.PresetName = bassSynth.PresetName;
                    oldBassSynth.Waveform = bassSynth.Waveform;
                    oldBassSynth.Attack = bassSynth.Attack;
                    oldBassSynth.Decay = bassSynth.Decay;
                    oldBassSynth.Sustain = bassSynth.Sustain;
                    oldBassSynth.Release = bassSynth.Release;
                    oldBassSynth.FilterFrequency = bassSynth.FilterFrequency;

                    var bassSynthResult = await _context.SaveChangesAsync(cancellationToken) > 0;
                    return new UpdatedResult { Result = bassSynthResult };

                default:
                    return new UpdatedResult { Result = false };
            }
        }
    }

    private class UpdatedResult
    {
        public bool Result { get; init; }
    }
}