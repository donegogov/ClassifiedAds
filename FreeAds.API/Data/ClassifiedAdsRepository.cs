using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FreeAds.API.Dtos;
using FreeAds.API.Helpers;
using FreeAds.API.Models;
using Microsoft.EntityFrameworkCore;

namespace FreeAds.API.Data
{
    public class ClassifiedAdsRepository : IClassifiedAdsRepository
    {
        private readonly DataContext _context;
        public ClassifiedAdsRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<ClassifiedAds> Add(ClassifiedAds classifiedAds)
        {
            await _context.ClassifiedAds.AddAsync(classifiedAds);

            //await _context.SaveChangesAsync();

            return classifiedAds;
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public bool Delete(int id)
        {
            var classifiedAdsToDeleteAttach = new ClassifiedAds();
            classifiedAdsToDeleteAttach.Id = id;

            _context.ClassifiedAds.Attach(classifiedAdsToDeleteAttach);
            //var classifiedAdsToDelete = await _context.ClassifiedAds.FirstOrDefaultAsync(ca => ca.Id == id);

            _context.ClassifiedAds.Remove(classifiedAdsToDeleteAttach);

            return true;
        }

        public bool DeletePhoto(int id)
        {
            var photoToDeleteAttach = new Photo();
            photoToDeleteAttach.Id = id;

            _context.Photos.Attach(photoToDeleteAttach);
            //var classifiedAdsToDelete = await _context.ClassifiedAds.FirstOrDefaultAsync(ca => ca.Id == id);

            _context.Photos.Remove(photoToDeleteAttach);

            return true;
        }

        public async Task<ClassifiedAds> GetClassifiedAdDetail(int id)
        {
            var classifiedAd = await _context.ClassifiedAds.Include(p => p.Photos).FirstOrDefaultAsync(ca => ca.Id == id);

            return classifiedAd;
        }

        public async Task<IEnumerable<ClassifiedAds>> GetClassifiedAds()
        {
            var classifiedAds = await _context.ClassifiedAds.Where(vd => vd.DateAdded.CalculateValidTo()).Include(p => p.Photos).ToListAsync();

            return classifiedAds;
        }

        public async Task<IEnumerable<ClassifiedAds>> GetRelevantClassifiedAds(string city)
        {
            var classifiedAds = await _context.ClassifiedAds.Where(vd => vd.DateAdded.CalculateValidTo()).OrderByDescending(ca => ca.City.Equals(city)).Include(p => p.Photos).ToListAsync();
            
            //classifiedAds = classifiedAds.OrderByDescending(ca => ca.City.Equals(city)).ToList();
            //var top5ClassifiedAdsOrderByCity = await classifiedAds.OrderBy(ca => ca.City.Equals(city)).Take(5).ToListAsync();

            return classifiedAds;
        }

        public async Task<IEnumerable<ClassifiedAds>> GetClassifiedAdsForUser(int userId)
        {
            var classifiedAds = await _context.ClassifiedAds.Where(uid => uid.UserId == userId).Include(p => p.Photos).ToListAsync();

            return classifiedAds;
        }

        public async Task<IEnumerable<ClassifiedAds>> SearchClassifiedAds(SearchQueryParametarsDto searchQueryParametars)
        {
            char[] delimiterChars = { ' ', ',', '.', ':', '\t' };

            List<string> queryWords = searchQueryParametars.Query.Split(delimiterChars).ToList();

            var ca = await
                (from cal in _context.ClassifiedAds
                where cal.City == searchQueryParametars.City 
                        && cal.Category == searchQueryParametars.Category 
                        && (queryWords.Any(str => cal.Title.Contains(str, StringComparison.OrdinalIgnoreCase))
                        || queryWords.Any(str => cal.Description.Contains(str, StringComparison.OrdinalIgnoreCase)))
                select cal
                ).Include(p => p.Photos).ToListAsync();

            return ca;
        }

    public async Task<bool> SaveAll()
    {
        return await _context.SaveChangesAsync() > 0;
    }

        public async Task<Photo> GetPhoto(int id)
        {
            var photo = await _context.Photos.FirstOrDefaultAsync(p => p.Id == id);

            return photo;
        }

        public async Task<Photo> GetMainPhotoForClassifiedAd(int classfiedAdId)
        {
            var mainPhoto = await _context.Photos.Where(p => p.ClassifiedAdsId == classfiedAdId).FirstOrDefaultAsync(p => p.IsMain);

            return mainPhoto;
        }
    }
}