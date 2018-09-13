using System;
using FreeAds.API.Models;

namespace FreeAds.API.Dtos
{
    public class ClassifiedAdsForDetailedDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string City { get; set; }
        public string Category { get; set; }
        public DateTime DateAdded { get; set; }
        public DateTime ValidTo { get; set; }
        //public ICollection<Photo> Photos { get; set; }
        public User User { get; set; }
    }
}