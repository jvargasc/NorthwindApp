using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NorthwindApp.API.Extensions;
using NorthwindApp.Core.Models;
using NorthwindApp.Infrastructure.Helpers;
using NorthwindApp.Infrastructure.Repositories;

namespace NorthwindApp.API.Controllers;

[Authorize]
public class SuppliersController : BaseApiController
{
    private readonly ISuppliersRepository _suppliersRepository;
    public SuppliersController(ISuppliersRepository suppliersRepository)
    {
        _suppliersRepository = suppliersRepository;
    }

    [HttpGet("getsuppliers")]
    public async Task<ActionResult<List<Supplier>>> GetSuppliers([FromQuery] UserParams userParams)
    {
        var shippers = await _suppliersRepository.GetSuppliers(userParams);

        Response.AddPaginationHeader(new PaginationHeader(shippers.CurrentPage, shippers.PageSize, shippers.TotalCount, shippers.TotalPages));

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
