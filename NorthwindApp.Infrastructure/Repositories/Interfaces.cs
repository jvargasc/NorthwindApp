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
    Task<List<Order>> GetOrders();
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
    Task<List<Product>> GetProducts();
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
    Task<List<Supplier>> GetSuppliers();
    Task<Supplier> GetSupplier(int SupplierId);
    void CreateSupplier(Supplier supplier);
    void UpdateSupplier(Supplier supplier);
    Task<bool> SaveAllAsync();
}

public interface ITerritoriesRepository
{
    Task<List<Territory>> GetTerritories();
    Task<Territory> GetTerritory(int TerritoryId);
    void CreateTerritory(Territory territory);
    void UpdateTerritory(Territory territory);
    Task<bool> SaveAllAsync();
}