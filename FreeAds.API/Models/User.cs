using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using FreeAds.API.enums;

namespace FreeAds.API.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public string UserRole { get; set; }
        //[EmailAddress]
        //public string Email { get; set; }
        //[Phone]
        //public string Phone { get; set; }
        public ICollection<ClassifiedAds> ClassifiedAds { get; set; }
    }
}