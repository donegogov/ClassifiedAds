using System;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
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
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace FreeAds.API.Controllers
{
    [Authorize]
    [Route("api/{userId}/[controller]")]
    public class PhotosController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IOptions<CloudinarySettings> _cloudinaryConfig;
        private Cloudinary _cloudinary;
        private readonly UserManager<AppUser> _userManager;
        private readonly IClassifiedAdsRepository _classifiedAdsRepo;
        private readonly IWebHostEnvironment _environment;

        public PhotosController(UserManager<AppUser> userManager, IClassifiedAdsRepository classifiedAdsRepo, IMapper mapper,
            IOptions<CloudinarySettings> cloudinaryConfig, IWebHostEnvironment hostingEnvironment)
        {
            _environment = hostingEnvironment;
            _userManager = userManager;
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
        public async Task<IActionResult> GetPhoto(Guid id)
        {
            var photoFromRepo = await _classifiedAdsRepo.GetPhoto(id);

            var photo = _mapper.Map<PhotoForReturnDto>(photoFromRepo);

            return Ok(photo);
        }

        [HttpPost("{classifiedAdId}/{photoStatusApproved}/")]
        public async Task<IActionResult> AddPhoto(bool photoStatusApproved, string userId, Guid classifiedAdId,
            [FromForm]PhotoForCreationDto photoForCreationDto)
        {
            var user = await _userManager.Users.SingleOrDefaultAsync(x => x.Id == userId);

            if (user == null)
            {
                return Unauthorized();
            }

            var classifiedAdFromRepo = await _classifiedAdsRepo.GetClassifiedAdDetailAndPhotos(classifiedAdId);

            var file = photoForCreationDto.File;

            var uploadResult = new ImageUploadResult();

            if (file.Length > 0)
            {
                /*using (var stream = file.OpenReadStream())
                {*/
                //var filePath = Path.Combine(Directory.GetCurrentDirectory(), @"wwwroot\images", userId, classifiedAdId.ToString(), new Guid().ToString());
                //Getting FileName
                var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');

                //Assigning Unique Filename (Guid)
                var myUniqueFileName = Convert.ToString(Guid.NewGuid());

                //Getting file Extension
                var FileExtension = Path.GetExtension(fileName);

                // concating  FileName + FileExtension
                var newFileName = myUniqueFileName + FileExtension;

                // Combines two strings into a path.
                fileName = Path.Combine(_environment.WebRootPath, "images", userId, classifiedAdId.ToString()) + $@"\{newFileName}";

                // if you want to store path of folder in database
                var UrlWithoutHost = "images/" + userId + "/" + classifiedAdId.ToString() + "/" + newFileName;
                if (Directory.Exists(Path.Combine(_environment.WebRootPath, "images", userId, classifiedAdId.ToString())))
                {
                    Console.WriteLine("That path exists already.");
                   // return;
                }
                else
                {
                    DirectoryInfo directory = Directory.CreateDirectory(Path.Combine(_environment.WebRootPath, "images", userId, classifiedAdId.ToString()));
                }
                // Try to create the directory.
                
                using (FileStream fs = System.IO.File.Create(fileName))
                {
                    file.CopyTo(fs);
                    fs.Flush();
                }
                UriBuilder uriBuilder = new UriBuilder();
                uriBuilder.Scheme = Request.Scheme;
                uriBuilder.Host = Request.Host.Host;
                //uriBuilder.Path = Request.Path.ToString();
                //uriBuilder.Query = Request.QueryString.ToString();
                
                photoForCreationDto.Url = uriBuilder.Uri.ToString() + UrlWithoutHost;

                photoForCreationDto.PublicId = uriBuilder.Uri.ToString() + UrlWithoutHost;
                /*var uploadParams = new ImageUploadParams()
                {
                    File = new FileDescription(file.FileName, stream),
                    Transformation = new Transformation().Quality("auto").FetchFormat("auto").Width("auto").Dpr("auto").Crop("scale")
                };*/

                //uploadResult = _cloudinary.Upload(uploadParams);
                /*}*/
            }

            /*photoForCreationDto.Url = uploadResult.Url.ToString();
            photoForCreationDto.PublicId = uploadResult.PublicId;*/

            var photo = _mapper.Map<Photo>(photoForCreationDto);

            if (photoStatusApproved)
            {
                photo.Status = "Approved";
            }
            else if (!photoStatusApproved)
            {
                photo.Status = "Pending";
            }
            

            if (!classifiedAdFromRepo.Photos.Any(p => p.IsMain))
                photo.IsMain = true;

            classifiedAdFromRepo.Photos.Add(photo);

            if (await _classifiedAdsRepo.SaveAll())
            {
                var photoToReturn = _mapper.Map<PhotoForReturnDto>(photo);
                return CreatedAtRoute("GetPhoto", new { userId, id = photo.Id }, photoToReturn);
            }

            //return BadRequest("Could not add the photo");
            return BadRequest("Грешка при додавање на сликата");
        }

        [HttpPost("{classifiedAdId}/setMain/{photoId}")]
        public async Task<IActionResult> SetMainPhoto(string userId, Guid photoId, Guid classifiedAdId)
        {
            var user = await _userManager.Users.SingleOrDefaultAsync(x => x.Id == userId);

            if (user == null)
            {
                return Unauthorized();
            }

            var classfiedAdFromRepo = await _classifiedAdsRepo.GetClassifiedAdDetailAndPhotos(classifiedAdId);

            if (!classfiedAdFromRepo.Photos.Any(p => p.Id == photoId))
            {
                return Unauthorized();
            }

            var photoFromRepo = await _classifiedAdsRepo.GetPhoto(photoId);

            if (photoFromRepo.IsMain)
            {
                //return BadRequest("This is already main photo");
                return BadRequest("Сликата е веќе главна слика на огласот");
            }

            var currentMainPhoto = await _classifiedAdsRepo.GetMainPhotoForClassifiedAdForUserUpdate(classifiedAdId);

            currentMainPhoto.IsMain = false;
            photoFromRepo.IsMain = true;

            if (await _classifiedAdsRepo.SaveAll())
                return NoContent();

            //return BadRequest("Could not set the photo to main");
            return BadRequest("Грешка при поставување на сликата главна слика на огласот");
        }

        [HttpDelete("{classifiedAdId}/{photoId}")]
        public async Task<IActionResult> DeletePhoto(string userId, Guid classifiedAdId, Guid photoId)
        {
            var user = await _userManager.Users.SingleOrDefaultAsync(x => x.Id == userId);

            if (user == null)
            {
                return Unauthorized();
            }

            var classfiedAdFromRepo = await _classifiedAdsRepo.GetClassifiedAdDetailAndPhotos(classifiedAdId);

            if (!classfiedAdFromRepo.Photos.Any(p => p.Id == photoId))
            {
                return Unauthorized();
            }

            var photoFromRepo = await _classifiedAdsRepo.GetPhoto(photoId);

            if (photoFromRepo.IsMain)
            {
                //return BadRequest("You cannot delete main photo");
                return BadRequest("Не можете да ја бришете главната слика");
            }

            if (photoFromRepo.PublicId != null)
            {
                //var deleteParams = new DeletionParams(photoFromRepo.PublicId);

                //var result = _cloudinary.Destroy(deleteParams);

                //if (result.Result == "ok")
                //{
                    _classifiedAdsRepo.DeletePhoto(photoFromRepo);
                //}
            }

            if(photoFromRepo.PublicId == null)
            { 
                _classifiedAdsRepo.DeletePhoto(photoFromRepo);
            }

            if (await _classifiedAdsRepo.SaveAll())
            {
                return Ok();
            }

            //return BadRequest("Failed to delete the photo");
            return BadRequest("Грешка при бришење на сликата");
        }
    }
}