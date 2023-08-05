using Application.Presets.Effects.DTOs;
using Application.Presets.Instruments.DTOs;
using Application.Presets.Patterns.DTOs;
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
        CreateMap<DelayPreset, DelayQueryDto>().ReverseMap();
        CreateMap<DistortionPreset, DistortionQueryDto>().ReverseMap();
        CreateMap<ReverbPreset, ReverbQueryDto>().ReverseMap();
        CreateMap<EffectQueryDto, DistortionPreset>().ReverseMap();
        CreateMap<EffectQueryDto, ReverbPreset>().ReverseMap();
        CreateMap<EffectQueryDto, DelayPreset>().ReverseMap();
        CreateMap<MelodicPatternPresetDto, MelodicPatternPreset>().ReverseMap();
        CreateMap<KitPatternPresetDto, KitPatternPreset>().ReverseMap();
        CreateMap<MelodicSynthPresetDto, MelodicSynthPreset>().ReverseMap();
        CreateMap<BassSynthPresetDto, BassSynthPreset>().ReverseMap();
        CreateMap<PatternQueryDto, MelodicPatternPreset>().ReverseMap();
        CreateMap<PatternQueryDto, KitPatternPreset>().ReverseMap();
    }
}