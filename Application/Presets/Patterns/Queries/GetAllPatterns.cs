using Application.Core;
using Application.Interfaces;
using Application.Presets.Patterns.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using DataAccess;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Presets.Patterns.Queries;

public class GetAllPatterns
{
    public class Query : IRequest<Result<PatternsQueryDto>>
    {
    }

    public class Handler : IRequestHandler<Query, Result<PatternsQueryDto>>
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

        public async Task<Result<PatternsQueryDto>> Handle(Query request, CancellationToken cancellationToken)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == _userAccessor.GetUsername(),
                cancellationToken: cancellationToken);

            if (user is null)
                return Result<PatternsQueryDto>.Failure(
                    new ErrorMessage(new List<string> { "User not found" }));

            var melodicPatterns = await _context.MelodicPatternPresets
                .Where(m => m.AppUserId == user.Id)
                .ProjectTo<MelodicPatternPresetDto>(_mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);

            var kitPatterns = await _context.KitPatternPresets
                .Where(k => k.AppUserId == user.Id)
                .ProjectTo<KitPatternPresetDto>(_mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);

            var patterns = new PatternsQueryDto
            {
                MelodicPatterns = melodicPatterns,
                KitPatterns = kitPatterns
            };

            return Result<PatternsQueryDto>.Success(patterns);
        }
    }
}