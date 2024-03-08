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

    [HttpPost]
    public async Task<ActionResult<Supplier>> CreateSupplier([FromBody] Supplier supplierToCreate)
    {
        _suppliersRepository.CreateSupplier(supplierToCreate);
        if (await _suppliersRepository.SaveAllAsync()) return Ok(supplierToCreate);

        return BadRequest("Failed to save Region");
    }

    [HttpPut]
    public async Task<ActionResult<Supplier>> UpdateSupplier([FromBody] Supplier supplierToUpdate)
    {
        _suppliersRepository.UpdateSupplier(supplierToUpdate);
        if (await _suppliersRepository.SaveAllAsync()) return Ok(supplierToUpdate);

        return BadRequest("Failed to update Region");
    }

}
