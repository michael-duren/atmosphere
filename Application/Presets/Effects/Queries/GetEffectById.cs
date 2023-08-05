using Application.Core;
using Application.Interfaces;
using Application.Presets.Effects.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using DataAccess;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Presets.Effects.Queries;

public class GetEffectById
{
    public class Query : IRequest<Result<EffectQueryDto>>
    {
        public int Id { get; set; }
        public string Type { get; set; } = null!;
    }

    public class Handler : IRequestHandler<Query, Result<EffectQueryDto>>
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

        public async Task<Result<EffectQueryDto>> Handle(Query request, CancellationToken cancellationToken)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == _userAccessor.GetUsername(),
                cancellationToken: cancellationToken);
            
            if (user is null) 
                return Result<EffectQueryDto>.Failure(
                    new ErrorMessage(new List<string> { "User not found" }));
            
            var effect = await GetEffect(request.Type, request.Id, user.Id);
            
            return effect is null
                ? Result<EffectQueryDto>.Failure(new ErrorMessage(new List<string> { "Effect not found" }))
                : Result<EffectQueryDto>.Success(effect);
        }
        
        private async Task<EffectQueryDto?> GetEffect(string type, int id, string userId)
        {
            return type.ToLower() switch
            {
                "distortion" => await _context.DistortionPresets.Where(d => d.AppUserId == userId)
                    .ProjectTo<DistortionQueryDto>(_mapper.ConfigurationProvider)
                    .FirstOrDefaultAsync(d => d.Id == id),
                "reverb" => await _context.ReverbPresets.Where(r => r.AppUserId == userId)
                    .ProjectTo<ReverbQueryDto>(_mapper.ConfigurationProvider)
                    .FirstOrDefaultAsync(r => r.Id == id),
                "delay" => await _context.DelayPresets.Where(d => d.AppUserId == userId)
                    .ProjectTo<DelayQueryDto>(_mapper.ConfigurationProvider)
                    .FirstOrDefaultAsync(d => d.Id == id),
                _ => null
            };
        }
    }
}