using Domain.Presets;

namespace Application.Presets.Effects.DTOs;

public class EffectsQueryDto
{
    public List<DistortionQueryDto>? DistortionPresets { get; set; } 
    public List<DelayQueryDto>? DelayPresets { get; set; }
    public List<ReverbQueryDto>? ReverbPresets { get; set; } 
}