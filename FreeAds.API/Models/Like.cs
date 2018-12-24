namespace FreeAds.API.Models
{
    public class Like
    {
        public int LikerUserId { get; set; }
        public int LikedClassifiedAdsId { get; set; }
        public User LikerUser { get; set; }
        public ClassifiedAds LikedClassifiedAds { get; set; }
    }
}