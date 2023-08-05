using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Presets;

public class KitPatternPreset
{
    [ForeignKey("AppUser")] public string AppUserId { get; set; } = null!;
    public AppUser AppUser { get; set; } = null!;

    [Key] public int Id { get; set; }
    [Column(TypeName = "varchar(50)")] public string PresetName { get; set; } = null!;
    public int PatternLength { get; set; }
    public bool[] BdSteps { get; set; } = null!;
    public bool[] SdSteps { get; set; } = null!;
    public bool[] ClSteps { get; set; } = null!;
    public bool[] ChSteps { get; set; } = null!;
}