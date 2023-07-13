using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain;

public class KitPattern
{
    [Key] public int Id { get; set; }
    public bool[] BdSteps { get; set; } = null!;
    public bool[] SdSteps { get; set; } = null!;
    public bool[] ClSteps { get; set; } = null!;
    public bool[] ChSteps { get; set; } = null!;


    [ForeignKey("Song")] public int SongId { get; set; }
    public Song Song { get; set; } = null!;
}