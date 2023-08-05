using Application.Core;
using Application.Interfaces;
using Application.Presets.Effects.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using DataAccess;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Presets.Effects.Queries;

public class GetAllEffects
{
    public class Query : IRequest<Result<EffectsQueryDto>>
    {
    }

    public class Handler : IRequestHandler<Query, Result<EffectsQueryDto>>
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

        public async Task<Result<EffectsQueryDto>> Handle(Query request, CancellationToken cancellationToken)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == _userAccessor.GetUsername(),
                cancellationToken: cancellationToken);

            if (user is null)
                return Result<EffectsQueryDto>.Failure(
                    new ErrorMessage(new List<string> { "User not found" }));


            var distortions = await _context.DistortionPresets
                .Where(d => d.AppUserId == user.Id)
                .ProjectTo<DistortionQueryDto>(_mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);

            var reverbs = await _context.ReverbPresets
                .Where(r => r.AppUserId == user.Id)
                .ProjectTo<ReverbQueryDto>(_mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);

            var delays = await _context.DelayPresets
                .Where(d => d.AppUserId == user.Id)
                .ProjectTo<DelayQueryDto>(_mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);

            var effects = new EffectsQueryDto
            {
                DistortionPresets = distortions,
                ReverbPresets = reverbs,
                DelayPresets = delays
            };

            return Result<EffectsQueryDto>.Success(effects);
        }
    }
}