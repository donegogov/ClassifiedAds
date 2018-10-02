using System.Collections.Generic;
using System.Threading.Tasks;
using FreeAds.API.Dtos;
using FreeAds.API.Models;

namespace FreeAds.API.Data
{
    public interface IClassifiedAdsRepository
    {
        Task<ClassifiedAds> Add(ClassifiedAds classifiedAds);
        void Delete(int id);
        Task<bool> SaveAll();
        Task<IEnumerable<ClassifiedAds>> GetClassifiedAds();
        Task<IEnumerable<ClassifiedAds>> SearchClassifiedAds(SearchQueryParametarsDto searchQueryParametars);
        Task<IEnumerable<ClassifiedAds>> GetClassifiedAdsForUser(int userId);
        Task<ClassifiedAds> GetClassifiedAdDetail(int id);
    }
}