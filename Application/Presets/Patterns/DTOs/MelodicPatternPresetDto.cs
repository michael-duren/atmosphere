namespace Application.Presets.Patterns.DTOs;

public class MelodicPatternPresetDto : PatternQueryDto
{
    public new string Key { get; set; } = null!;
    public new string Scale { get; set; } = null!;
    public new int[] Sequence { get; set; } = null!;
    public new string PatternType { get; set; } = null!;
    public new int Transpose { get; set; }
    public new string TimeInterval { get; set; } = null!;
    public new string NoteDuration { get; set; } = null!;
    public new int Length { get; set; }
}