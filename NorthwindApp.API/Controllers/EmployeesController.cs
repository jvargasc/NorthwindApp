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
public class EmployeesController : ControllerBase
{

    private readonly IEmployeesRepository _employeesRepository;
    public EmployeesController(IEmployeesRepository employeesRepository)
    {
        _employeesRepository = employeesRepository;
    }

    [HttpGet("getemployees")]
    public async Task<ActionResult<List<Employee>>> GetEmployees()
    {
        var employees = await _employeesRepository.GetEmployees();
        if (employees == null) return NotFound();

        return Ok(employees);
    }

    [HttpGet("getemployee/{employeeId}")]
    public async Task<ActionResult<Employee>> GetEmployee(int employeeId)
    {
        var employee = await _employeesRepository.GetEmployee(employeeId);
        if (employee == null) return NotFound();

        return Ok(employee);
    }

    [HttpPost]
    public async Task<ActionResult<Employee>> CreateEmployee([FromBody] Employee employeeToCreate)
    {
        _employeesRepository.CreateEmployee(employeeToCreate);
        if (await _employeesRepository.SaveAllAsync()) return Ok(employeeToCreate);

        return BadRequest("Failed to save Employee");
    }

    [HttpPut]
    public async Task<ActionResult<Employee>> UpdateCustomer([FromBody] Employee employeeToUpdate)
    {
        _employeesRepository.UpdateEmployee(employeeToUpdate);
        if (await _employeesRepository.SaveAllAsync()) return Ok(employeeToUpdate);

        return BadRequest("Failed to update Employee");
    }
}
