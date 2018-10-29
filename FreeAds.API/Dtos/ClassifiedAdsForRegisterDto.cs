using System;

namespace FreeAds.API.Dtos
{
    public class ClassifiedAdsForRegisterDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string City { get; set; }
        public string Category { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        //public DateTime ValidTo { get; set; }
        //public ICollection<Photo> Photos { get; set; }
    }
}