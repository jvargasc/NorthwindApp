using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using NorthwindApp.Core.Models;
using NorthwindApp.Infrastructure.Repositories;

namespace NorthwindApp.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RegionsController : ControllerBase
    {
        private readonly IRegionsRepository _regionsRepository;
        public RegionsController(IRegionsRepository regionsRepository)
        {
            _regionsRepository = regionsRepository;
        }

        [HttpGet("getregions")]
        public async Task<ActionResult<List<Region>>> GetRegions()
        {
            var shippers = await _regionsRepository.GetRegions();
            return Ok(shippers);
        }

        [HttpGet("getregion/{regionId}")]
        public async Task<ActionResult<Region>> GetRegion(int regionId)
        {
            var region = await _regionsRepository.GetRegion(regionId);
            if (region == null) return NotFound();

            return Ok(region);
        }

    }
}