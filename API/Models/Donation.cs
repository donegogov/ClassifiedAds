using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FreeAds.API.Models
{
    public class Donation
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string City { get; set; }
        public DateTime DateAdded { get; set; } = DateTime.Now;
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Status { get; set; }
        public virtual ICollection<Photo> Photos { get; set; }
        public virtual AppUser AppUser { get; set; }
        public string AppUserId { get; set; }
        public virtual ICollection<Like> LikersUsers { get; set; }
    }
}
