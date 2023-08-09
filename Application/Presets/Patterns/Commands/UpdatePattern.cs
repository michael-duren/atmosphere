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
                    melodicPattern.AppUserId = user.Id;
                    melodicPattern.AppUser = user;
                    _mapper.Map(melodicPattern, oldMelodicPattern);

                    var melodicPatternResult = await _context.SaveChangesAsync(cancellationToken) > 0;

                    return new UpdatedResult { Result = melodicPatternResult };

                case "kit":
                    var oldKitPattern = await _context.KitPatternPresets.Where(p => p.AppUserId == user.Id)
                        .FirstOrDefaultAsync(p => p.Id == id, cancellationToken);

                    if (oldKitPattern is null)
                        return new UpdatedResult { Result = false };

                    // map new values
                    var kitPattern = _mapper.Map<PatternQueryDto, KitPatternPreset>(patternQueryDto);
                    kitPattern.AppUserId = user.Id;
                    kitPattern.AppUser = user;
                    _mapper.Map(kitPattern, oldKitPattern);

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