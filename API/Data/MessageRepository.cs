﻿using FreeAds.API.Dtos;
using FreeAds.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FreeAds.API.Data
{
    public class MessageRepository : IMessageRepository
    {
        private readonly DataContext _context;

        public MessageRepository(DataContext context)
        {
            _context = context;
        }

        public void AddMessage(Message message)
        {
            _context.Messages.Add(message);
        }

        public async Task<bool> DeleteSenderMessageAsync(Message message)
        {
            if (!message.SenderDeleted)
            {
                message.SenderDeleted = true;
                _context.Messages.Update(message);
                return await SaveAllAsync();
            }

            return false;
        }

        public async Task<bool> DeleteRecipentMessageAsync(Message message)
        {
            if (!message.RecipientDeleted)
            {
                message.RecipientDeleted = true;
                _context.Messages.Update(message);
                return await SaveAllAsync();
            }

            return false;
        }

        public async Task<bool> DeleteMessageAsync(Message message)
        {
            if(message.SenderDeleted && message.RecipientDeleted)
            {
                message.Deleted = true;
                _context.Messages.Update(message);
                return await SaveAllAsync();
            }

            return false;
        }

        public async Task<Message> GetMessage(int id)
        {
            return await _context.Messages.FindAsync(id);
        }

        public Task<Helpers.PagedList<MessageDto>> GetMessagesForUser()
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<MessageDto>> GetMessageThread(int currentUserId, int recipientId)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
