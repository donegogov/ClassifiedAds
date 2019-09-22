using System.ComponentModel.DataAnnotations;

namespace FreeAds.API.Dtos
{
    public class UserForUpdateDto
    {
        [Required]
        public string Username { get; set; }
    }
}