using Domain.Presets;
using Microsoft.AspNetCore.Identity;

namespace Domain;

public class AppUser : IdentityUser
{
    public ICollection<Song> Songs { get; set; } = new List<Song>();
    public string? Image { get; set; }
    
    // presets
    
    // effects
    public ICollection<DelayPreset> DelayPresets { get; set; } = new List<DelayPreset>();
    public ICollection<DistortionPreset> DistortionPresets { get; set; } = new List<DistortionPreset>();
    public ICollection<ReverbPreset> ReverbPresets { get; set; } = new List<ReverbPreset>();
    
    // synths
    public ICollection<BassSynthPreset> BassSynthPresets { get; set; } = new List<BassSynthPreset>();
    public ICollection<MelodicSynthPreset> MelodicSynthPresets { get; set; } = new List<MelodicSynthPreset>();
    
    // patterns
    public ICollection<KitPatternPreset> PatternPresets { get; set; } = new List<KitPatternPreset>();
    public ICollection<MelodicPatternPreset> MelodicPatternPresets { get; set; } = new List<MelodicPatternPreset>();
}