using Domain;
using Domain.Presets;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace DataAccess;

public class AppDbContext : IdentityDbContext<AppUser>
{
    public AppDbContext(DbContextOptions options) : base(options)
    {
    }

    public DbSet<Song> Songs { get; set; }
    public DbSet<Distortion> Distortions { get; set; }
    public DbSet<Delay> Delays { get; set; }
    public DbSet<Reverb> Reverbs { get; set; }
    public DbSet<BassSynth> BassSynths { get; set; }
    public DbSet<MelodicSynth> MelodicSynths { get; set; }
    public DbSet<KitPattern> KitPatterns { get; set; }
    public DbSet<MelodicPattern> MelodicPatterns { get; set; }
    
    /*
     * Presets
     */
    
    public DbSet<DistortionPreset> DistortionPresets { get; set; }
    public DbSet<DelayPreset> DelayPresets { get; set; }
    public DbSet<ReverbPreset> ReverbPresets { get; set; }
    
    public DbSet<BassSynthPreset> BassSynthPresets { get; set; }
    public DbSet<MelodicSynthPreset> MelodicSynthPresets { get; set; }
    
    public DbSet<KitPatternPreset> KitPatternPresets { get; set; }
    public DbSet<MelodicPatternPreset> MelodicPatternPresets { get; set; }
}