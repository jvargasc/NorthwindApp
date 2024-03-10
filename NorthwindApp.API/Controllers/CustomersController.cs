using Microsoft.AspNetCore.Mvc;
using NorthwindApp.API.Extensions;
using NorthwindApp.Core.Models;
using NorthwindApp.Infrastructure.Helpers;
using NorthwindApp.Infrastructure.Repositories;

namespace NorthwindApp.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CustomersController : ControllerBase
{
    private readonly ICustomersRepository _customersRepository;

    public CustomersController(ICustomersRepository customersRepository)
    {
        _customersRepository = customersRepository;
    }

    [HttpGet("getcustomers")]
    public async Task<ActionResult<PagedList<Customer>>> GetCustomers([FromQuery] UserParams userParams)
    {
        var orders = await _customersRepository.GetCustomers(userParams);

        Response.AddPaginationHeader(new PaginationHeader(orders.CurrentPage, orders.PageSize, orders.TotalCount, orders.TotalPages));

        return Ok(orders);
    }

    [HttpGet("getcustomer/{customerId}")]
    public async Task<ActionResult<Customer>> GetCustomer(int customerId)
    {
        var customer = await _customersRepository.GetCustomer(customerId);
        if (customer == null) return NotFound();

        return Ok(customer);
    }

    [HttpPost]
    public async Task<ActionResult<Customer>> CreateCustomer([FromBody] Customer customerToCreate)
    {
        int val1 = 1;
        int val2 = 0;
        int val = val1 / val2;

        _customersRepository.CreateCustomer(customerToCreate);
        if (await _customersRepository.SaveAllAsync()) return Ok(customerToCreate);

        return BadRequest("Failed to save Customer");
    }

    [HttpPut]
    public async Task<ActionResult<Customer>> UpdateCustomer([FromBody] Customer customerToUpdate)
    {
        _customersRepository.UpdateCustomer(customerToUpdate);
        if (await _customersRepository.SaveAllAsync()) return Ok(customerToUpdate);

        return BadRequest("Failed to update Customer");
    }
}
