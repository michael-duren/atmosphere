using Application.Core;
using Application.Interfaces;
using Application.Presets.Instruments.DTOs;
using Application.Presets.Patterns.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using DataAccess;
using Domain;
using Domain.Presets;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Presets.Instruments.Commands;

public class CreateSynth
{
    public class Command : IRequest<Result<SynthQueryDto>>
    {
        public SynthQueryDto SynthQueryDto { get; set; } = null!;
        public string Type { get; set; } = null!;
    }

    public class Handler : IRequestHandler<Command, Result<SynthQueryDto>>
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

        public async Task<Result<SynthQueryDto>> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == _userAccessor.GetUsername(),
                cancellationToken: cancellationToken);

            if (user is null)
                return Result<SynthQueryDto>.Failure(
                    new ErrorMessage(new List<string> { "User not found" }));

            var createResult = await CreateSynth(request.Type, user, request.SynthQueryDto, cancellationToken);


            return createResult.Result
                ? Result<SynthQueryDto>.Success(createResult.CreatedPreset!)
                : Result<SynthQueryDto>.Failure(
                    new ErrorMessage(new List<string> { $"Failed to create {request.Type} preset" }));
        }

        private async Task<CreateResult> CreateSynth(string type, AppUser user, SynthQueryDto patternQueryDto,
            CancellationToken cancellationToken)
        {
            switch (type.ToLower())
            {
                case "melodic":
                    var melodicSynth = _mapper.Map<SynthQueryDto, MelodicSynthPreset>(patternQueryDto);
                    melodicSynth.AppUserId = user.Id;
                    melodicSynth.AppUser = user;

                    await _context.MelodicSynthPresets.AddAsync(melodicSynth, cancellationToken);

                    var melodicPatternResult = await _context.SaveChangesAsync(cancellationToken) > 0;

                    var createMelodicSynthResult = await _context.MelodicSynthPresets.Where(p => p.AppUserId == user.Id)
                        .ProjectTo<SynthQueryDto>(_mapper.ConfigurationProvider)
                        .FirstOrDefaultAsync(p => p.Id == melodicSynth.Id, cancellationToken: cancellationToken);

                    return new CreateResult { Result = melodicPatternResult, CreatedPreset = createMelodicSynthResult };

                case "bass":
                    var bassSynth = _mapper.Map<SynthQueryDto, BassSynthPreset>(patternQueryDto);
                    bassSynth.AppUserId = user.Id;
                    bassSynth.AppUser = user;

                    await _context.BassSynthPresets.AddAsync(bassSynth, cancellationToken);

                    var bassSynthResult = await _context.SaveChangesAsync(cancellationToken) > 0;

                    var createdBassSynth = await _context.BassSynthPresets.Where(p => p.AppUserId == user.Id)
                        .ProjectTo<SynthQueryDto>(_mapper.ConfigurationProvider)
                        .FirstOrDefaultAsync(p => p.Id == bassSynth.Id, cancellationToken: cancellationToken);

                    return new CreateResult { Result = bassSynthResult, CreatedPreset = createdBassSynth };
                default:
                    return new CreateResult { Result = false, CreatedPreset = null };
            }
        }
    }

    private class CreateResult
    {
        public bool Result { get; set; }
        public SynthQueryDto? CreatedPreset { get; set; }
    }
}