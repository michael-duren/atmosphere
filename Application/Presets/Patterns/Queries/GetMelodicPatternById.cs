using Application.Core;
using Application.Interfaces;
using Application.Presets.Patterns.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using DataAccess;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Presets.Patterns.Queries;

public class GetMelodicPatternById
{
    public class Query : IRequest<Result<PatternQueryDto>>
    {
        public int Id { get; set; }
    }

    public class Handler : IRequestHandler<Query, Result<PatternQueryDto>>
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

        public async Task<Result<PatternQueryDto>> Handle(Query request, CancellationToken cancellationToken)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == _userAccessor.GetUsername(),
                cancellationToken: cancellationToken);

            if (user is null)
                return Result<PatternQueryDto>.Failure(
                    new ErrorMessage(new List<string> { "User not found" }));


            var melodicPattern = await _context.MelodicPatternPresets
                .FindAsync(request.Id, cancellationToken);
            
            if (melodicPattern is null)
                return Result<PatternQueryDto>.Failure(
                    new ErrorMessage(new List<string> { "Pattern not found" }));

            if (melodicPattern.AppUserId != user.Id)
                return Result<PatternQueryDto>.Failure(
                    new ErrorMessage(new List<string> { "User not authorized" }));
            
            var melodicPatternDto = _mapper.Map<MelodicPatternPresetDto>(melodicPattern);
                        

            return Result<PatternQueryDto>.Success(melodicPatternDto);
        }
    }
}