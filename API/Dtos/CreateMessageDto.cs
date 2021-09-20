using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FreeAds.API.Dtos
{
    public class CreateMessageDto
    {
        public string RecipientId { get; set; }
        public string Content { get; set; }
        public string SenderId { get; set; }
        public Guid ClassifiedAdsId { get; set; }
    }
}
