using Microsoft.EntityFrameworkCore.Migrations;

namespace FreeAds.API.Migrations
{
    public partial class ExtendedClassifiedAdsClass : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "ClassifiedAds",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Phone",
                table: "ClassifiedAds",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Email",
                table: "ClassifiedAds");

            migrationBuilder.DropColumn(
                name: "Phone",
                table: "ClassifiedAds");
        }
    }
}
