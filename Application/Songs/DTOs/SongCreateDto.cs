using Domain;

namespace Application.Songs.DTOs;

public class SongCreateDto
{
    
    public string SongName { get; set; } = null!;
    public double MasterVolume { get; set; }
    public int Bpm { get; set; }

    // effects
    public Distortion Distortion { get; set; } = null!;
    public Reverb Reverb { get; set; } = null!;
    public Delay Delay { get; set; } = null!;

    // synths
    public BassSynth BassSynth { get; set; } = null!;
    public MelodicSynth MelodicSynth { get; set; } = null!;

    // patterns
    public MelodicPattern MelodicPattern { get; set; } = null!;
    public KitPattern KitPattern { get; set; } = null!;
}