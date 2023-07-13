using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Presets;

public class KitPatternPreset
{
    [ForeignKey("AppUser")] public string AppUserId { get; set; } = null!;
    public AppUser AppUser { get; set; } = null!;
    
    [Key] public int Id { get; set; }
    public string PatternName { get; set; } = null!;
    public int[] BdSteps { get; set; } = null!;
    public int[] SdSteps { get; set; } = null!;
    public int[] ClSteps { get; set; } = null!;
    public int[] ChSteps { get; set; } = null!;
}