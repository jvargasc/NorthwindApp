using Microsoft.AspNetCore.Mvc;
using NorthwindApp.Core.Models;
using NorthwindApp.Infrastructure.Repositories;

namespace NorthwindApp.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ShippersController : ControllerBase
{
    private readonly IShippersRepository _shippersRepository;
    public ShippersController(IShippersRepository shippersRepository)
    {
        _shippersRepository = shippersRepository;
    }

    [HttpGet("getshippers")]
    public async Task<ActionResult<List<Shipper>>> GetShippers()
    {
        var shippers = await _shippersRepository.GetShippers();
        return Ok(shippers);
    }

    [HttpGet("getshipper/{shipperId}")]
    public async Task<ActionResult<Shipper>> GetShipper(int shipperId)
    {
        var shipper = await _shippersRepository.GetShipper(shipperId);
        if (shipper == null) return NotFound();

        return Ok(shipper);
    }

    [HttpPost]
    public async Task<ActionResult<Shipper>> CreateRegion([FromBody] Shipper shipperToCreate)
    {
        _shippersRepository.CreateShipper(shipperToCreate);
        if (await _shippersRepository.SaveAllAsync()) return Ok(shipperToCreate);

        return BadRequest("Failed to save Region");
    }

    [HttpPut]
    public async Task<ActionResult<Shipper>> UpdateRegion([FromBody] Shipper regionToUpdate)
    {
        _shippersRepository.UpdateShipper(regionToUpdate);
        if (await _shippersRepository.SaveAllAsync()) return Ok(regionToUpdate);

        return BadRequest("Failed to update Region");
    }

}
