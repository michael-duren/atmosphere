using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain;

public class Reverb
{
    [Key] public int Id { get; set; }
    public double Mix { get; set; }
    public double Decay { get; set; }
    public double PreDelay { get; set; }
    
    [ForeignKey("Song")] public int SongId { get; set; }
    public Song Song { get; set; } = null!;
}