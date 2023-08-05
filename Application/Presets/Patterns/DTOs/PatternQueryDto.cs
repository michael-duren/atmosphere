namespace Application.Presets.Patterns.DTOs;

public class PatternQueryDto
{
    public int Id { get; set; }
    public string PresetName { get; set; } = null!;

    // kit pattern  
    public int? PatternLength { get; set; }
    public bool[]? BdSteps { get; set; }
    public bool[]? SdSteps { get; set; }
    public bool[]? ClSteps { get; set; }
    public bool[]? ChSteps { get; set; }

    // melodic pattern

    public string? Key { get; set; }
    public string? Scale { get; set; }
    public int[]? Sequence { get; set; }
    public string? PatternType { get; set; }
    public int? Transpose { get; set; }
    public string? TimeInterval { get; set; }
    public string? NoteDuration { get; set; }
    public int? Length { get; set; }
}