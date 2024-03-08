using Microsoft.EntityFrameworkCore;
using NorthwindApp.Core.Models;
using NorthwindApp.Infrastructure.Context;

namespace NorthwindApp.Infrastructure.Repositories;

public class ProductsRepository : IProductsRepository
{
    private readonly NorthwindContext _northwindContext;
    public ProductsRepository(NorthwindContext northwindContext)
    {
        _northwindContext = northwindContext;
    }

    public async Task<List<Product>> GetProducts()
    {
        return await _northwindContext.Products.ToListAsync();
    }

    public async Task<Product> GetProduct(int productid)
    {
        return await _northwindContext.Products
                .Where(c => c.ProductId == productid).FirstOrDefaultAsync();
    }

    public void CreateProduct(Product product)
    {
        _northwindContext.Products.Add(product);
    }

    public void UpdateProduct(Product product)
    {
        _northwindContext.Entry(product).State = EntityState.Modified;
    }

    public async Task<bool> SaveAllAsync()
    {
        return await _northwindContext.SaveChangesAsync() > 0;
    }
}
