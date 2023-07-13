using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Presets;

public class DelayPreset
{
    [ForeignKey("AppUser")] public string AppUserId { get; set; } = null!;
    public AppUser AppUser { get; set; } = null!;
    
    [Key] public int DelayId { get; set; }
    public string PresetName { get; set; }
    public double Mix { get; set; }
    public double Time { get; set; }
    public double Feedback { get; set; }
}