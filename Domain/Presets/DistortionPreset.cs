using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Presets;

public class DistortionPreset
{
    [ForeignKey("AppUser")] public string AppUserId { get; set; } = null!;
    public AppUser AppUser { get; set; } = null!;
    
    [Key] public int DistortionId { get; set; }
    public string PresetName { get; set; } = null!;
    public double Mix { get; set; }
    public double Amount { get; set; }
    public double Filter { get; set; }
}