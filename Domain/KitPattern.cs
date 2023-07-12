using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain;

public class KitPattern
{
    [Key] public int KitPatternId { get; set; }
    public string PatternName { get; set; } = null!;
    public int[] Steps { get; set; } = null!;


    [ForeignKey("Song")] public int SongId { get; set; }
    public Song Song { get; set; } = null!;
}