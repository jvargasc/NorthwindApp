using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using NorthwindApp.Core.Models;

namespace NorthwindApp.Infrastructure.Repositories;

public interface ICustomersRepository
{
    Task<List<Customer>> GetCustomers();
    Task<Customer> GetCustomer(string customerId);

}

public interface IShippersRepository
{
    Task<List<Shipper>> GetShippers();
    Task<Shipper> GetShipper(int shipperId);
}

public interface IRegionsRepository
{
    Task<List<Region>> GetRegions();
    Task<Region> GetRegion(int RegionId);
}