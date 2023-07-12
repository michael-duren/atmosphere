using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain;

public class BassSynth
{
    [Key] public int BassSynthId { get; set; }
    public double Attack { get; set; }
    public double Decay { get; set; }
    public string Waveform { get; set; } = null!;
    public double Filter { get; set; }
    
    [ForeignKey("Song")] public int SongId { get; set; }
    public Song Song { get; set; } = null!;
}