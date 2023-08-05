using Domain;
using Domain.Presets;
using Microsoft.AspNetCore.Identity;

namespace DataAccess
{
    public class Seed
    {
        public static async Task SeedData(AppDbContext context, UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        UserName = "bob",
                        Email = "bob@test.com"
                    }
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }

                var userFromDb = await userManager.FindByNameAsync("bob");

                var songs = new List<Song>
                {
                    new Song
                    {
                        AppUserId = userFromDb!.Id,
                        SongName = "First song",
                        MasterVolume = 0.7,
                        DrumVolume = 0.7,
                        BassVolume = 0.7,
                        MelodicVolume = 0.7,
                        Bpm = 120,
                    }
                };

                // create song
                await context.Songs.AddRangeAsync(songs);
                await context.SaveChangesAsync();

                var distortions = new List<Distortion>
                {
                    new Distortion
                    {
                        SongId = songs[0].Id,
                        Mix = 0.3,
                        Amount = 0.3,
                        FilterFrequency = 12_000
                    }
                };

                var distortionPresets = new List<DistortionPreset>
                {
                    new DistortionPreset
                    {
                        AppUserId = userFromDb!.Id,
                        PresetName = "preset 1",
                        Mix = 0.3,
                        Amount = 0.3,
                        FilterFrequency = 12_000
                    }
                };

                var reverbs = new List<Reverb>
                {
                    new Reverb
                    {
                        SongId = songs[0].Id,
                        Mix = 0.3,
                        Decay = 0.4,
                        PreDelay = 0.1,
                    }
                };


                var reverbPresets = new List<ReverbPreset>
                {
                    new ReverbPreset
                    {
                        AppUserId = userFromDb!.Id,
                        PresetName = "preset 1",
                        Mix = 0.3,
                        Decay = 0.3,
                        PreDelay = 0.3
                    }
                };
                var delays = new List<Delay>
                {
                    new Delay
                    {
                        SongId = songs[0].Id,
                        Mix = 0.3,
                        Feedback = 0.4,
                        Time = 0.1,
                    }
                };
                var delayPresets = new List<DelayPreset>
                {
                    new DelayPreset
                    {
                        AppUserId = userFromDb!.Id,
                        PresetName = "preset 1",
                        Mix = 0.3,
                        Time = 0.3,
                        Feedback = 0.3
                    }
                };

                var bassSynths = new List<BassSynth>
                {
                    new BassSynth
                    {
                        SongId = songs[0].Id,
                        Waveform = "fatsawtooth",
                        Attack = 0.1,
                        Decay = 0.2,
                        Sustain = 1,
                        Release = 0.1,
                        FilterFrequency = 22_000
                    }
                };

                var bassSynthPresets = new List<BassSynthPreset>
                {
                    new BassSynthPreset
                    {
                        AppUserId = userFromDb!.Id,
                        PresetName = "bass preset 1",
                        Waveform = "fatsawtooth",
                        Attack = 0.1,
                        Decay = 0.2,
                        Sustain = 1,
                        Release = 0.1,
                        FilterFrequency = 22_000
                    }
                };

                var melodicSynths = new List<MelodicSynth>
                {
                    new MelodicSynth
                    {
                        SongId = songs[0].Id,
                        Waveform = "fatsquare",
                        Attack = 0.1,
                        Decay = 0.2,
                        Sustain = 0.9,
                        Release = 0.9,
                        FilterFrequency = 22_000,
                        FilterMod = 0.9,
                        FilterType = "lowpass",
                        Metal = 0.9,
                        Chorus = 0.9,
                        LfoFrequency = "4n",
                        LfoShape = "sine2",
                    }
                };

