using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Presets;

public class MelodicSynthPreset
{
    [ForeignKey("AppUser")] public string AppUserId { get; set; } = null!;
    public AppUser AppUser { get; set; } = null!;
    
    [Key] public int MelodicSynthId { get; set; }
    public string PresetName { get; set; } = null!;
    public string Waveform { get; set; } = null!;
    public double Attack { get; set; }
    public double Decay { get; set; }
    public double Sustain { get; set; }
    public double Release { get; set; }
    public double FilterFrequency { get; set; }
    public double FilterMod { get; set; }
    public string FilterType { get; set; } = null!;
    public double Metal { get; set; }
    public double Chorus { get; set; }
    public double LfoFrequency { get; set; }
    public string LfoShape { get; set; } = null!;
}