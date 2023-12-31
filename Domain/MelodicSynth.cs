using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain;

public class MelodicSynth
{
    [Key] public int Id { get; set; }
    [Column(TypeName = "varchar(50)")]
    public string Waveform { get; set; } = null!;
    public double Attack { get; set; }
    public double Decay { get; set; }
    public double Sustain { get; set; }
    public double Release { get; set; }
    public double FilterFrequency { get; set; }
    public double FilterMod { get; set; }
    [Column(TypeName = "varchar(50)")]
    public string FilterType { get; set; } = null!;
    public double Metal { get; set; }
    public double Chorus { get; set; }
    [Column(TypeName = "varchar(50)")]
    public string LfoFrequency { get; set; } = null!;
    [Column(TypeName = "varchar(50)")]
    public string LfoShape { get; set; } = null!;
    
    [ForeignKey("Song")] public int SongId { get; set; }
}