using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Presets;

public class MelodicPatternPreset
{
    [ForeignKey("AppUser")] public string AppUserId { get; set; } = null!;
    public AppUser AppUser { get; set; } = null!;
    
    [Key] public int Id { get; set; }
    public string PresetName { get; set; } = null!;
    public string Scale { get; set; } = null!;
    public int[] Sequence { get; set; } = null!;
    public string PatternType { get; set; } = null!;
}