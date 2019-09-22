using System.ComponentModel.DataAnnotations;

namespace FreeAds.API.Models
{
    public class Like
    {
        public int LikerUserId { get; set; }
        public int LikedClassifiedAdsId { get; set; }
        public virtual User LikerUser { get; set; }
        public virtual ClassifiedAds LikedClassifiedAds { get; set; }
    }
}