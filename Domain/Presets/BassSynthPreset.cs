using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Presets;

public class BassSynthPreset
{
    [ForeignKey("AppUser")] public string AppUserId { get; set; } = null!;
    public AppUser AppUser { get; set; } = null!;

    [Key] public int Id { get; set; }
    [Column(TypeName = "varchar(50)")] public string PresetName { get; set; } = null!;
    public double Attack { get; set; }
    public double Decay { get; set; }
    [Column(TypeName = "varchar(50)")] public string Waveform { get; set; } = null!;
    public double Filter { get; set; }
}