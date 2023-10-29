using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using NorthwindApp.Core.Models;
using NorthwindApp.Infrastructure.Context;

namespace NorthwindApp.Infrastructure.Repositories
{
    public class CustomersRepository : ICustomersRepository
    {
        private readonly NorthwindContext _northwindContext;
        public CustomersRepository(NorthwindContext northwindContext)
        {
            _northwindContext = northwindContext;
        }

        public async Task<List<Customer>> GetCustomers()
        {
            return await _northwindContext.Customers.ToListAsync();
        }

        public async Task<Customer> GetCustomer(string customerId)
        {
            return await _northwindContext.Customers
                    .Where(c => c.CustomerId == customerId).FirstOrDefaultAsync();
        }
    }
}