using Microsoft.EntityFrameworkCore.Migrations;

namespace FreeAds.API.Migrations
{
    public partial class AddedLikeEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Likes",
                columns: table => new
                {
                    LikerUserId = table.Column<int>(nullable: false),
                    LikedClassifiedAdsId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Likes", x => new { x.LikerUserId, x.LikedClassifiedAdsId });
                    table.ForeignKey(
                        name: "FK_Likes_ClassifiedAds_LikedClassifiedAdsId",
                        column: x => x.LikedClassifiedAdsId,
                        principalTable: "ClassifiedAds",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Likes_Users_LikerUserId",
                        column: x => x.LikerUserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Likes_LikedClassifiedAdsId",
                table: "Likes",
                column: "LikedClassifiedAdsId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Likes");
        }
    }
}
