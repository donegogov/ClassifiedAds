using AutoMapper;
using FreeAds.API.Data;
using FreeAds.API.Dtos;
using FreeAds.API.Helpers;
using FreeAds.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FreeAds.API.Controllers
{
    [Authorize]
    public class MessagesController : BaseApiController
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IUserRepository _userRepository;
        private readonly IMessageRepository _messageRepository;
        private readonly IMapper _mapper;
        private readonly IClassifiedAdsRepository _classifiedAdsRepository;

        public MessagesController(UserManager<AppUser> userManager, IUserRepository userRepository, IMessageRepository messageRepository, IMapper mapper,
            IClassifiedAdsRepository classifiedAdsRepository)
        {
            _userManager = userManager;
            _userRepository = userRepository;
            _messageRepository = messageRepository;
            _mapper = mapper;
            _classifiedAdsRepository = classifiedAdsRepository;
        }

        [HttpPost]
        public async Task<ActionResult<MessageDto>> CreateMessage([FromForm] CreateMessageDto createMessageDto)
        {
            var senderId = User.GetUserId();

            if(senderId != createMessageDto.SenderId)
            {
                return BadRequest();
            }

            if(senderId.ToString().ToLower() == createMessageDto.RecipientId.ToString().ToLower())
            {
                return BadRequest("You cannot sent messages to yourself");
            }

            var classifiedAdId = _classifiedAdsRepository.GetClassifiedAdDetail(createMessageDto.ClassifiedAdsId);

            if (classifiedAdId != null)
            {
                return BadRequest("ClassifiedAd not exist");
            }

            var sender = await _userManager.FindByIdAsync(senderId.ToLower());
            var recipent = await _userManager.FindByIdAsync(createMessageDto.RecipientId.ToLower());

            if (recipent == null)
            {
                return NotFound();
            }

            var message = new Message
            {
                Sender = sender,
                Recipient = recipent,
                SenderUsername = sender.UserName,
                RecipientUsername = recipent.UserName,
                SenderId = sender.Id,
                RecipientId = recipent.Id,
                Deleted = false,
                SenderDeleted = false,
                RecipientDeleted = false,
                Content = createMessageDto.Content,
                ClassifiedAdsId = createMessageDto.ClassifiedAdsId
            };

            _messageRepository.AddMessage(message);

            if (await _messageRepository.SaveAllAsync())
            {
                return Ok(_mapper.Map<MessageDto>(message));
            }

            return BadRequest("Failed to send message");
        }
    }
}
