using Application.Songs.DTOs;
using Domain;

namespace Application.Core;

public class MappingProfiles: AutoMapper.Profile
{
    public MappingProfiles()
    {
        CreateMap<Song, SongQueryDto>();
    } 
}