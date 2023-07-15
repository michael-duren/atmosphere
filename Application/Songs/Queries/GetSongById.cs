using Application.Core;
using Application.Interfaces;
using Application.Songs.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using DataAccess;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Songs.Queries;

public class GetSongById
{
    public class Query : IRequest<Result<SongQueryDto>>
    {
        public int Id { get; set; }
    }

    public class Handler : IRequestHandler<Query, Result<SongQueryDto>>
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

        public async Task<Result<SongQueryDto>> Handle(Query request, CancellationToken cancellationToken)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == _userAccessor.GetUsername(),
                cancellationToken: cancellationToken);

            if (user is null)
                return Result<SongQueryDto>.Failure(
                    new ErrorMessage(new List<string> { "User not found" }));

            var song = await _context.Songs
                .Where(s => s.AppUserId == user.Id)
                .Include(s => s.BassSynth)
                .Include(s => s.MelodicSynth)
                .Include(s => s.MelodicPattern)
                .Include(s => s.KitPattern)
                .Include(s => s.Distortion)
                .Include(s => s.Reverb)
                .Include(s => s.Delay)
                .ProjectTo<SongQueryDto>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(s => s.Id == request.Id, cancellationToken: cancellationToken);

            return song is null
                ? Result<SongQueryDto>.Failure(new ErrorMessage(new List<string> { "Song not found" }))
                : Result<SongQueryDto>.Success(song);
        }
    }
}