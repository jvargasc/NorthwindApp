using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using NorthwindApp.Core.Models;
using NorthwindApp.Infrastructure.Context;
using NorthwindApp.Infrastructure.Repositories;


public class EmployeesRepository : IEmployeesRepository
{
    private readonly NorthwindContext _northwindContext;
    public EmployeesRepository(NorthwindContext northwindContext)
    {
        _northwindContext = northwindContext;
    }

    public async Task<Employee> GetEmployee(int employeeId)
    {
        return await _northwindContext.Employees
        .Where(e => e.EmployeeId == employeeId).FirstOrDefaultAsync();
    }

    public async Task<List<Employee>> GetEmployees()
    {
        return await _northwindContext.Employees.ToListAsync();
    }
}
