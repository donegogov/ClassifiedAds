using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using FreeAds.API.Data;
using FreeAds.API.Dtos;
using FreeAds.API.Helpers;
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

        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetClassifiedAds([FromQuery]ClassifiedAdsParams classifiedAdsParams)
        {
            var classifiedAds = await _repo.GetClassifiedAds(classifiedAdsParams);

            var classifiedAdsToReturn = _mapper.Map<IEnumerable<ClassifiedAdsDto>>(classifiedAds);

            Response.AddPagination(classifiedAds.CurrentPage, classifiedAds.PageSize, classifiedAds.TotalCount, classifiedAds.TotalPages);

            return Ok(classifiedAdsToReturn);
        }

        [HttpGet("relevant")]
        public async Task<IActionResult> GetRelevantClassifiedAds([FromQuery]ClassifiedAdsParams classifiedAdsParams)
        {
            if (classifiedAdsParams.userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }

            var city = User.FindFirst(ClaimTypes.StateOrProvince).Value;

            var classifiedAds = await _repo.GetRelevantClassifiedAds(city, classifiedAdsParams);

            var classifiedAdsToReturn = _mapper.Map<IEnumerable<ClassifiedAdsDto>>(classifiedAds);

            Response.AddPagination(classifiedAds.CurrentPage, classifiedAds.PageSize, classifiedAds.TotalCount, classifiedAds.TotalPages);

            return Ok(classifiedAdsToReturn);
        }

        [AllowAnonymous]
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

        [AllowAnonymous]
        [HttpPost("search/{userId?}")]
        public async Task<IActionResult> SearchClassifiedAdForUser(SearchQueryParametarsDto searchQueryParametars, int? userId = null)
        {
            if (userId != null)
            {
                if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                {
                    return Unauthorized();
                }
            }

            var classifiedAds = await _repo.SearchClassifiedAds(searchQueryParametars, userId);

            var classifiedAdsToReturn = _mapper.Map<IEnumerable<ClassifiedAdsDto>>(classifiedAds);

            return Ok(classifiedAdsToReturn);
        }

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

            if (await _repo.SaveAll())
            {
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
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }

            var classifiedAdsForUserUpdateFromRepo = await _repo.GetClassifiedAdDetail(classifiedAdsForUserUpdate.Id);

            _mapper.Map(classifiedAdsForUserUpdate, classifiedAdsForUserUpdateFromRepo);

            if (await _repo.SaveAll())
            {
                return NoContent();
            }

            throw new Exception($"Updating classified ad {id} failed on save");
        }

        [Produces("application/json")]
        [HttpPost("{userId}/like/{classifiedAdId}")]
        public async Task<IActionResult> LikeClassifiedAd(int userId, int classifiedAdId)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }

            var like = await _repo.GetLike(userId, classifiedAdId);

            if (like != null)
            {
                _repo.Delete(like);

                if (await _repo.SaveAll())
                    return Ok("You have disliked classified ad ");

                return BadRequest("Failed to unlike the classified ad");
            }

            if (await _repo.GetClassifiedAdDetail(classifiedAdId) == null)
                return NotFound();

            like = new Like
            {
                LikerUserId = userId,
                LikedClassifiedAdsId = classifiedAdId
            };

            _repo.Add<Like>(like);

            if (await _repo.SaveAll())
                return Ok("You have liked classified ad ");

            return BadRequest("Failed to like the classified ad");
        }

        [HttpGet("user/likes")]
        public async Task<IActionResult> GetLikedClassifiedAds([FromQuery]ClassifiedAdsParams classifiedAdsParams)
        {
            if (classifiedAdsParams.userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }

            var classifiedAds = await _repo.GetUserLikedClassifiedAds(classifiedAdsParams);

            var classifiedAdsToReturn = _mapper.Map<IEnumerable<ClassifiedAdsDto>>(classifiedAds);

            Response.AddPagination(classifiedAds.CurrentPage, classifiedAds.PageSize, classifiedAds.TotalCount, classifiedAds.TotalPages);

            return Ok(classifiedAdsToReturn);
        }

        [AllowAnonymous]
        [Produces("application/json")]
        [HttpGet("likes/{classifiedAdId}")]
        public async Task<IActionResult> GetNumberOfLikesClassifiedAds(int classifiedAdId)
        {
            if (await _repo.GetClassifiedAdDetail(classifiedAdId) == null)
                return NotFound();

            var classifiedAds = await _repo.GetNumberOfLikesOfClassifiedAd(classifiedAdId);

            return Ok(classifiedAds);
        }
    }
}