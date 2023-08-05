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

public class CreatePattern
{
    public class Command : IRequest<Result<PatternQueryDto>>
    {
        public PatternQueryDto PatternsQueryDto { get; set; } = null!;
        public string Type { get; set; } = null!;
    }

    public class Handler : IRequestHandler<Command, Result<PatternQueryDto>>
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

        public async Task<Result<PatternQueryDto>> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == _userAccessor.GetUsername(),
                cancellationToken: cancellationToken);

            if (user is null)
                return Result<PatternQueryDto>.Failure(
                    new ErrorMessage(new List<string> { "User not found" }));

            var createResult = await CreatePattern(request.Type, user, request.PatternsQueryDto, cancellationToken);


            return createResult.Result
                ? Result<PatternQueryDto>.Success(createResult.CreatedPreset!)
                : Result<PatternQueryDto>.Failure(
                    new ErrorMessage(new List<string> { $"Failed to create {request.Type} preset" }));
        }

        private async Task<CreateResult> CreatePattern(string type, AppUser user, PatternQueryDto patternQueryDto,
            CancellationToken cancellationToken)
        {
            switch (type.ToLower())
            {
                case "melodic":
                    var melodicPattern = _mapper.Map<PatternQueryDto, MelodicPatternPreset>(patternQueryDto);
                    melodicPattern.AppUserId = user.Id;
                    melodicPattern.AppUser = user;

                    await _context.MelodicPatternPresets.AddAsync(melodicPattern, cancellationToken);

                    var melodicPatternResult = await _context.SaveChangesAsync(cancellationToken) > 0;

                    var createdMelodicPattern = await _context.MelodicPatternPresets.Where(p => p.AppUserId == user.Id)
                        .ProjectTo<PatternQueryDto>(_mapper.ConfigurationProvider)
                        .FirstOrDefaultAsync(p => p.Id == melodicPattern.Id, cancellationToken: cancellationToken);

                    return new CreateResult { Result = melodicPatternResult, CreatedPreset = createdMelodicPattern };

                case "kit":
                    var kitPattern = _mapper.Map<PatternQueryDto, KitPatternPreset>(patternQueryDto);
                    kitPattern.AppUserId = user.Id;
                    kitPattern.AppUser = user;

                    await _context.KitPatternPresets.AddAsync(kitPattern, cancellationToken);

                    var kitResult = await _context.SaveChangesAsync(cancellationToken) > 0;

                    var createdKitPattern = await _context.KitPatternPresets.Where(p => p.AppUserId == user.Id)
                        .ProjectTo<PatternQueryDto>(_mapper.ConfigurationProvider)
                        .FirstOrDefaultAsync(p => p.Id == kitPattern.Id, cancellationToken: cancellationToken);

                    return new CreateResult { Result = kitResult, CreatedPreset = createdKitPattern };
                default:
                    return new CreateResult { Result = false, CreatedPreset = null };
            }
        }
    }

    private class CreateResult
    {
        public bool Result { get; set; }
        public PatternQueryDto? CreatedPreset { get; set; }
    }
}