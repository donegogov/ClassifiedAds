using System.Collections.Generic;
using System.Threading.Tasks;
using FreeAds.API.Models;

namespace FreeAds.API.Data
{
    public interface IUsersRepository
    {
         void Add(User user);
         void Delete(int id);
         Task<bool> SaveAll();
         Task<IEnumerable<User>> GetUsers();
         Task<User> GetUser(int id);
    }
}