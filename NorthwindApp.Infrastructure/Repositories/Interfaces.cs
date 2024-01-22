using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using NorthwindApp.Core.Models;

namespace NorthwindApp.Infrastructure.Repositories;

public interface ICategoriesRepository
{
    Task<List<Category>> GetCategories();
    Task<Category> GetCategory(int categoryId);
}

public interface ICustomersRepository
{
    Task<List<Customer>> GetCustomers();
    Task<Customer> GetCustomer(string customerId);

}

public interface IEmployeesRepository
{
    Task<List<Employee>> GetEmployees();
    Task<Employee> GetEmployee(int employeeId);
}

public interface IOrdersRepository
{
    Task<List<Order>> GetOrders();
    Task<Order> GetOrder(int orderId);
}

public interface IProductsRepository
{
    Task<List<Product>> GetProducts();
    Task<Product> GetProduct(int ProductId);
}

public interface IRegionsRepository
{
    Task<List<Region>> GetRegions();
    Task<Region> GetRegion(int RegionId);
}

public interface IShippersRepository
{
    Task<List<Shipper>> GetShippers();
    Task<Shipper> GetShipper(int shipperId);
}

public interface ISuppliersRepository
{
    Task<List<Supplier>> GetSuppliers();
    Task<Supplier> GetSupplier(int SupplierId);
}

public interface ITerritoriesRepository
{
    Task<List<Territory>> GetTerritories();
    Task<Territory> GetTerritory(string TerritoryId);
}