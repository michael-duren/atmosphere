using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain;

public class Song
{
    [ForeignKey("AppUser")] public string AppUserId { get; set; } = null!;
    public AppUser AppUser { get; set; } = null!;

    // main song details
    [Key] public int Id { get; set; }
    public string SongName { get; set; } = null!;
    public double MasterVolume { get; set; }
    public int Bpm { get; set; }

    // effects
    public virtual Distortion Distortion { get; set; } = null!;
    public virtual Reverb Reverb { get; set; } = null!;
    public virtual Delay Delay { get; set; } = null!;

    // synths
    public virtual BassSynth BassSynth { get; set; } = null!;
    public virtual MelodicSynth MelodicSynth { get; set; } = null!;

    // patterns
    public virtual MelodicPattern MelodicPattern { get; set; } = null!;
    public virtual KitPattern KitPattern { get; set; } = null!;
}