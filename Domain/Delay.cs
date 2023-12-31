using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain;

public class Delay
{
    [Key] public int Id { get; set; }
    public double Mix { get; set; }
    public double Time { get; set; }
    public double Feedback { get; set; }

    [ForeignKey("Song")] public int SongId { get; set; }
}