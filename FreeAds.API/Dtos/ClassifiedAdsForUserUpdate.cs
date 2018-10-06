using System.Collections.Generic;

namespace FreeAds.API.Dtos
{
    public class ClassifiedAdsForUserUpdate
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string City { get; set; }
        public string Category { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        //public ICollection<PhotoForDetailedDto> Photos { get; set; }
    }
}