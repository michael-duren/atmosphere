﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using Persistence;

#nullable disable

namespace Persistence.Migrations
{
    [DbContext(typeof(AppDbContext))]
    partial class AppDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.5")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("Domain.AppUser", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("text");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("integer");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("text");

                    b.Property<string>("Email")
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("boolean");

                    b.Property<string>("Image")
                        .HasColumnType("text");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("boolean");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("text");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("text");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("boolean");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("text");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("boolean");

                    b.Property<string>("UserName")
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasDatabaseName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasDatabaseName("UserNameIndex");

                    b.ToTable("AspNetUsers", (string)null);
                });

            modelBuilder.Entity("Domain.BassSynth", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<double>("Attack")
                        .HasColumnType("double precision");

                    b.Property<double>("Decay")
                        .HasColumnType("double precision");

                    b.Property<double>("Filter")
                        .HasColumnType("double precision");

                    b.Property<int>("SongId")
                        .HasColumnType("integer");

                    b.Property<string>("Waveform")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("SongId")
                        .IsUnique();

                    b.ToTable("BassSynths");
                });

            modelBuilder.Entity("Domain.Delay", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<double>("Feedback")
                        .HasColumnType("double precision");

                    b.Property<double>("Mix")
                        .HasColumnType("double precision");

                    b.Property<int>("SongId")
                        .HasColumnType("integer");

                    b.Property<double>("Time")
                        .HasColumnType("double precision");

                    b.HasKey("Id");

                    b.HasIndex("SongId")
                        .IsUnique();

                    b.ToTable("Delays");
                });

            modelBuilder.Entity("Domain.Distortion", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<double>("Amount")
                        .HasColumnType("double precision");

                    b.Property<double>("Filter")
                        .HasColumnType("double precision");

                    b.Property<double>("Mix")
                        .HasColumnType("double precision");

                    b.Property<int>("SongId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("SongId")
                        .IsUnique();

                    b.ToTable("Distortions");
                });

            modelBuilder.Entity("Domain.KitPattern", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int[]>("BdSteps")
                        .IsRequired()
                        .HasColumnType("integer[]");

                    b.Property<int[]>("ChSteps")
                        .IsRequired()
                        .HasColumnType("integer[]");

                    b.Property<int[]>("ClSteps")
                        .IsRequired()
                        .HasColumnType("integer[]");

                    b.Property<int[]>("SdSteps")
                        .IsRequired()
                        .HasColumnType("integer[]");

                    b.Property<int>("SongId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("SongId")
                        .IsUnique();

                    b.ToTable("KitPatterns");
                });

            modelBuilder.Entity("Domain.MelodicPattern", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("PatternType")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Scale")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int[]>("Sequence")
                        .IsRequired()
                        .HasColumnType("integer[]");

                    b.Property<int>("SongId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("SongId")
                        .IsUnique();

                    b.ToTable("MelodicPatterns");
                });

            modelBuilder.Entity("Domain.MelodicSynth", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<double>("Attack")
                        .HasColumnType("double precision");

                    b.Property<double>("Chorus")
                        .HasColumnType("double precision");

                    b.Property<double>("Decay")
                        .HasColumnType("double precision");

                    b.Property<double>("FilterFrequency")
                        .HasColumnType("double precision");

                    b.Property<double>("FilterMod")
                        .HasColumnType("double precision");

                    b.Property<string>("FilterType")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<double>("LfoFrequency")
                        .HasColumnType("double precision");

                    b.Property<string>("LfoShape")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<double>("Metal")
                        .HasColumnType("double precision");

                    b.Property<double>("Release")
                        .HasColumnType("double precision");

                    b.Property<int>("SongId")
                        .HasColumnType("integer");

                    b.Property<double>("Sustain")
                        .HasColumnType("double precision");

                    b.Property<string>("Waveform")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("SongId")
                        .IsUnique();

                    b.ToTable("MelodicSynths");
                });

            modelBuilder.Entity("Domain.Presets.BassSynthPreset", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("AppUserId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<double>("Attack")
                        .HasColumnType("double precision");

                    b.Property<double>("Decay")
                        .HasColumnType("double precision");

                    b.Property<double>("Filter")
                        .HasColumnType("double precision");

                    b.Property<string>("PresetName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Waveform")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("AppUserId");

                    b.ToTable("BassSynthPreset");
                });

            modelBuilder.Entity("Domain.Presets.DelayPreset", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("AppUserId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<double>("Feedback")
                        .HasColumnType("double precision");

                    b.Property<double>("Mix")
                        .HasColumnType("double precision");

                    b.Property<string>("PresetName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<double>("Time")
                        .HasColumnType("double precision");

                    b.HasKey("Id");

                    b.HasIndex("AppUserId");

                    b.ToTable("DelayPreset");
                });

            modelBuilder.Entity("Domain.Presets.DistortionPreset", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<double>("Amount")
                        .HasColumnType("double precision");

                    b.Property<string>("AppUserId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<double>("Filter")
                        .HasColumnType("double precision");

                    b.Property<double>("Mix")
                        .HasColumnType("double precision");

                    b.Property<string>("PresetName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("AppUserId");

                    b.ToTable("DistortionPreset");
                });

            modelBuilder.Entity("Domain.Presets.KitPatternPreset", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("AppUserId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int[]>("BdSteps")
                        .IsRequired()
                        .HasColumnType("integer[]");

                    b.Property<int[]>("ChSteps")
                        .IsRequired()
                        .HasColumnType("integer[]");

                    b.Property<int[]>("ClSteps")
                        .IsRequired()
                        .HasColumnType("integer[]");

                    b.Property<string>("PatternName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int[]>("SdSteps")
                        .IsRequired()
                        .HasColumnType("integer[]");

                    b.HasKey("Id");

                    b.HasIndex("AppUserId");

                    b.ToTable("KitPatternPreset");
                });

            modelBuilder.Entity("Domain.Presets.MelodicPatternPreset", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("AppUserId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("PatternType")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("PresetName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Scale")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int[]>("Sequence")
                        .IsRequired()
                        .HasColumnType("integer[]");

                    b.HasKey("Id");

                    b.HasIndex("AppUserId");

                    b.ToTable("MelodicPatternPreset");
                });

            modelBuilder.Entity("Domain.Presets.MelodicSynthPreset", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("AppUserId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<double>("Attack")
                        .HasColumnType("double precision");

                    b.Property<double>("Chorus")
                        .HasColumnType("double precision");

                    b.Property<double>("Decay")
                        .HasColumnType("double precision");

                    b.Property<double>("FilterFrequency")
                        .HasColumnType("double precision");

                    b.Property<double>("FilterMod")
                        .HasColumnType("double precision");

                    b.Property<string>("FilterType")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<double>("LfoFrequency")
                        .HasColumnType("double precision");

                    b.Property<string>("LfoShape")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<double>("Metal")
                        .HasColumnType("double precision");

                    b.Property<string>("PresetName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<double>("Release")
                        .HasColumnType("double precision");

                    b.Property<double>("Sustain")
                        .HasColumnType("double precision");

                    b.Property<string>("Waveform")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("AppUserId");

                    b.ToTable("MelodicSynthPreset");
                });

            modelBuilder.Entity("Domain.Presets.ReverbPreset", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("AppUserId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<double>("Decay")
                        .HasColumnType("double precision");

                    b.Property<double>("Mix")
                        .HasColumnType("double precision");

                    b.Property<double>("PreDelay")
                        .HasColumnType("double precision");

                    b.Property<string>("PresetName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("AppUserId");

                    b.ToTable("ReverbPreset");
                });

            modelBuilder.Entity("Domain.Reverb", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<double>("Decay")
                        .HasColumnType("double precision");

                    b.Property<double>("Mix")
                        .HasColumnType("double precision");

                    b.Property<double>("PreDelay")
                        .HasColumnType("double precision");

                    b.Property<int>("SongId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("SongId")
                        .IsUnique();

                    b.ToTable("Reverbs");
                });

            modelBuilder.Entity("Domain.Song", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("AppUserId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("Bpm")
                        .HasColumnType("integer");

                    b.Property<double>("MasterVolume")
                        .HasColumnType("double precision");

                    b.Property<string>("SongName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("AppUserId");

                    b.ToTable("Songs");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("text");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasDatabaseName("RoleNameIndex");

                    b.ToTable("AspNetRoles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("ClaimType")
                        .HasColumnType("text");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("text");

                    b.Property<string>("RoleId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("ClaimType")
                        .HasColumnType("text");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("text");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasColumnType("text");

                    b.Property<string>("ProviderKey")
                        .HasColumnType("text");

                    b.Property<string>("ProviderDisplayName")
                        .HasColumnType("text");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("text");

                    b.Property<string>("RoleId")
                        .HasColumnType("text");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("text");

                    b.Property<string>("LoginProvider")
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<string>("Value")
                        .HasColumnType("text");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens", (string)null);
                });

            modelBuilder.Entity("Domain.BassSynth", b =>
                {
                    b.HasOne("Domain.Song", "Song")
                        .WithOne("BassSynth")
                        .HasForeignKey("Domain.BassSynth", "SongId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Song");
                });

            modelBuilder.Entity("Domain.Delay", b =>
                {
                    b.HasOne("Domain.Song", "Song")
                        .WithOne("Delay")
                        .HasForeignKey("Domain.Delay", "SongId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Song");
                });

            modelBuilder.Entity("Domain.Distortion", b =>
                {
                    b.HasOne("Domain.Song", "Song")
                        .WithOne("Distortion")
                        .HasForeignKey("Domain.Distortion", "SongId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Song");
                });

            modelBuilder.Entity("Domain.KitPattern", b =>
                {
                    b.HasOne("Domain.Song", "Song")
                        .WithOne("KitPattern")
                        .HasForeignKey("Domain.KitPattern", "SongId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Song");
                });

            modelBuilder.Entity("Domain.MelodicPattern", b =>
                {
                    b.HasOne("Domain.Song", "Song")
                        .WithOne("MelodicPattern")
                        .HasForeignKey("Domain.MelodicPattern", "SongId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Song");
                });

            modelBuilder.Entity("Domain.MelodicSynth", b =>
                {
                    b.HasOne("Domain.Song", "Song")
                        .WithOne("MelodicSynth")
                        .HasForeignKey("Domain.MelodicSynth", "SongId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Song");
                });

            modelBuilder.Entity("Domain.Presets.BassSynthPreset", b =>
                {
                    b.HasOne("Domain.AppUser", "AppUser")
                        .WithMany("BassSynthPresets")
                        .HasForeignKey("AppUserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("AppUser");
                });

            modelBuilder.Entity("Domain.Presets.DelayPreset", b =>
                {
                    b.HasOne("Domain.AppUser", "AppUser")
                        .WithMany("DelayPresets")
                        .HasForeignKey("AppUserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("AppUser");
                });

            modelBuilder.Entity("Domain.Presets.DistortionPreset", b =>
                {
                    b.HasOne("Domain.AppUser", "AppUser")
                        .WithMany("DistortionPresets")
                        .HasForeignKey("AppUserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("AppUser");
                });

            modelBuilder.Entity("Domain.Presets.KitPatternPreset", b =>
                {
                    b.HasOne("Domain.AppUser", "AppUser")
                        .WithMany("PatternPresets")
                        .HasForeignKey("AppUserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("AppUser");
                });

            modelBuilder.Entity("Domain.Presets.MelodicPatternPreset", b =>
                {
                    b.HasOne("Domain.AppUser", "AppUser")
                        .WithMany("MelodicPatternPresets")
                        .HasForeignKey("AppUserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("AppUser");
                });

            modelBuilder.Entity("Domain.Presets.MelodicSynthPreset", b =>
                {
                    b.HasOne("Domain.AppUser", "AppUser")
                        .WithMany("MelodicSynthPresets")
                        .HasForeignKey("AppUserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("AppUser");
                });

            modelBuilder.Entity("Domain.Presets.ReverbPreset", b =>
                {
                    b.HasOne("Domain.AppUser", "AppUser")
                        .WithMany("ReverbPresets")
                        .HasForeignKey("AppUserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("AppUser");
                });

            modelBuilder.Entity("Domain.Reverb", b =>
                {
                    b.HasOne("Domain.Song", "Song")
                        .WithOne("Reverb")
                        .HasForeignKey("Domain.Reverb", "SongId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Song");
                });

            modelBuilder.Entity("Domain.Song", b =>
                {
                    b.HasOne("Domain.AppUser", "AppUser")
                        .WithMany("Songs")
                        .HasForeignKey("AppUserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("AppUser");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("Domain.AppUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("Domain.AppUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Domain.AppUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("Domain.AppUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Domain.AppUser", b =>
                {
                    b.Navigation("BassSynthPresets");

                    b.Navigation("DelayPresets");

                    b.Navigation("DistortionPresets");

                    b.Navigation("MelodicPatternPresets");

                    b.Navigation("MelodicSynthPresets");

                    b.Navigation("PatternPresets");

                    b.Navigation("ReverbPresets");

                    b.Navigation("Songs");
                });

            modelBuilder.Entity("Domain.Song", b =>
                {
                    b.Navigation("BassSynth")
                        .IsRequired();

                    b.Navigation("Delay")
                        .IsRequired();

                    b.Navigation("Distortion")
                        .IsRequired();

                    b.Navigation("KitPattern")
                        .IsRequired();

                    b.Navigation("MelodicPattern")
                        .IsRequired();

                    b.Navigation("MelodicSynth")
                        .IsRequired();

                    b.Navigation("Reverb")
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
