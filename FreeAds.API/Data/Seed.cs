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
        //.net core 2.1
        /* private readonly DataContext _context;
        public Seed(DataContext context)
        {
            _context = context;
        } */

        public static void SeedUsers(DataContext context)
        {
            if (!context.Users.Any())
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

                    context.Users.Add(user);
                }

                context.SaveChanges();
            }
        }

        private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        public static void SeedCategories(DataContext context)
        {
            if (!context.Categories.Any())
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
                Category.Add("Мебел", "Mebel");
                Category.Add("Бела Техника", "BelaTehnika");
                Category.Add("Електроника", "Elektronika");
                Category.Add("Останато", "Ostanato");

                foreach (KeyValuePair<string, string> entry in Category)
                {
                    // do something with entry.Value or entry.Key
                    context.Categories.Add(
                        new Category(entry.Key, entry.Value)
                        );
                }

                context.SaveChanges();
            }
        }

        public static void SeedCites(DataContext context)
        {
            if (!context.Cities.Any())
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
                City.Add("Берово", "Berovo");
                City.Add("Битола", "Bitola");
                City.Add("Валандово", "Valandovo");
                City.Add("Велес", "Veles");

                City.Add("Виница", "Vinica");
                City.Add("Гевгелиjа", "Gevgelija");
                City.Add("Гостивар", "Gostivar");
                City.Add("Дебар", "Debar");

                City.Add("Делчево", "Delchsevo");
                City.Add("Демир Хисар", "DemirHisar");
                City.Add("Кавадарци", "Kavadarci");
                City.Add("Кичево", "Kichsevo");

                City.Add("Кочани", "Kochsani");
                City.Add("Кратово", "Kratovo");
                City.Add("Крива Паланка", "KrivaPalanka");
                City.Add("Крушево", "Krushsevo");

                City.Add("Куманово", "Kumanovo");
                City.Add("Македонски Брод", "MakedonskiBrod");
                City.Add("Неготино", "Negotino");
                City.Add("Охрид", "Ohrid");

                City.Add("Прилеп", "Prilep");
                City.Add("Пробиштип", "Probishstip");
                City.Add("Радовиш", "Radovishs");
                City.Add("Ресен", "Resen");

                City.Add("Свети Николе", "SvetiNikole");
                City.Add("Скопjе", "Skopje");
                City.Add("Струга", "Struga");
                City.Add("Струмица", "Strumica");

                City.Add("Тетово", "Tetovo");
                City.Add("Штип", "SHStip");

                foreach (KeyValuePair<string, string> entry in City)
                {
                    // do something with entry.Value or entry.Key
                    context.Cities.Add(
                        new City(entry.Key, entry.Value)
                        );
                }

                context.SaveChanges();
            }
        }
    }
}