using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Presets;

public class BassSynthPreset
{
    [ForeignKey("AppUser")] public string AppUserId { get; set; } = null!;
    public AppUser AppUser { get; set; } = null!;
    
    [Key] public int BassSynthId { get; set; }
    public string PresetName { get; set; } = null!;
    public double Attack { get; set; }
    public double Decay { get; set; }
    public string Waveform { get; set; } = null!;
    public double Filter { get; set; }
}