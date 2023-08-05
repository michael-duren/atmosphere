using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Application.Presets.Patterns.DTOs;

public class KitPatternPresetDto : PatternQueryDto
{
    public new int Id { get; set; }
    public new string PresetName { get; set; } = null!;
    public new int PatternLength { get; set; }
    public new bool[] BdSteps { get; set; } = null!;
    public new bool[] SdSteps { get; set; } = null!;
    public new bool[] ClSteps { get; set; } = null!;
    public new bool[] ChSteps { get; set; } = null!;
}