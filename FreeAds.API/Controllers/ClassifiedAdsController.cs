using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using FreeAds.API.Data;
using FreeAds.API.Dtos;
using FreeAds.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FreeAds.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ClassifiedAdsController : ControllerBase
    {
        private readonly IClassifiedAdsRepository _repo;
        private readonly IMapper _mapper;

        public ClassifiedAdsController(IClassifiedAdsRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> GetClassifiedAds()
        {
            var classifiedAds = await _repo.GetClassifiedAds();

            var classifiedAdsToReturn = _mapper.Map<IEnumerable<ClassifiedAdsDto>>(classifiedAds);

            return Ok(classifiedAdsToReturn);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetClassifiedAdDetail(int id)
        {
            var classifiedAds = await _repo.GetClassifiedAdDetail(id);

            var classifiedAdsToReturn = _mapper.Map<ClassifiedAdsForDetailedDto>(classifiedAds);

            return Ok(classifiedAdsToReturn);
        }

        [HttpGet("user/{id}")]
        public async Task<IActionResult> GetClassifiedAdForUser(int id)
        {
            var classifiedAds = await _repo.GetClassifiedAdsForUser(id);

            var classifiedAdsToReturn = _mapper.Map<IEnumerable<ClassifiedAdsForUserDto>>(classifiedAds);

            return Ok(classifiedAdsToReturn);
        }

        // ova treba HttpGet
        [HttpPost("search")]
        public async Task<IActionResult> SearchClassifiedAdForUser(SearchQueryParametarsDto searchQueryParametars)
        {
            var classifiedAds = await _repo.SearchClassifiedAds(searchQueryParametars);

            var classifiedAdsToReturn = _mapper.Map<IEnumerable<ClassifiedAdsDto>>(classifiedAds);

            return Ok(classifiedAdsToReturn);
        }

        [HttpPut("add")]
        public async Task<IActionResult> Register(ClassifiedAdsForRegisterDto classifiedAdsDto)
        {

            ClassifiedAds classifiedAd = new ClassifiedAds
            {
                Title = classifiedAdsDto.Title,
                Description = classifiedAdsDto.Description,
                City = classifiedAdsDto.City,
                Category = classifiedAdsDto.Category,
                DateAdded = DateTime.Today,
                ValidTo = DateTime.Today.AddMonths(1),
                UserId = classifiedAdsDto.UserId
            };

            await _repo.Add(classifiedAd);

            return StatusCode(201);
        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _repo.Delete(id);
        }
    }
}