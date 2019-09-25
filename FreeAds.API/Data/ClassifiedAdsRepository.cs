using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
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
            var classifiedAd = await _context.ClassifiedAds.FirstOrDefaultAsync(ca => ca.Id == id);

            classifiedAd.Category = ConvertEngToMkd(classifiedAd.Category);

            classifiedAd.City = ConvertEngToMkd(classifiedAd.City);

            return classifiedAd;
        }

        public async Task<PagedList<ClassifiedAds>> GetClassifiedAds(ClassifiedAdsParams classifiedAdsParams)
        {
            var classifiedAds = _context.ClassifiedAds.Where(vd => vd.DateAdded.CalculateValidTo());

            return await PagedList<ClassifiedAds>.CreateAsync(classifiedAds, classifiedAdsParams.PageNumber, classifiedAdsParams.PageSize);
        }

        public async Task<PagedList<ClassifiedAds>> GetUserLikedClassifiedAds(ClassifiedAdsParams classifiedAdsParams)
        {
            var userLikes = await GetUserLikesClassifiedAds(classifiedAdsParams.userId);

            var classifiedAds = _context.ClassifiedAds.Where(ca => userLikes.Contains(ca.Id)).AsQueryable();

            return await PagedList<ClassifiedAds>.CreateAsync(classifiedAds, classifiedAdsParams.PageNumber, classifiedAdsParams.PageSize);
        }

        public async Task<IEnumerable<int>> GetUserLikesClassifiedAds(int userId)
        {
            return await _context.Likes.Where(l => l.LikerUserId == userId).Select(l => l.LikedClassifiedAdsId).ToListAsync();
        }

        public async Task<PagedList<ClassifiedAds>> GetRelevantClassifiedAds(string city, ClassifiedAdsParams classifiedAdsParams)
        {
            var classifiedAds = _context.ClassifiedAds.Where(vd => vd.DateAdded.CalculateValidTo() && vd.UserId != classifiedAdsParams.userId).OrderByDescending(ca => ca.City.Equals(city));

            return await PagedList<ClassifiedAds>.CreateAsync(classifiedAds, classifiedAdsParams.PageNumber, classifiedAdsParams.PageSize);
            
            //classifiedAds = classifiedAds.OrderByDescending(ca => ca.City.Equals(city)).ToList();
            //var top5ClassifiedAdsOrderByCity = await classifiedAds.OrderBy(ca => ca.City.Equals(city)).Take(5).ToListAsync();
        }

        public async Task<IEnumerable<ClassifiedAds>> GetClassifiedAdsForUser(int userId)
        {
            var classifiedAds = await _context.ClassifiedAds.Where(uid => uid.UserId == userId).ToListAsync();

            return classifiedAds;
        }

        public async Task<IEnumerable<ClassifiedAds>> SearchClassifiedAds(SearchQueryParametarsDto searchQueryParametars, int? userId)
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
                ).ToListAsync();

            if (userId != null)
            {
                var caToReturn = ca.Where(cads => cads.UserId != userId);

                return caToReturn;
            }

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

        public async Task<Like> GetLike(int userId, int classifiedAdId)
        {
            return await _context.Likes.FirstOrDefaultAsync(l => l.LikerUserId == userId && l.LikedClassifiedAdsId == classifiedAdId);
        }

        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public async Task<int> GetNumberOfLikesOfClassifiedAd(int classifiedAdId)
        {
            return await _context.Likes.CountAsync(l => l.LikedClassifiedAdsId == classifiedAdId);

        }

        public String ConvertEngToMkd(String input)
        {
            String expectedMacedonianKirilicaLowerCase = "а б в г д ѓ е ж з ѕ и ј к л љ м н њ о п р с т ќ у ф х ц ч џ ш";

            String expectedMacedonianKirilicaUpperCase = "А Б В Г Д Ѓ Е Ж З Ѕ И Ј К Л Љ М Н Њ О П Р С Т Ќ У Ф Х Ц Ч Џ Ш";

            String expectedMacedonianLatinLowerCase = "a b v g d gjs e zhs z dzs i j k l ljs m n njs o p r s t kjs u f h c chs djs shs";

            String expectedMacedonianLatinUpperCase = expectedMacedonianLatinLowerCase.ToUpper();

            String []expectedMacedonianKirilicaLowerCaseArray = expectedMacedonianKirilicaLowerCase.Split(" ");

            String []expectedMacedonianKirilicaUpperCaseArray = expectedMacedonianKirilicaUpperCase.Split(" ");

            String []expectedMacedonianLatinLowerCaseArray = expectedMacedonianLatinLowerCase.Split(" ");

            String []expectedMacedonianLatinUpperCaseArray = expectedMacedonianLatinUpperCase.Split(" ");

            String result = "";
            bool secondUpperLetter = true;

            for(int i = 0; i < input.Length; i++)
            {
                String c = input[i].ToString();

                if(i < input.Length - 2)
                {
                    if(("s".Equals(input[i+2]) || "S".Equals(input[i+2])) && ("gjs".Contains(String.Concat(c, input[i+1], input[i+2])) || 
                    "zhs".Contains(String.Concat(c, input[i+1], input[i+2])) ||
                    "dzs".Contains(String.Concat(c, input[i+1], input[i+2])) ||
                    "ljs".Contains(String.Concat(c, input[i+1], input[i+2])) ||
                    "njs".Contains(String.Concat(c, input[i+1], input[i+2])) || 
                    "kjs".Contains(String.Concat(c, input[i+1], input[i+2])) ||
                    "chs".Contains(String.Concat(c, input[i+1], input[i+2])) ||
                    "djs".Contains(String.Concat(c, input[i+1], input[i+2])) ||
                    "shs".Contains(String.Concat(c, input[i+1], input[i+2])) ||
                    "ZHS".Contains(String.Concat(c, input[i+1], input[i+2])) ||
                    "DZS".Contains(String.Concat(c, input[i+1], input[i+2])) ||
                    "LJS".Contains(String.Concat(c, input[i+1], input[i+2])) ||
                    "NJS".Contains(String.Concat(c, input[i+1], input[i+2])) || 
                    "KJS".Contains(String.Concat(c, input[i+1], input[i+2])) ||
                    "CHS".Contains(String.Concat(c, input[i+1], input[i+2])) ||
                    "DJS".Contains(String.Concat(c, input[i+1], input[i+2])) ||
                    "SHS".Contains(String.Concat(c, input[i+1], input[i+2]))))
                    {
                        c = input.Substring(i, i+2);
                        i += 2;
                    }
                }

                int charPosition = Array.IndexOf(expectedMacedonianLatinUpperCaseArray, c.ToString());

                if(charPosition == -1)
                {
                    charPosition = Array.IndexOf(expectedMacedonianLatinLowerCaseArray, c.ToString());

                    if(charPosition == -1)
                    {
                        return input;
                    }
                    else
                    {
                        result += expectedMacedonianKirilicaLowerCaseArray[charPosition];
                    }
                }
                else
                {
                    if(!secondUpperLetter)
                    {
                        result += " ";
                        result += expectedMacedonianKirilicaUpperCaseArray[charPosition];
                        continue;
                    }
                    else
                    {
                        result += expectedMacedonianKirilicaUpperCaseArray[charPosition];
                        secondUpperLetter = false;
                    }
                }

                
            }

            return result;
        }
    }
}