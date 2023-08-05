using Domain.Presets;

namespace Application.Presets.Patterns.DTOs;

public class PatternsQueryDto
{
    public List<MelodicPatternPresetDto>? MelodicPatterns { get; set; } 
    public List<KitPatternPresetDto>? KitPatterns { get; set; }
}