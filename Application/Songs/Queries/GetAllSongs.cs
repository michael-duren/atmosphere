using Application.Songs.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using DataAccess;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Songs.Queries;

public class GetAllSongs
{
    public class Query : IRequest<ICollection<SongQueryDto>>
    {
    }
    
    public class Handler : IRequestHandler<Query, ICollection<SongQueryDto>>
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;


        public Handler(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<ICollection<SongQueryDto>> Handle(Query request, CancellationToken cancellationToken)
        {
            return await _context.Songs
                .Include(s => s.BassSynth)
                .Include(s => s.MelodicSynth)
                .Include(s => s.MelodicPattern)
                .Include(s => s.KitPattern)
                .Include(s => s.Distortion)
                .Include(s => s.Reverb)
                .Include(s => s.Delay)
                .ProjectTo<SongQueryDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }
    }
}