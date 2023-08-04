using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AspNetRoles",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    NormalizedName = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUsers",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    Image = table.Column<string>(type: "text", nullable: true),
                    UserName = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    NormalizedUserName = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    Email = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    NormalizedEmail = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    EmailConfirmed = table.Column<bool>(type: "boolean", nullable: false),
                    PasswordHash = table.Column<string>(type: "text", nullable: true),
                    SecurityStamp = table.Column<string>(type: "text", nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "text", nullable: true),
                    PhoneNumber = table.Column<string>(type: "text", nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(type: "boolean", nullable: false),
                    TwoFactorEnabled = table.Column<bool>(type: "boolean", nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true),
                    LockoutEnabled = table.Column<bool>(type: "boolean", nullable: false),
                    AccessFailedCount = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUsers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetRoleClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    RoleId = table.Column<string>(type: "text", nullable: false),
                    ClaimType = table.Column<string>(type: "text", nullable: true),
                    ClaimValue = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoleClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetRoleClaims_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<string>(type: "text", nullable: false),
                    ClaimType = table.Column<string>(type: "text", nullable: true),
                    ClaimValue = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetUserClaims_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserLogins",
                columns: table => new
                {
                    LoginProvider = table.Column<string>(type: "text", nullable: false),
                    ProviderKey = table.Column<string>(type: "text", nullable: false),
                    ProviderDisplayName = table.Column<string>(type: "text", nullable: true),
                    UserId = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserLogins", x => new { x.LoginProvider, x.ProviderKey });
                    table.ForeignKey(
                        name: "FK_AspNetUserLogins_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserRoles",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "text", nullable: false),
                    RoleId = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserRoles", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserTokens",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "text", nullable: false),
                    LoginProvider = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Value = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserTokens", x => new { x.UserId, x.LoginProvider, x.Name });
                    table.ForeignKey(
                        name: "FK_AspNetUserTokens_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "BassSynthPresets",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    AppUserId = table.Column<string>(type: "text", nullable: false),
                    PresetName = table.Column<string>(type: "varchar(50)", nullable: false),
                    Attack = table.Column<double>(type: "double precision", nullable: false),
                    Decay = table.Column<double>(type: "double precision", nullable: false),
                    Sustain = table.Column<double>(type: "double precision", nullable: false),
                    Release = table.Column<double>(type: "double precision", nullable: false),
                    Waveform = table.Column<string>(type: "varchar(20)", nullable: false),
                    FilterFrequency = table.Column<double>(type: "double precision", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BassSynthPresets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BassSynthPresets_AspNetUsers_AppUserId",
                        column: x => x.AppUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DelayPresets",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    AppUserId = table.Column<string>(type: "text", nullable: false),
                    PresetName = table.Column<string>(type: "varchar(50)", nullable: false),
                    Mix = table.Column<double>(type: "double precision", nullable: false),
                    Time = table.Column<double>(type: "double precision", nullable: false),
                    Feedback = table.Column<double>(type: "double precision", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DelayPresets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DelayPresets_AspNetUsers_AppUserId",
                        column: x => x.AppUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DistortionPresets",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    AppUserId = table.Column<string>(type: "text", nullable: false),
                    PresetName = table.Column<string>(type: "varchar(50)", nullable: false),
                    Mix = table.Column<double>(type: "double precision", nullable: false),
                    Amount = table.Column<double>(type: "double precision", nullable: false),
                    FilterFrequency = table.Column<double>(type: "double precision", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DistortionPresets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DistortionPresets_AspNetUsers_AppUserId",
                        column: x => x.AppUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "KitPatternPresets",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    AppUserId = table.Column<string>(type: "text", nullable: false),
                    PresetName = table.Column<string>(type: "varchar(50)", nullable: false),
                    PatternLength = table.Column<int>(type: "integer", nullable: false),
                    BdSteps = table.Column<bool[]>(type: "boolean[]", nullable: false),
                    SdSteps = table.Column<bool[]>(type: "boolean[]", nullable: false),
                    ClSteps = table.Column<bool[]>(type: "boolean[]", nullable: false),
                    ChSteps = table.Column<bool[]>(type: "boolean[]", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KitPatternPresets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_KitPatternPresets_AspNetUsers_AppUserId",
                        column: x => x.AppUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "MelodicPatternPresets",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    AppUserId = table.Column<string>(type: "text", nullable: false),
                    PresetName = table.Column<string>(type: "varchar(50)", nullable: false),
                    Key = table.Column<string>(type: "varchar(3)", nullable: false),
                    Scale = table.Column<string>(type: "varchar(20)", nullable: false),
                    Sequence = table.Column<int[]>(type: "integer[]", nullable: false),
                    PatternType = table.Column<string>(type: "varchar(20)", nullable: false),
                    Transpose = table.Column<int>(type: "integer", nullable: false),
                    TimeInterval = table.Column<string>(type: "varchar(5)", nullable: false),
                    NoteDuration = table.Column<string>(type: "varchar(5)", nullable: false),
                    Length = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MelodicPatternPresets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MelodicPatternPresets_AspNetUsers_AppUserId",
                        column: x => x.AppUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "MelodicSynthPresets",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    AppUserId = table.Column<string>(type: "text", nullable: false),
                    PresetName = table.Column<string>(type: "varchar(50)", nullable: false),
                    Waveform = table.Column<string>(type: "varchar(50)", nullable: false),
                    Attack = table.Column<double>(type: "double precision", nullable: false),
                    Decay = table.Column<double>(type: "double precision", nullable: false),
                    Sustain = table.Column<double>(type: "double precision", nullable: false),
                    Release = table.Column<double>(type: "double precision", nullable: false),
                    FilterFrequency = table.Column<double>(type: "double precision", nullable: false),
                    FilterMod = table.Column<double>(type: "double precision", nullable: false),
                    FilterType = table.Column<string>(type: "varchar(50)", nullable: false),
                    Metal = table.Column<double>(type: "double precision", nullable: false),
                    Chorus = table.Column<double>(type: "double precision", nullable: false),
                    LfoFrequency = table.Column<string>(type: "varchar(50)", nullable: false),
                    LfoShape = table.Column<string>(type: "varchar(50)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MelodicSynthPresets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MelodicSynthPresets_AspNetUsers_AppUserId",
                        column: x => x.AppUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RefreshToken",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    AppUserId = table.Column<string>(type: "text", nullable: false),
                    Token = table.Column<string>(type: "text", nullable: false),
                    Expires = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Revoked = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RefreshToken", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RefreshToken_AspNetUsers_AppUserId",
                        column: x => x.AppUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ReverbPresets",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    AppUserId = table.Column<string>(type: "text", nullable: false),
                    PresetName = table.Column<string>(type: "varchar(50)", nullable: false),
                    Mix = table.Column<double>(type: "double precision", nullable: false),
                    Decay = table.Column<double>(type: "double precision", nullable: false),
                    PreDelay = table.Column<double>(type: "double precision", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ReverbPresets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ReverbPresets_AspNetUsers_AppUserId",
                        column: x => x.AppUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Songs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    AppUserId = table.Column<string>(type: "text", nullable: false),
                    SongName = table.Column<string>(type: "varchar(50)", nullable: false),
                    MasterVolume = table.Column<double>(type: "double precision", nullable: false),
                    DrumVolume = table.Column<double>(type: "double precision", nullable: false),
                    BassVolume = table.Column<double>(type: "double precision", nullable: false),
                    MelodicVolume = table.Column<double>(type: "double precision", nullable: false),
                    Bpm = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Songs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Songs_AspNetUsers_AppUserId",
                        column: x => x.AppUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "BassSynths",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Attack = table.Column<double>(type: "double precision", nullable: false),
                    Decay = table.Column<double>(type: "double precision", nullable: false),
                    Sustain = table.Column<double>(type: "double precision", nullable: false),
                    Release = table.Column<double>(type: "double precision", nullable: false),
                    Waveform = table.Column<string>(type: "varchar(20)", nullable: false),
                    FilterFrequency = table.Column<double>(type: "double precision", nullable: false),
                    SongId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BassSynths", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BassSynths_Songs_SongId",
                        column: x => x.SongId,
                        principalTable: "Songs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Delays",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Mix = table.Column<double>(type: "double precision", nullable: false),
                    Time = table.Column<double>(type: "double precision", nullable: false),
                    Feedback = table.Column<double>(type: "double precision", nullable: false),
                    SongId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Delays", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Delays_Songs_SongId",
                        column: x => x.SongId,
                        principalTable: "Songs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Distortions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Mix = table.Column<double>(type: "double precision", nullable: false),
                    Amount = table.Column<double>(type: "double precision", nullable: false),
                    FilterFrequency = table.Column<double>(type: "double precision", nullable: false),
                    SongId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Distortions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Distortions_Songs_SongId",
                        column: x => x.SongId,
                        principalTable: "Songs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "KitPatterns",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    PatternLength = table.Column<int>(type: "integer", nullable: false),
                    BdSteps = table.Column<bool[]>(type: "boolean[]", nullable: false),
                    SdSteps = table.Column<bool[]>(type: "boolean[]", nullable: false),
                    ClSteps = table.Column<bool[]>(type: "boolean[]", nullable: false),
                    ChSteps = table.Column<bool[]>(type: "boolean[]", nullable: false),
                    SongId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KitPatterns", x => x.Id);
                    table.ForeignKey(
                        name: "FK_KitPatterns_Songs_SongId",
                        column: x => x.SongId,
                        principalTable: "Songs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "MelodicPatterns",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Key = table.Column<string>(type: "varchar(3)", nullable: false),
                    Scale = table.Column<string>(type: "varchar(20)", nullable: false),
                    Sequence = table.Column<int[]>(type: "integer[]", nullable: false),
                    PatternType = table.Column<string>(type: "varchar(20)", nullable: false),
                    Transpose = table.Column<int>(type: "integer", nullable: false),
                    TimeInterval = table.Column<string>(type: "varchar(5)", nullable: false),
                    NoteDuration = table.Column<string>(type: "varchar(5)", nullable: false),
                    Length = table.Column<int>(type: "integer", nullable: false),
                    SongId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MelodicPatterns", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MelodicPatterns_Songs_SongId",
                        column: x => x.SongId,
                        principalTable: "Songs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "MelodicSynths",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Waveform = table.Column<string>(type: "varchar(50)", nullable: false),
                    Attack = table.Column<double>(type: "double precision", nullable: false),
                    Decay = table.Column<double>(type: "double precision", nullable: false),
                    Sustain = table.Column<double>(type: "double precision", nullable: false),
                    Release = table.Column<double>(type: "double precision", nullable: false),
                    FilterFrequency = table.Column<double>(type: "double precision", nullable: false),
                    FilterMod = table.Column<double>(type: "double precision", nullable: false),
                    FilterType = table.Column<string>(type: "varchar(50)", nullable: false),
                    Metal = table.Column<double>(type: "double precision", nullable: false),
                    Chorus = table.Column<double>(type: "double precision", nullable: false),
                    LfoFrequency = table.Column<string>(type: "varchar(50)", nullable: false),
                    LfoShape = table.Column<string>(type: "varchar(50)", nullable: false),
                    SongId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MelodicSynths", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MelodicSynths_Songs_SongId",
                        column: x => x.SongId,
                        principalTable: "Songs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Reverbs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Mix = table.Column<double>(type: "double precision", nullable: false),
                    Decay = table.Column<double>(type: "double precision", nullable: false),
                    PreDelay = table.Column<double>(type: "double precision", nullable: false),
                    SongId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Reverbs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Reverbs_Songs_SongId",
                        column: x => x.SongId,
                        principalTable: "Songs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AspNetRoleClaims_RoleId",
                table: "AspNetRoleClaims",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                table: "AspNetRoles",
                column: "NormalizedName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserClaims_UserId",
                table: "AspNetUserClaims",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserLogins_UserId",
                table: "AspNetUserLogins",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserRoles_RoleId",
                table: "AspNetUserRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                table: "AspNetUsers",
                column: "NormalizedEmail");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                table: "AspNetUsers",
                column: "NormalizedUserName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_BassSynthPresets_AppUserId",
                table: "BassSynthPresets",
                column: "AppUserId");

            migrationBuilder.CreateIndex(
                name: "IX_BassSynths_SongId",
                table: "BassSynths",
                column: "SongId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_DelayPresets_AppUserId",
                table: "DelayPresets",
                column: "AppUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Delays_SongId",
                table: "Delays",
                column: "SongId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_DistortionPresets_AppUserId",
                table: "DistortionPresets",
                column: "AppUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Distortions_SongId",
                table: "Distortions",
                column: "SongId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_KitPatternPresets_AppUserId",
                table: "KitPatternPresets",
                column: "AppUserId");

            migrationBuilder.CreateIndex(
                name: "IX_KitPatterns_SongId",
                table: "KitPatterns",
                column: "SongId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_MelodicPatternPresets_AppUserId",
                table: "MelodicPatternPresets",
                column: "AppUserId");

            migrationBuilder.CreateIndex(
                name: "IX_MelodicPatterns_SongId",
                table: "MelodicPatterns",
                column: "SongId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_MelodicSynthPresets_AppUserId",
                table: "MelodicSynthPresets",
                column: "AppUserId");

            migrationBuilder.CreateIndex(
                name: "IX_MelodicSynths_SongId",
                table: "MelodicSynths",
                column: "SongId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_RefreshToken_AppUserId",
                table: "RefreshToken",
                column: "AppUserId");

            migrationBuilder.CreateIndex(
                name: "IX_ReverbPresets_AppUserId",
                table: "ReverbPresets",
                column: "AppUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Reverbs_SongId",
                table: "Reverbs",
                column: "SongId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Songs_AppUserId",
                table: "Songs",
                column: "AppUserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AspNetRoleClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserLogins");

            migrationBuilder.DropTable(
                name: "AspNetUserRoles");

            migrationBuilder.DropTable(
                name: "AspNetUserTokens");

            migrationBuilder.DropTable(
                name: "BassSynthPresets");

            migrationBuilder.DropTable(
                name: "BassSynths");

            migrationBuilder.DropTable(
                name: "DelayPresets");

            migrationBuilder.DropTable(
                name: "Delays");

            migrationBuilder.DropTable(
                name: "DistortionPresets");

            migrationBuilder.DropTable(
                name: "Distortions");

            migrationBuilder.DropTable(
                name: "KitPatternPresets");

            migrationBuilder.DropTable(
                name: "KitPatterns");

            migrationBuilder.DropTable(
                name: "MelodicPatternPresets");

            migrationBuilder.DropTable(
                name: "MelodicPatterns");

            migrationBuilder.DropTable(
                name: "MelodicSynthPresets");

            migrationBuilder.DropTable(
                name: "MelodicSynths");

            migrationBuilder.DropTable(
                name: "RefreshToken");

            migrationBuilder.DropTable(
                name: "ReverbPresets");

            migrationBuilder.DropTable(
                name: "Reverbs");

            migrationBuilder.DropTable(
                name: "AspNetRoles");

            migrationBuilder.DropTable(
                name: "Songs");

            migrationBuilder.DropTable(
                name: "AspNetUsers");
        }
    }
}
