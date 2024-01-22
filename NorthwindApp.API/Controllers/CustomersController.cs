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
public class CustomersController : ControllerBase
{
    private readonly ICustomersRepository _customersRepository;

    public CustomersController(ICustomersRepository customersRepository)
    {
        _customersRepository = customersRepository;
    }

    [HttpGet("getcustomers")]
    public async Task<ActionResult<List<Customer>>> GetCustomers()
    {
        var customers = await _customersRepository.GetCustomers();
        return Ok(customers);
    }

    [HttpGet("getcustomer/{customerId}")]
    public async Task<ActionResult<Customer>> GetCustomer(string customerId)
    {
        var customer = await _customersRepository.GetCustomer(customerId);
        if (customer == null) return NotFound();

        return Ok(customer);
    }

}
