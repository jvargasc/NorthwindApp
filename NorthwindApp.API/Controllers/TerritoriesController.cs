using Microsoft.AspNetCore.Mvc;
using NorthwindApp.API.Extensions;
using NorthwindApp.Core.Models;
using NorthwindApp.Infrastructure.Helpers;
using NorthwindApp.Infrastructure.Repositories;

namespace NorthwindApp.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TerritoriesController : ControllerBase
{
    private readonly ITerritoriesRepository _territoriesRepository;
    public TerritoriesController(ITerritoriesRepository territoriesRepository)
    {
        _territoriesRepository = territoriesRepository;
    }

    [HttpGet("getterritories")]
    public async Task<ActionResult<List<Territory>>> GetTerritories([FromQuery] UserParams userParams)
    {

        var territories = await _territoriesRepository.GetTerritories(userParams);

        Response.AddPaginationHeader(new PaginationHeader(territories.CurrentPage, territories.PageSize, territories.TotalCount, territories.TotalPages));

        return Ok(territories);
    }

    [HttpGet("getterritory/{territoryId}")]
    public async Task<ActionResult<Territory>> GetTerritory(int territoryId)
    {
        var territory = await _territoriesRepository.GetTerritory(territoryId);
        if (territory == null) return NotFound();

        return Ok(territory);
    }

    [HttpPost]
    public async Task<ActionResult<Territory>> CreateTerritory([FromBody] Territory shipperToCreate)
    {
        _territoriesRepository.CreateTerritory(shipperToCreate);
        if (await _territoriesRepository.SaveAllAsync()) return Ok(shipperToCreate);

        return BadRequest("Failed to save Region");
    }

    [HttpPut]
    public async Task<ActionResult<Territory>> UpdateTerritory([FromBody] Territory regionToUpdate)
    {
        _territoriesRepository.UpdateTerritory(regionToUpdate);
        if (await _territoriesRepository.SaveAllAsync()) return Ok(regionToUpdate);

        return BadRequest("Failed to update Region");
    }

}
