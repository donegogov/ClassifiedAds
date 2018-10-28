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
    }
}