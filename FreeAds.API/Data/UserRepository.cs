using System.Collections.Generic;
using System.Threading.Tasks;
using FreeAds.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace FreeAds.API.Data
{
    public class UserRepository : IUsersRepository
    {
        private readonly DataContext _context;
        public UserRepository(DataContext context)
        {
            _context = context;

        }
        public void Add(User user)
        {
            _context.Add(user);
        }

        public void Delete(int id)
        {
            var userToDeleteAttach = new User();
            userToDeleteAttach.Id = id;

            _context.Users.Attach(userToDeleteAttach);
            //var classifiedAdsToDelete = await _context.ClassifiedAds.FirstOrDefaultAsync(ca => ca.Id == id);

            _context.Users.Remove(userToDeleteAttach);
        }

        public async Task<User> GetUser(int id)
        {
            var user = await _context.Users.Include(u => u.ClassifiedAds).ThenInclude(ca => ca.Photos).FirstOrDefaultAsync(u => u.Id == id);

            return user;
        }

        public async Task<IEnumerable<User>> GetUsers()
        {
            var users = await _context.Users.Include(u => u.ClassifiedAds).ThenInclude(ca => ca.Photos).ToListAsync();

            return users;
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}