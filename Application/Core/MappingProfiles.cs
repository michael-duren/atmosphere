using Application.Presets.Effects.DTOs;
using Application.Songs.DTOs;
using Domain;
using Domain.Presets;

namespace Application.Core;

public class MappingProfiles : AutoMapper.Profile
{
    public MappingProfiles()
    {
        CreateMap<Song, Song>();
        CreateMap<Song, SongQueryDto>().ReverseMap();
        CreateMap<SongCreateDto, Song>();
        CreateMap<DelayPreset, DelayQueryDto>();
        CreateMap<DistortionPreset, DistortionQueryDto>();
        CreateMap<ReverbPreset, ReverbQueryDto>();
    }
}