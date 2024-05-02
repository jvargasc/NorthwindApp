using Azure;
using NorthwindApp.Core.Models;
using NorthwindApp.Infrastructure.Helpers;

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
    Task<PagedList<Customer>> GetCustomers(UserParams userParams);
    Task<Customer> GetCustomer(int customerId);
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
    Task<PagedList<Order>> GetOrders(UserParams userParams);
    Task<Order> GetOrder(int orderId);
    Task<List<OrderDetail>> GetOrderDetails(int orderId);
    void CreateOrder(Order order);
    void CreateOrderDetails(List<OrderDetail> orderDetails);
    void UpdateOrder(Order order);
    void UpdateOrderDetails(List<OrderDetail> orderDetails);
    void DeleteOrderDetails(List<OrderDetail> orderDetails);
    Task<bool> SaveAllAsync();
}

public interface IProductsRepository
{
    Task<PagedList<Product>> GetProducts(UserParams userParams);
    Task<Product> GetProduct(int ProductId);
    void CreateProduct(Product product);
    void UpdateProduct(Product product);
    Task<bool> SaveAllAsync();
}

public interface IRegionsRepository
{
    Task<List<Region>> GetRegions();
    Task<Region> GetRegion(int RegionId);
    void CreateRegion(Region region);
    void UpdateRegion(Region region);
    Task<bool> SaveAllAsync();
}

public interface IShippersRepository
{
    Task<List<Shipper>> GetShippers();
    Task<Shipper> GetShipper(int shipperId);
    void CreateShipper(Shipper shipper);
    void UpdateShipper(Shipper shipper);
    Task<bool> SaveAllAsync();
}

public interface ISuppliersRepository
{
    Task<PagedList<Supplier>> GetSuppliers(UserParams userParams);
    Task<Supplier> GetSupplier(int SupplierId);
    void CreateSupplier(Supplier supplier);
    void UpdateSupplier(Supplier supplier);
    Task<bool> SaveAllAsync();
}

public interface ITerritoriesRepository
{
    Task<PagedList<Territory>> GetTerritories(UserParams userParams);
    Task<Territory> GetTerritory(int TerritoryId);
    void CreateTerritory(Territory territory);
    void UpdateTerritory(Territory territory);
    Task<bool> SaveAllAsync();
}

public interface IUsersRepository
{
    Task<List<AppUser>> GetUsers();
    Task<AppUser> GetUser(string username);
    void CreateUser(AppUser user);
    void UpdateUser(AppUser user);
    Task<bool> SaveAllAsync();
    Task<bool> UserExists(string username);
}