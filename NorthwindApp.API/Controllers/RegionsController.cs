using Microsoft.AspNetCore.Mvc;
using NorthwindApp.Core.Models;
using NorthwindApp.Infrastructure.Repositories;

namespace NorthwindApp.API.Controllers;

public class RegionsController : BaseApiController
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

    [HttpPost]
    public async Task<ActionResult<Order>> CreateRegion([FromBody] Region regionToCreate)
    {
        _regionsRepository.CreateRegion(regionToCreate);
        if (await _regionsRepository.SaveAllAsync()) return Ok(regionToCreate);

        return BadRequest("Failed to save Region");
    }

    [HttpPut]
    public async Task<ActionResult<Order>> UpdateRegion([FromBody] Region regionToUpdate)
    {
        _regionsRepository.UpdateRegion(regionToUpdate);
        if (await _regionsRepository.SaveAllAsync()) return Ok(regionToUpdate);

        return BadRequest("Failed to update Region");
    }

}