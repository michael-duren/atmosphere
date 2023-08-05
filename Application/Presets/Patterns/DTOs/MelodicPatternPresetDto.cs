using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Application.Presets.Patterns.DTOs;

public class MelodicPatternPresetDto
{
    [Key] public int Id { get; set; }
    [Column(TypeName = "varchar(50)")] public string PresetName { get; set; } = null!;
    [Column(TypeName = "varchar(3)")] public string Key { get; set; } = null!;
    [Column(TypeName = "varchar(20)")] public string Scale { get; set; } = null!;
    public int[] Sequence { get; set; } = null!;
    [Column(TypeName = "varchar(20)")] public string PatternType { get; set; } = null!;
    public int Transpose { get; set; }
    [Column(TypeName = "varchar(5)")] public string TimeInterval { get; set; } = null!;
    [Column(TypeName = "varchar(5)")] public string NoteDuration { get; set; } = null!;
    public int Length { get; set; }
}