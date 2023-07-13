using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "SongId",
                table: "Songs",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "ReverbId",
                table: "Reverbs",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "ReverbId",
                table: "ReverbPreset",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "MelodicSynthId",
                table: "MelodicSynths",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "MelodicSynthId",
                table: "MelodicSynthPreset",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "MelodicPatternId",
                table: "MelodicPatterns",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "MelodicPatternId",
                table: "MelodicPatternPreset",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "KitPatternId",
                table: "KitPatterns",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "KitPatternId",
                table: "KitPatternPreset",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "DistortionId",
                table: "Distortions",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "DistortionId",
                table: "DistortionPreset",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "DelayId",
                table: "Delays",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "DelayId",
                table: "DelayPreset",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "BassSynthId",
                table: "BassSynths",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "BassSynthId",
                table: "BassSynthPreset",
                newName: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Songs",
                newName: "SongId");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Reverbs",
                newName: "ReverbId");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "ReverbPreset",
                newName: "ReverbId");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "MelodicSynths",
                newName: "MelodicSynthId");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "MelodicSynthPreset",
                newName: "MelodicSynthId");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "MelodicPatterns",
                newName: "MelodicPatternId");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "MelodicPatternPreset",
                newName: "MelodicPatternId");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "KitPatterns",
                newName: "KitPatternId");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "KitPatternPreset",
                newName: "KitPatternId");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Distortions",
                newName: "DistortionId");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "DistortionPreset",
                newName: "DistortionId");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Delays",
                newName: "DelayId");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "DelayPreset",
                newName: "DelayId");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "BassSynths",
                newName: "BassSynthId");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "BassSynthPreset",
                newName: "BassSynthId");
        }
    }
}
