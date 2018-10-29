using System.Linq;
using AutoMapper;
using FreeAds.API.Dtos;
using FreeAds.API.Models;

namespace FreeAds.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserForListDto>();
            CreateMap<ClassifiedAds, ClassifiedAdsDto>()
                .ForMember(dest => dest.PhotoUrl, opt => {
                    opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url);
                })
                .ForMember(dest => dest.Age, opt => {
                    opt.ResolveUsing(d => d.DateAdded.CalculateAge());
                });
            CreateMap<Photo, PhotoForDetailedDto>();
            CreateMap<ClassifiedAds, ClassifiedAdsForUserDto>()
                .ForMember(dest => dest.PhotoUrl, opt => {
                    opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url);
                })
                .ForMember(dest => dest.Age, opt => {
                    opt.ResolveUsing(d => d.DateAdded.CalculateAge());
                });
            CreateMap<ClassifiedAds, ClassifiedAdsForDetailedDto>();
            CreateMap<UserForUpdateDto, User>();
            CreateMap<ClassifiedAdsForUserUpdate, ClassifiedAds>();
            CreateMap<Photo, PhotoForReturnDto>();
            CreateMap<PhotoForCreationDto, Photo>();
            CreateMap<ClassifiedAdsForRegisterDto, ClassifiedAds>();
        }
    }
}