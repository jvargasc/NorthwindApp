using AutoMapper;
using NorthwindApp.Core.Dtos;
using NorthwindApp.Core.Models;

namespace NorthwindApp.API.Helpers;

public class AutoMapperProfiles : Profile
{
    public AutoMapperProfiles()
    {
        CreateMap<Order, OrderDto>();
        CreateMap<AppUser, AppUserDto>();
    }
}