using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using NorthwindApp.Core.Models;
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
    public async Task<ActionResult<List<Territory>>> GetTerritories()
    {
        var territories = await _territoriesRepository.GetTerritories();
        return Ok(territories);
    }

    [HttpGet("getterritory/{territoryId}")]
    public async Task<ActionResult<Territory>> GetTerritory(string territoryId)
    {
        var territory = await _territoriesRepository.GetTerritory(territoryId);
        if (territory == null) return NotFound();

        return Ok(territory);
    }

}
