using System.Collections.Generic;
using System.Threading.Tasks;
using FreeAds.API.Dtos;
using FreeAds.API.Helpers;
using FreeAds.API.Models;

namespace FreeAds.API.Data
{
    public interface IClassifiedAdsRepository
    {
        void Add<T>(T entity) where T: class;
        Task<ClassifiedAds> Add(ClassifiedAds classifiedAds);
        void Delete<T>(T entity) where T: class;
        bool Delete(int id);
        bool DeletePhoto(int id);
        Task<bool> SaveAll();
        Task<PagedList<ClassifiedAds>> GetClassifiedAds(ClassifiedAdsParams classifiedAdsParams);
        Task<PagedList<ClassifiedAds>> GetRelevantClassifiedAds(string city, ClassifiedAdsParams classifiedAdsParams);
        Task<IEnumerable<ClassifiedAds>> SearchClassifiedAds(SearchQueryParametarsDto searchQueryParametars);
        Task<IEnumerable<ClassifiedAds>> GetClassifiedAdsForUser(int userId);
        Task<ClassifiedAds> GetClassifiedAdDetail(int id);
        Task<Photo> GetPhoto(int id);
        Task<Photo> GetMainPhotoForClassifiedAd(int classfiedAdId);
        Task<Like> GetLike(int userId, int classifiedAdId);
        Task<PagedList<ClassifiedAds>> GetUserLikedClassifiedAds(ClassifiedAdsParams classifiedAdsParams);
        Task<int> GetNumberOfLikesOfClassifiedAd(int classifiedAdId);

    }
}