using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain;

public class BassSynth
{
    [Key] public int Id { get; set; }
    public double Attack { get; set; }
    public double Decay { get; set; }
    public double Sustain { get; set; }
    public double Release { get; set; }
    [Column(TypeName = "varchar(20)")]
    public string Waveform { get; set; } = null!;
    public double FilterFrequency { get; set; }
    
    [ForeignKey("Song")] public int SongId { get; set; }
}