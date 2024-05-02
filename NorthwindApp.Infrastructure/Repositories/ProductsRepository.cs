using Microsoft.EntityFrameworkCore;
using NorthwindApp.Core.Models;
using NorthwindApp.Infrastructure.Context;
using NorthwindApp.Infrastructure.Helpers;

namespace NorthwindApp.Infrastructure.Repositories;

public class ProductsRepository : IProductsRepository
{
    private readonly NorthwindContext _northwindContext;
    public ProductsRepository(NorthwindContext northwindContext)
    {
        _northwindContext = northwindContext;
    }

    public async Task<PagedList<Product>> GetProducts(UserParams userParams)
    {
        var query = _northwindContext.Products.AsNoTracking();

        return await PagedList<Product>.CreateAsync(query, userParams.PageNumber, userParams.PageSize);
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
