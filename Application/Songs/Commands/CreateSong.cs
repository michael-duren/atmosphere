using Application.Core;
using Application.Interfaces;
using Application.Songs.DTOs;
using Application.Songs.Validators;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using DataAccess;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Songs.Commands;

public class CreateSong
{
    public class Command : IRequest<Result<SongQueryDto>>
    {
        public SongCreateDto Song { get; set; } = null!;
    }


    public class Handler : IRequestHandler<Command, Result<SongQueryDto>>
    {
        private readonly AppDbContext _context;
        private readonly IUserAccessor _userAccessor;
        private readonly IMapper _mapper;
        private readonly IValidator<SongCreateDto> _validator;

        public Handler(AppDbContext context, IUserAccessor userAccessor, IMapper mapper, IValidator<SongCreateDto> validator)
        {
            _context = context;
            _userAccessor = userAccessor;
            _mapper = mapper;
            _validator = validator;
        }

        public async Task<Result<SongQueryDto>> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername(),
                cancellationToken);
            if (user is null)
                return Result<SongQueryDto>.Failure(new ErrorMessage(new List<string>
                    { "Must be logged in to create a song" }));
            
            var validationResult = await _validator.ValidateAsync(request.Song, cancellationToken);
            if (!validationResult.IsValid)
                return Result<SongQueryDto>.Failure(new ErrorMessage(validationResult.Errors.Select(e => e.ErrorMessage).ToList()));

            var song = _mapper.Map<SongCreateDto, Song>(request.Song);

            song.AppUser = user;
            song.AppUserId = user.Id;

            _context.Songs.Add(song);
            user.Songs.Add(song);
            bool result = await _context.SaveChangesAsync(cancellationToken) > 0;
            var createdSong = await _context.Songs
                .Where(s => s.AppUserId == user.Id)
                .Include(s => s.BassSynth)
                .Include(s => s.MelodicSynth)
                .Include(s => s.MelodicPattern)
                .Include(s => s.KitPattern)
                .Include(s => s.Distortion)
                .Include(s => s.Reverb)
                .Include(s => s.Delay)
                .ProjectTo<SongQueryDto>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(s => s.SongName == request.Song.SongName, cancellationToken: cancellationToken);
                
            return result
                ? Result<SongQueryDto>.Success(createdSong!)
                : Result<SongQueryDto>.Failure(new ErrorMessage(new List<string> { "Failed to create song" }));
        }
    }
}