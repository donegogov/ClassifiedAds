using System;
using System.Collections.Generic;
using System.Linq;
using FreeAds.API.Models;
using FreeAds.API.Models.Constants;
using Newtonsoft.Json;

namespace FreeAds.API.Data
{
    public class Seed
    {
        private readonly DataContext _context;
        public Seed(DataContext context)
        {
            _context = context;
        }

        public void SeedUsers()
        {
            if (!_context.Users.Any())
            {
                var userData = System.IO.File.ReadAllText("Data/UserSeedData.json");
                var users = JsonConvert.DeserializeObject<List<User>>(userData);
                foreach (var user in users)
                {
                    byte[] passwordHash, passwordSalt;

                    CreatePasswordHash("password", out passwordHash, out passwordSalt);

                    user.PasswordHash = passwordHash;
                    user.PasswordSalt = passwordSalt;
                    user.Username = user.Username.ToLower();

                    _context.Users.Add(user);
                }

                _context.SaveChanges();
            }
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        public void SeedCategories()
        {
            if (!_context.Categories.Any())
            {
                /*
                List<String> CategoryName = new List<String>();
                List<String> CategoryValue = new List<String>();

                CategoryName.Add("PC");
                CategoryValue.Add("PC");

                CategoryName.Add("Lap Top");
                CategoryValue.Add("Lap Top");

                CategoryName.Add("TV");
                CategoryValue.Add("TV");

                CategoryName.Add("Phone");
                CategoryValue.Add("Phone");
                */

                Dictionary<String, String> Category = new Dictionary<string, string>();
                Category.Add("PC", "PC");
                Category.Add("Lap Top", "Lap Top");
                Category.Add("TV", "TV");
                Category.Add("Phone", "Phone");

                foreach (KeyValuePair<string, string> entry in Category)
                {
                    // do something with entry.Value or entry.Key
                    _context.Categories.Add(
                        new Category(entry.Value, entry.Key)
                        );
                }

                _context.SaveChanges();
            }
        }

        public void SeedCites()
        {
            if (!_context.Cities.Any())
            {
                /*
                List<String> CategoryName = new List<String>();
                List<String> CategoryValue = new List<String>();

                CategoryName.Add("PC");
                CategoryValue.Add("PC");

                CategoryName.Add("Lap Top");
                CategoryValue.Add("Lap Top");

                CategoryName.Add("TV");
                CategoryValue.Add("TV");

                CategoryName.Add("Phone");
                CategoryValue.Add("Phone");
                */

                Dictionary<String, String> City = new Dictionary<string, string>();
                City.Add("Waterford", "Waterford");
                City.Add("Bancroft", "Bancroft");
                City.Add("Alamo", "Alamo");
                City.Add("Martinez", "Martinez");


                foreach (KeyValuePair<string, string> entry in City)
                {
                    // do something with entry.Value or entry.Key
                    _context.Cities.Add(
                        new City(entry.Value, entry.Key)
                        );
                }

                _context.SaveChanges();
            }
        }
    }
}