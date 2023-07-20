using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Presets;

public class MelodicPatternPreset
{
    [ForeignKey("AppUser")] public string AppUserId { get; set; } = null!;
    public AppUser AppUser { get; set; } = null!;

    [Key] public int Id { get; set; }
    [Column(TypeName = "varchar(50)")] public string PresetName { get; set; } = null!;
    [Column(TypeName = "varchar(50)")] public string Scale { get; set; } = null!;
    public int[] Sequence { get; set; } = null!;
    [Column(TypeName = "varchar(50)")] public string PatternType { get; set; } = null!;
}