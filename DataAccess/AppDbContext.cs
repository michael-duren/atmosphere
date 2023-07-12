using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence;

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
}