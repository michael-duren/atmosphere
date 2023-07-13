using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddPresets : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Name",
                table: "MelodicPatterns");

            migrationBuilder.DropColumn(
                name: "PatternName",
                table: "KitPatterns");

            migrationBuilder.RenameColumn(
                name: "Steps",
                table: "KitPatterns",
                newName: "SdSteps");

            migrationBuilder.AddColumn<int[]>(
                name: "BdSteps",
                table: "KitPatterns",
                type: "integer[]",
                nullable: false,
                defaultValue: new int[0]);

            migrationBuilder.AddColumn<int[]>(
                name: "ChSteps",
                table: "KitPatterns",
                type: "integer[]",
                nullable: false,
                defaultValue: new int[0]);

            migrationBuilder.AddColumn<int[]>(
                name: "ClSteps",
                table: "KitPatterns",
                type: "integer[]",
                nullable: false,
                defaultValue: new int[0]);

            migrationBuilder.CreateTable(
                name: "BassSynthPreset",
                columns: table => new
                {
                    BassSynthId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    AppUserId = table.Column<string>(type: "text", nullable: false),
                    PresetName = table.Column<string>(type: "text", nullable: false),
                    Attack = table.Column<double>(type: "double precision", nullable: false),
                    Decay = table.Column<double>(type: "double precision", nullable: false),
                    Waveform = table.Column<string>(type: "text", nullable: false),
                    Filter = table.Column<double>(type: "double precision", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BassSynthPreset", x => x.BassSynthId);
                    table.ForeignKey(
                        name: "FK_BassSynthPreset_AspNetUsers_AppUserId",
                        column: x => x.AppUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DelayPreset",
                columns: table => new
                {
                    DelayId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    AppUserId = table.Column<string>(type: "text", nullable: false),
                    PresetName = table.Column<string>(type: "text", nullable: false),
                    Mix = table.Column<double>(type: "double precision", nullable: false),
                    Time = table.Column<double>(type: "double precision", nullable: false),
                    Feedback = table.Column<double>(type: "double precision", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DelayPreset", x => x.DelayId);
                    table.ForeignKey(
                        name: "FK_DelayPreset_AspNetUsers_AppUserId",
                        column: x => x.AppUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DistortionPreset",
                columns: table => new
                {
                    DistortionId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    AppUserId = table.Column<string>(type: "text", nullable: false),
                    PresetName = table.Column<string>(type: "text", nullable: false),
                    Mix = table.Column<double>(type: "double precision", nullable: false),
                    Amount = table.Column<double>(type: "double precision", nullable: false),
                    Filter = table.Column<double>(type: "double precision", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DistortionPreset", x => x.DistortionId);
                    table.ForeignKey(
                        name: "FK_DistortionPreset_AspNetUsers_AppUserId",
                        column: x => x.AppUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "KitPatternPreset",
                columns: table => new
                {
                    KitPatternId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    AppUserId = table.Column<string>(type: "text", nullable: false),
                    PatternName = table.Column<string>(type: "text", nullable: false),
                    BdSteps = table.Column<int[]>(type: "integer[]", nullable: false),
                    SdSteps = table.Column<int[]>(type: "integer[]", nullable: false),
                    ClSteps = table.Column<int[]>(type: "integer[]", nullable: false),
                    ChSteps = table.Column<int[]>(type: "integer[]", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KitPatternPreset", x => x.KitPatternId);
                    table.ForeignKey(
                        name: "FK_KitPatternPreset_AspNetUsers_AppUserId",
                        column: x => x.AppUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "MelodicPatternPreset",
                columns: table => new
                {
                    MelodicPatternId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    AppUserId = table.Column<string>(type: "text", nullable: false),
                    PresetName = table.Column<string>(type: "text", nullable: false),
                    Scale = table.Column<string>(type: "text", nullable: false),
                    Sequence = table.Column<int[]>(type: "integer[]", nullable: false),
                    PatternType = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MelodicPatternPreset", x => x.MelodicPatternId);
                    table.ForeignKey(
                        name: "FK_MelodicPatternPreset_AspNetUsers_AppUserId",
                        column: x => x.AppUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "MelodicSynthPreset",
                columns: table => new
                {
                    MelodicSynthId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    AppUserId = table.Column<string>(type: "text", nullable: false),
                    PresetName = table.Column<string>(type: "text", nullable: false),
                    Waveform = table.Column<string>(type: "text", nullable: false),
                    Attack = table.Column<double>(type: "double precision", nullable: false),
                    Decay = table.Column<double>(type: "double precision", nullable: false),
                    Sustain = table.Column<double>(type: "double precision", nullable: false),
                    Release = table.Column<double>(type: "double precision", nullable: false),
                    FilterFrequency = table.Column<double>(type: "double precision", nullable: false),
                    FilterMod = table.Column<double>(type: "double precision", nullable: false),
                    FilterType = table.Column<string>(type: "text", nullable: false),
                    Metal = table.Column<double>(type: "double precision", nullable: false),
                    Chorus = table.Column<double>(type: "double precision", nullable: false),
                    LfoFrequency = table.Column<double>(type: "double precision", nullable: false),
                    LfoShape = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MelodicSynthPreset", x => x.MelodicSynthId);
                    table.ForeignKey(
                        name: "FK_MelodicSynthPreset_AspNetUsers_AppUserId",
                        column: x => x.AppUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ReverbPreset",
                columns: table => new
                {
                    ReverbId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    AppUserId = table.Column<string>(type: "text", nullable: false),
                    PresetName = table.Column<string>(type: "text", nullable: false),
                    Mix = table.Column<double>(type: "double precision", nullable: false),
                    Decay = table.Column<double>(type: "double precision", nullable: false),
                    PreDelay = table.Column<double>(type: "double precision", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ReverbPreset", x => x.ReverbId);
                    table.ForeignKey(
                        name: "FK_ReverbPreset_AspNetUsers_AppUserId",
                        column: x => x.AppUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BassSynthPreset_AppUserId",
                table: "BassSynthPreset",
                column: "AppUserId");

            migrationBuilder.CreateIndex(
                name: "IX_DelayPreset_AppUserId",
                table: "DelayPreset",
                column: "AppUserId");

            migrationBuilder.CreateIndex(
                name: "IX_DistortionPreset_AppUserId",
                table: "DistortionPreset",
                column: "AppUserId");

            migrationBuilder.CreateIndex(
                name: "IX_KitPatternPreset_AppUserId",
                table: "KitPatternPreset",
                column: "AppUserId");

            migrationBuilder.CreateIndex(
                name: "IX_MelodicPatternPreset_AppUserId",
                table: "MelodicPatternPreset",
                column: "AppUserId");

            migrationBuilder.CreateIndex(
                name: "IX_MelodicSynthPreset_AppUserId",
                table: "MelodicSynthPreset",
                column: "AppUserId");

            migrationBuilder.CreateIndex(
                name: "IX_ReverbPreset_AppUserId",
                table: "ReverbPreset",
                column: "AppUserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BassSynthPreset");

            migrationBuilder.DropTable(
                name: "DelayPreset");

            migrationBuilder.DropTable(
                name: "DistortionPreset");

            migrationBuilder.DropTable(
                name: "KitPatternPreset");

            migrationBuilder.DropTable(
                name: "MelodicPatternPreset");

            migrationBuilder.DropTable(
                name: "MelodicSynthPreset");

            migrationBuilder.DropTable(
                name: "ReverbPreset");

            migrationBuilder.DropColumn(
                name: "BdSteps",
                table: "KitPatterns");

            migrationBuilder.DropColumn(
                name: "ChSteps",
                table: "KitPatterns");

            migrationBuilder.DropColumn(
                name: "ClSteps",
                table: "KitPatterns");

            migrationBuilder.RenameColumn(
                name: "SdSteps",
                table: "KitPatterns",
                newName: "Steps");

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "MelodicPatterns",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "PatternName",
                table: "KitPatterns",
                type: "text",
                nullable: false,
                defaultValue: "");
        }
    }
}
