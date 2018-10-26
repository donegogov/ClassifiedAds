using System;

namespace FreeAds.API.Models
{
    public class Photo
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public DateTime DateAdded { get; set; }
        public bool IsMain { get; set; }
        public string PublicId { get; set; }
        public ClassifiedAds ClassifiedAds { get; set; }
        public int ClassifiedAdsId { get; set; }
    }
}