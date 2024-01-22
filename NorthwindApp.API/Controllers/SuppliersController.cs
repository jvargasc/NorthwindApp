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
public class SuppliersController : ControllerBase
{
    private readonly ISuppliersRepository _suppliersRepository;
    public SuppliersController(ISuppliersRepository suppliersRepository)
    {
        _suppliersRepository = suppliersRepository;
    }

    [HttpGet("getsuppliers")]
    public async Task<ActionResult<List<Supplier>>> GetSuppliers()
    {
        var shippers = await _suppliersRepository.GetSuppliers();
        return Ok(shippers);
    }

    [HttpGet("getsupplier/{supplierId}")]
    public async Task<ActionResult<Supplier>> GetSupplier(int supplierId)
    {
        var shipper = await _suppliersRepository.GetSupplier(supplierId);
        if (shipper == null) return NotFound();

        return Ok(shipper);
    }

}
