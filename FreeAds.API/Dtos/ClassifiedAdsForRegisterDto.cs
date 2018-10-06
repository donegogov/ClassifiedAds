using System;

namespace FreeAds.API.Dtos
{
    public class ClassifiedAdsForRegisterDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string City { get; set; }
        public string Category { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        //public DateTime ValidTo { get; set; }
        //public ICollection<Photo> Photos { get; set; }
        public int UserId { get; set; }
    }
}