using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using FreeAds.API.enums;

namespace FreeAds.API.Models
{
    public class ClassifiedAds
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string City { get; set; }
        public string Category { get; set; }
        public DateTime DateAdded { get; set; }
        public DateTime ValidTo { get; set; }
        [EmailAddress]
        public string Email { get; set; }
        [Phone]
        public string Phone { get; set; }
        public ICollection<Photo> Photos { get; set; }
        public User User { get; set; }
        public int UserId { get; set; }
    }
}