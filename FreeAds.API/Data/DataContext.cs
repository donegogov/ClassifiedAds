using FreeAds.API.Models;
using FreeAds.API.Models.Constants;
using Microsoft.EntityFrameworkCore;

namespace FreeAds.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base (options) {}
        
        public DbSet<Value> Values { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<ClassifiedAds> ClassifiedAds { get; set; }
        public DbSet<Photo> Photos { get; set; }
        public DbSet<City> Cities { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Like> Likes { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Like>()
                .HasKey(k => new { k.LikerUserId, k.LikedClassifiedAdsId });

            builder.Entity<Like>()
                .HasOne(u => u.LikerUser)
                .WithMany(ca => ca.LikedClassifiedAds)
                .HasForeignKey(fk => fk.LikerUserId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Like>()
                .HasOne(ca => ca.LikedClassifiedAds)
                .WithMany(u => u.LikersUsers)
                .HasForeignKey(fk => fk.LikedClassifiedAdsId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}