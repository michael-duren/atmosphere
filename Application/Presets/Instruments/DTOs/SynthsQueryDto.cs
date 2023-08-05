namespace Application.Presets.Instruments.DTOs;

public class SynthsQueryDto
{
    public List<MelodicSynthPresetDto>? MelodicSynths { get; set; }
    public List<BassSynthPresetDto>? BassSynths { get; set; }
}