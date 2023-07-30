using Application.Songs.DTOs;
using Domain;

namespace Application.Core;

public class MappingProfiles : AutoMapper.Profile
{
    public MappingProfiles()
    {
        CreateMap<Song, Song>();
        CreateMap<Song, SongQueryDto>().ReverseMap();
        CreateMap<SongCreateDto, Song>();
    }
}