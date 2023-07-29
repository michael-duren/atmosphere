using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class UpdateMelodicPattern : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Scale",
                table: "MelodicPatterns",
                type: "varchar(20)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(50)");

            migrationBuilder.AlterColumn<string>(
                name: "PatternType",
                table: "MelodicPatterns",
                type: "varchar(20)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(50)");

            migrationBuilder.AddColumn<string>(
                name: "Key",
                table: "MelodicPatterns",
                type: "varchar(3)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "Length",
                table: "MelodicPatterns",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "NoteDuration",
                table: "MelodicPatterns",
                type: "varchar(5)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "TimeInterval",
                table: "MelodicPatterns",
                type: "varchar(5)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "Transpose",
                table: "MelodicPatterns",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Key",
                table: "MelodicPatterns");

            migrationBuilder.DropColumn(
                name: "Length",
                table: "MelodicPatterns");

            migrationBuilder.DropColumn(
                name: "NoteDuration",
                table: "MelodicPatterns");

            migrationBuilder.DropColumn(
                name: "TimeInterval",
                table: "MelodicPatterns");

            migrationBuilder.DropColumn(
                name: "Transpose",
                table: "MelodicPatterns");

            migrationBuilder.AlterColumn<string>(
                name: "Scale",
                table: "MelodicPatterns",
                type: "varchar(50)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(20)");

            migrationBuilder.AlterColumn<string>(
                name: "PatternType",
                table: "MelodicPatterns",
                type: "varchar(50)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(20)");
        }
    }
}
