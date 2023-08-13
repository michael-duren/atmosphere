using Application.Core;
using Application.Interfaces;
using Application.Presets.Instruments.DTOs;
using AutoMapper;
using DataAccess;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Presets.Instruments.Queries;

public class GetBassSynthById
{
    
    public class Query : IRequest<Result<BassSynthPresetDto>>
    {
        public int Id { get; set; }
    }

    public class Handler : IRequestHandler<Query, Result<BassSynthPresetDto>>
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

        public async Task<Result<BassSynthPresetDto>> Handle(Query request, CancellationToken cancellationToken)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == _userAccessor.GetUsername(),
                cancellationToken: cancellationToken);

            if (user is null)
                return Result<BassSynthPresetDto>.Failure(
                    new ErrorMessage(new List<string> { "User not found" }));


            var bassSynth = await _context.BassSynthPresets
                .FindAsync(request.Id, cancellationToken);
            
            if (bassSynth is null)
                return Result<BassSynthPresetDto>.Failure(
                    new ErrorMessage(new List<string> { "Pattern not found" }));

            if (bassSynth.AppUserId != user.Id)
                return Result<BassSynthPresetDto>.Failure(
                    new ErrorMessage(new List<string> { "User not authorized" }));
            
            var bassSynthDto = _mapper.Map<BassSynthPresetDto>(bassSynth);
                        

            return Result<BassSynthPresetDto>.Success(bassSynthDto);
        }
    }
    
}