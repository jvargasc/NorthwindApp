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
    void CreateCategory(Category category);
    void UpdateCategory(Category category);
    Task<bool> SaveAllAsync();
}

public interface ICustomersRepository
{
    Task<List<Customer>> GetCustomers();
    Task<Customer> GetCustomer(string customerId);
    void CreateCustomer(Customer customer);
    void UpdateCustomer(Customer customer);
    Task<bool> SaveAllAsync();
}

public interface IEmployeesRepository
{
    Task<List<Employee>> GetEmployees();
    Task<Employee> GetEmployee(int employeeId);
    void CreateEmployee(Employee employee);
    void UpdateEmployee(Employee employee);
    Task<bool> SaveAllAsync();
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