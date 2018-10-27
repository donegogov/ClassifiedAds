using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using FreeAds.API.Data;
using FreeAds.API.Dtos;
using FreeAds.API.Helpers;
using FreeAds.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace FreeAds.API.Controllers
{
    [Authorize]
    [Route("api/{userId}/[controller]")]
    [ApiController]
    public class PhotosController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IOptions<CloudinarySettings> _cloudinaryConfig;
        private Cloudinary _cloudinary;
        private readonly IClassifiedAdsRepository _classifiedAdsRepo;

        public PhotosController(IClassifiedAdsRepository classifiedAdsRepo, IMapper mapper, IOptions<CloudinarySettings> cloudinaryConfig)
        {
            _classifiedAdsRepo = classifiedAdsRepo;
            _cloudinaryConfig = cloudinaryConfig;
            _mapper = mapper;

            Account acc = new Account(
                _cloudinaryConfig.Value.CloudName,
                _cloudinaryConfig.Value.ApiKey,
                _cloudinaryConfig.Value.ApiSecret
            );

            _cloudinary = new Cloudinary(acc);
        }

        [HttpGet("{id}", Name = "GetPhoto")]
        public async Task<IActionResult> GetPhoto(int id)
        {
            var photoFromRepo = await _classifiedAdsRepo.GetPhoto(id);

            var photo = _mapper.Map<PhotoForReturnDto>(photoFromRepo);

            return Ok(photo);
        }

        [HttpPost("{classifiedAdId}")]
        public async Task<IActionResult> AddPhoto(int userId, int classifiedAdId, 
            [FromForm]PhotoForCreationDto photoForCreationDto)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }

            var classifiedAdFromRepo = await _classifiedAdsRepo.GetClassifiedAdDetail(classifiedAdId);

            var file = photoForCreationDto.File;

            var uploadResult = new ImageUploadResult();

            if(file.Length > 0)
            {
                using (var stream = file.OpenReadStream())
                {
                    var uploadParams = new ImageUploadParams()
                    {
                        File = new FileDescription(file.FileName, stream),
                        Transformation = new Transformation().Width(500).Height(500)
                    };

                    uploadResult = _cloudinary.Upload(uploadParams);
                }
            }

            photoForCreationDto.Url = uploadResult.Uri.ToString();
            photoForCreationDto.PublicId = uploadResult.PublicId;

            var photo = _mapper.Map<Photo>(photoForCreationDto);

            if(!classifiedAdFromRepo.Photos.Any(p => p.IsMain))
                photo.IsMain = true;

            classifiedAdFromRepo.Photos.Add(photo);

            if(await _classifiedAdsRepo.SaveAll())
            {
                var photoToReturn = _mapper.Map<PhotoForReturnDto>(photo);
                return CreatedAtRoute("GetPhoto", new { id = photo.Id}, photoToReturn);
            }

            return BadRequest("Could not add the photo");
        }

        [HttpPost("{classifiedAdId}/setMain/{photoId}")]
        public async Task<IActionResult> SetMainPhoto(int userId, int photoId, int classifiedAdId)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }

            var classfiedAdFromRepo = await _classifiedAdsRepo.GetClassifiedAdDetail(classifiedAdId);

            if (!classfiedAdFromRepo.Photos.Any(p => p.Id == photoId))
            {
                return Unauthorized();
            }

            var photoFromRepo = await _classifiedAdsRepo.GetPhoto(photoId);

            if (photoFromRepo.IsMain)
            {
                return BadRequest("This is already main photo");
            }

            var currentMainPhoto = await _classifiedAdsRepo.GetMainPhotoForClassifiedAd(classifiedAdId);

            currentMainPhoto.IsMain = false;
            photoFromRepo.IsMain = true;

            if (await _classifiedAdsRepo.SaveAll())
                return NoContent();

            return BadRequest("Could not set the photo to main");
        }
    }
}