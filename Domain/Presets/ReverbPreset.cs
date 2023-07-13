using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Presets;

public class ReverbPreset
{
    [ForeignKey("AppUser")] public string AppUserId { get; set; } = null!;
    public AppUser AppUser { get; set; } = null!;
    
    [Key] public int ReverbId { get; set; }
    public string PresetName { get; set; } = null!;
    public double Mix { get; set; }
    public double Decay { get; set; }
    public double PreDelay { get; set; }
}