using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain;

public class KitPattern
{
    [Key] public int Id { get; set; }
    public int[] BdSteps { get; set; } = null!;
    public int[] SdSteps { get; set; } = null!;
    public int[] ClSteps { get; set; } = null!;
    public int[] ChSteps { get; set; } = null!;


    [ForeignKey("Song")] public int SongId { get; set; }
    public Song Song { get; set; } = null!;
}