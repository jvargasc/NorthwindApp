using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using NorthwindApp.Core.Models;

namespace NorthwindApp.Infrastructure.Repositories
{
    public interface ICustomersRepository
    {
        Task<List<Customer>> GetCustomers();
        Task<Customer> GetCustomer(string customerId);
    }
}