                var melodicSynthPresets = new List<MelodicSynthPreset>()
                {
                    new MelodicSynthPreset
                    {
                        AppUserId = userFromDb!.Id,
                        PresetName = "melodic preset 1",
                        Waveform = "fatsquare",
                        Attack = 0.1,
                        Decay = 0.2,
                        Sustain = 0.9,
                        Release = 0.9,
                        FilterFrequency = 22_000,
                        FilterMod = 0.9,
                        FilterType = "lowpass",
                        Metal = 0.9,
                        Chorus = 0.9,
                        LfoFrequency = "4n",
                        LfoShape = "sine2",
                    }
                };

                var melodicPatterns = new List<MelodicPattern>
                {
                    new MelodicPattern
                    {
                        SongId = songs[0].Id,
                        Key = "C",
                        Scale = "minor",
                        Sequence = new int[] { -12, 4, 4, 6, 7, 1, 7, 1 },
                        PatternType = "up",
                        TimeInterval = "8n",
                        NoteDuration = "8n",
                        Transpose = 0,
                        Length = 8
                    }
                };

                var melodicPatternPresets = new List<MelodicPatternPreset>()
                {
                    new MelodicPatternPreset
                    {
                        AppUserId = userFromDb!.Id,
                        PresetName = "melodic pattern preset 1",
                        Key = "C",
                        Scale = "minor",
                        Sequence = new int[] { -12, 4, 4, 6, 7, 1, 7, 1 },
                        PatternType = "up",
                        TimeInterval = "8n",
                        NoteDuration = "8n",
                        Transpose = 0,
                        Length = 8
                    }
                };

                var kitPatterns = new List<KitPattern>
                {
                    new KitPattern
                    {
                        SongId = songs[0].Id,
                        PatternLength = 16,
                        BdSteps = new bool[]
                        {
                            true, false, false, false, true, false, false, false, true, false, false, false, true,
                            false, false, false
                        },
                        SdSteps = new bool[]
                        {
                            false, false, false, false, false, false, false, false, true, false, false, false, false,
                            false, false, false
                        },
                        ClSteps = new bool[]
                        {
                            false, false, false, false, false, false, false, false, false, false, false, false, false,
                            false, false, false
                        },
                        ChSteps = new bool[]
                        {
                            true, false, false, false, true, false, false, false, true, false, false, false, true,
                            false, false, false
                        },
                    }
                };

                var kitPatternPresets = new List<KitPatternPreset>()
                {
                    new KitPatternPreset
                    {
                        AppUserId = userFromDb!.Id,
                        PresetName = "kit pattern preset 1",
                        PatternLength = 16,
                        BdSteps = new bool[]
                        {
                            true, false, false, false, true, false, false, false, true, false, false, false, true,
                        },
                        SdSteps = new bool[]
                        {
                            false, false, false, false, false, false, false, false, true, false, false, false, false,
                        },
                        ClSteps = new bool[]
                        {
                            false, false, false, false, false, false, false, false, false, false, false, false, false,
                        },
                        ChSteps = new bool[]
                        {
                            true, false, false, false, true, false, false, false, true, false, false, false, true,
                        }
                    }
                };


                // seed the rest
                await context.Distortions.AddRangeAsync(distortions);
                await context.Reverbs.AddRangeAsync(reverbs);
                await context.Delays.AddRangeAsync(delays);
                await context.BassSynths.AddRangeAsync(bassSynths);
                await context.MelodicSynths.AddRangeAsync(melodicSynths);
                await context.MelodicPatterns.AddRangeAsync(melodicPatterns);
                await context.KitPatterns.AddRangeAsync(kitPatterns);

                // seed the presets
                await context.DelayPresets.AddRangeAsync(delayPresets);
                await context.BassSynthPresets.AddRangeAsync(bassSynthPresets);
                await context.MelodicSynthPresets.AddRangeAsync(melodicSynthPresets);
                await context.MelodicPatternPresets.AddRangeAsync(melodicPatternPresets);
                await context.KitPatternPresets.AddRangeAsync(kitPatternPresets);
                await context.DistortionPresets.AddRangeAsync(distortionPresets);
                await context.ReverbPresets.AddRangeAsync(reverbPresets);

                await context.SaveChangesAsync();
            }
        }
    }
}