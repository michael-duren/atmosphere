using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain;

public class Delay
{
    [Key] public int DelayId { get; set; }
    public double Mix { get; set; }
    public double Time { get; set; }
    public double Feedback { get; set; }

    [ForeignKey("Song")] public int SongId { get; set; }
    public Song Song { get; set; } = null!;
}