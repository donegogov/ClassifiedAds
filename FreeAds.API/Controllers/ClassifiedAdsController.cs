using System;
using System.Collections.Generic;
using System.Security.Claims;
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
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }

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

        //nz dali treba HttpPut za dodavanje classified ads
        [HttpPut("add/{userId}")]
        public async Task<IActionResult> Register(int userId, ClassifiedAdsForRegisterDto classifiedAdForRegisterDto)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }

            ClassifiedAds classifiedAd = new ClassifiedAds
            {
                Title = classifiedAdForRegisterDto.Title,
                Description = classifiedAdForRegisterDto.Description,
                City = classifiedAdForRegisterDto.City,
                Category = classifiedAdForRegisterDto.Category,
                Email = classifiedAdForRegisterDto.Email,
                Phone = classifiedAdForRegisterDto.Phone,
                DateAdded = DateTime.Now,
                ValidTo = DateTime.Today.AddMonths(1),
                UserId = userId
            };

            await _repo.Add(classifiedAd);

            if (await _repo.SaveAll()) {
                var classifiedAdsToReturn = _mapper.Map<ClassifiedAdsForRegisterDto>(classifiedAd);

                return Ok(classifiedAdsToReturn);
            }

            return BadRequest("Failed to add the Classified Ad");
        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _repo.Delete(id);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateClassifiedAds(int id, ClassifiedAdsForUserUpdate classifiedAdsForUserUpdate)
        {
            if(id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }

            var classifiedAdsForUserUpdateFromRepo = await _repo.GetClassifiedAdDetail(classifiedAdsForUserUpdate.Id);

            _mapper.Map(classifiedAdsForUserUpdate, classifiedAdsForUserUpdateFromRepo);

            if( await _repo.SaveAll())
            {
                return NoContent();
            }

            throw new Exception($"Updating classified ad {id} failed on save");
        }
    }
}