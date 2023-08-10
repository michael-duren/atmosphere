using Application.Core;
using Application.Interfaces;
using Application.Presets.Instruments.DTOs;
using Application.Presets.Patterns.DTOs;
using AutoMapper;
using DataAccess;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Presets.Instruments.Queries;

public class GetMelodicSynthById
{
    
    public class Query : IRequest<Result<MelodicSynthPresetDto>>
    {
        public int Id { get; set; }
    }

    public class Handler : IRequestHandler<Query, Result<MelodicSynthPresetDto>>
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

        public async Task<Result<MelodicSynthPresetDto>> Handle(Query request, CancellationToken cancellationToken)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == _userAccessor.GetUsername(),
                cancellationToken: cancellationToken);

            if (user is null)
                return Result<MelodicSynthPresetDto>.Failure(
                    new ErrorMessage(new List<string> { "User not found" }));


            var melodicSynth = await _context.MelodicSynthPresets
                .FindAsync(request.Id, cancellationToken);
            
            if (melodicSynth is null)
                return Result<MelodicSynthPresetDto>.Failure(
                    new ErrorMessage(new List<string> { "Pattern not found" }));

            if (melodicSynth.AppUserId != user.Id)
                return Result<MelodicSynthPresetDto>.Failure(
                    new ErrorMessage(new List<string> { "User not authorized" }));
            
            var melodicSynthDto = _mapper.Map<MelodicSynthPresetDto>(melodicSynth);
                        

            return Result<MelodicSynthPresetDto>.Success(melodicSynthDto);
        }
    }
}