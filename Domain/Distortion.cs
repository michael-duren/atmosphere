using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain;

public class Distortion
{
    [Key] public int Id { get; set; }
    public double Mix { get; set; }
    public double Amount { get; set; }
    public double FilterFrequency { get; set; }
    
    [ForeignKey("Song")] public int SongId { get; set; }
}