using Microsoft.EntityFrameworkCore;
using NorthwindApp.Core.Models;
using NorthwindApp.Infrastructure.Context;
using NorthwindApp.Infrastructure.Helpers;

namespace NorthwindApp.Infrastructure.Repositories;

public class CustomersRepository : ICustomersRepository
{
    private readonly NorthwindContext _northwindContext;
    public CustomersRepository(NorthwindContext northwindContext)
    {
        _northwindContext = northwindContext;
    }

    public async Task<PagedList<Customer>> GetCustomers(UserParams userParams)
    {
        var query = _northwindContext.Customers.AsNoTracking();

        return await PagedList<Customer>.CreateAsync(query, userParams.PageNumber, userParams.PageSize);
    }

    public async Task<Customer> GetCustomer(int customerId)
    {
        return await _northwindContext.Customers
                .Where(c => c.CustomerId == customerId).FirstOrDefaultAsync();
    }

    public void CreateCustomer(Customer customer)
    {
        _northwindContext.Customers.Add(customer);
    }

    public void UpdateCustomer(Customer customer)
    {
        _northwindContext.Entry(customer).State = EntityState.Modified;
    }

    public async Task<bool> SaveAllAsync()
    {
        return await _northwindContext.SaveChangesAsync() > 0;
    }
}
