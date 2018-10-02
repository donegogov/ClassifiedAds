using System.Collections.Generic;
using FreeAds.API.Models;

namespace FreeAds.API.Dtos
{
    public class UserForListDto
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string UserRole { get; set; }
        public ICollection<ClassifiedAdsForUserDto> ClassifiedAds {get; set; } 
    }
}