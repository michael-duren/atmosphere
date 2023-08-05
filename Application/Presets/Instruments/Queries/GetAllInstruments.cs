using Application.Core;
using Application.Interfaces;
using Application.Presets.Instruments.DTOs;
using Application.Presets.Patterns.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using DataAccess;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Presets.Instruments.Queries;

public class GetAllInstruments
{
    public class Query : IRequest<Result<InstrumentsQueryDto>>
    {
    }

    public class Handler : IRequestHandler<Query, Result<InstrumentsQueryDto>>
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

        public async Task<Result<InstrumentsQueryDto>> Handle(Query request, CancellationToken cancellationToken)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == _userAccessor.GetUsername(),
                cancellationToken: cancellationToken);

            if (user is null)
                return Result<InstrumentsQueryDto>.Failure(
                    new ErrorMessage(new List<string> { "User not found" }));

            var melodicSynths = await _context.MelodicSynthPresets
                .Where(m => m.AppUserId == user.Id)
                .ProjectTo<MelodicSynthPresetDto>(_mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);

            var bassSynths = await _context.BassSynthPresets
                .Where(k => k.AppUserId == user.Id)
                .ProjectTo<BassSynthPresetDto>(_mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);

            var instruments = new InstrumentsQueryDto
            {
                MelodicSynths = melodicSynths,
                BassSynths = bassSynths
            };

            return Result<InstrumentsQueryDto>.Success(instruments);
        }
    }
}