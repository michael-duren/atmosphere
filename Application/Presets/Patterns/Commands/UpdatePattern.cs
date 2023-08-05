using Application.Core;
using Application.Interfaces;
using Application.Presets.Patterns.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using DataAccess;
using Domain;
using Domain.Presets;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Presets.Patterns.Commands;

public class UpdatePattern
{
    public class Command : IRequest<Result<Unit>>
    {
        public PatternQueryDto PatternsQueryDto { get; set; } = null!;
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

            var updated = await UpdatePattern(request.Type, user, request.PatternsQueryDto, request.Id,
                cancellationToken);


            return updated.Result
                ? Result<Unit>.Success(Unit.Value)
                : Result<Unit>.Failure(
                    new ErrorMessage(new List<string> { $"Failed to create {request.Type} preset" }));
        }

        private async Task<UpdatedResult> UpdatePattern(string type, AppUser user, PatternQueryDto patternQueryDto,
            int id,
            CancellationToken cancellationToken)
        {
            switch (type.ToLower())
            {
                case "melodic":
                    var oldMelodicPattern = await _context.MelodicPatternPresets.Where(p => p.AppUserId == user.Id)
                        .FirstOrDefaultAsync(p => p.Id == id, cancellationToken: cancellationToken);

                    if (oldMelodicPattern is null)
                        return new UpdatedResult { Result = false };

                    // map new values
                    var melodicPattern = _mapper.Map<PatternQueryDto, MelodicPatternPreset>(patternQueryDto);
                    oldMelodicPattern.PresetName = melodicPattern.PresetName;
                    oldMelodicPattern.Length = melodicPattern.Length;
                    oldMelodicPattern.Key = melodicPattern.Key;
                    oldMelodicPattern.Scale = melodicPattern.Scale;
                    oldMelodicPattern.Sequence = melodicPattern.Sequence;
                    oldMelodicPattern.PatternType = melodicPattern.PatternType;
                    oldMelodicPattern.Transpose = melodicPattern.Transpose;
                    melodicPattern.TimeInterval = melodicPattern.TimeInterval;
                    melodicPattern.NoteDuration = melodicPattern.NoteDuration;

                    var melodicPatternResult = await _context.SaveChangesAsync(cancellationToken) > 0;

                    var updatedMelodicPattern = await _context.DistortionPresets.Where(p => p.AppUserId == user.Id)
                        .ProjectTo<PatternQueryDto>(_mapper.ConfigurationProvider)
                        .FirstOrDefaultAsync(p => p.Id == melodicPattern.Id, cancellationToken: cancellationToken);

                    return new UpdatedResult { Result = melodicPatternResult };

                case "kit":
                    var oldKitPattern = await _context.KitPatternPresets.Where(p => p.AppUserId == user.Id)
                        .FirstOrDefaultAsync(p => p.Id == id, cancellationToken: cancellationToken);

                    if (oldKitPattern is null)
                        return new UpdatedResult { Result = false };

                    // map new values
                    var kitPattern = _mapper.Map<PatternQueryDto, KitPatternPreset>(patternQueryDto);
                    oldKitPattern.PresetName = kitPattern.PresetName;
                    oldKitPattern.PatternLength = kitPattern.PatternLength;
                    oldKitPattern.BdSteps = kitPattern.BdSteps;
                    oldKitPattern.SdSteps = kitPattern.SdSteps;
                    oldKitPattern.ClSteps = kitPattern.ClSteps;
                    oldKitPattern.ChSteps = kitPattern.ChSteps;

                    var kitResult = await _context.SaveChangesAsync(cancellationToken) > 0;
                    return new UpdatedResult { Result = kitResult };

                default:
                    return new UpdatedResult { Result = false };
            }
        }
    }

    private class UpdatedResult
    {
        public bool Result { get; set; }
    }
}