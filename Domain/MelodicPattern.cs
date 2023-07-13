using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain;

public class MelodicPattern
{
    [Key] public int Id { get; set; }
    public string Scale { get; set; } = null!;
    public int[] Sequence { get; set; } = null!;
    public string PatternType { get; set; } = null!;
    [ForeignKey("Song")] public int SongId { get; set; }
    public Song Song { get; set; } = null!;
}