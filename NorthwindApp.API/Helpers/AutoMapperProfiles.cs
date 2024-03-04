using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using NorthwindApp.Core.Dtos;
using NorthwindApp.Core.Models;

namespace NorthwindApp.API.Helpers;

public class AutoMapperProfiles : Profile
{
    public AutoMapperProfiles()
    {
        CreateMap<Order, OrderDto>();
    }
}