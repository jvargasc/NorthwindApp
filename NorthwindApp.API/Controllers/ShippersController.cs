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

}
