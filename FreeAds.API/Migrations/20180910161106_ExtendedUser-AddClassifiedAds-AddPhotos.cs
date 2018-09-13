using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace FreeAds.API.Migrations
{
    public partial class ExtendedUserAddClassifiedAdsAddPhotos : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "UserRole",
                table: "Users",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "ClassifiedAds",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Title = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    City = table.Column<string>(nullable: true),
                    Category = table.Column<string>(nullable: true),
                    DateAdded = table.Column<DateTime>(nullable: false),
                    ValidTo = table.Column<DateTime>(nullable: false),
                    UserId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClassifiedAds", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ClassifiedAds_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Photos",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Url = table.Column<string>(nullable: true),
                    DateAdded = table.Column<DateTime>(nullable: false),
                    IsMain = table.Column<bool>(nullable: false),
                    ClassifiedAdsId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Photos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Photos_ClassifiedAds_ClassifiedAdsId",
                        column: x => x.ClassifiedAdsId,
                        principalTable: "ClassifiedAds",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ClassifiedAds_UserId",
                table: "ClassifiedAds",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Photos_ClassifiedAdsId",
                table: "Photos",
                column: "ClassifiedAdsId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Photos");

            migrationBuilder.DropTable(
                name: "ClassifiedAds");

            migrationBuilder.DropColumn(
                name: "UserRole",
                table: "Users");
        }
    }
}
