using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using NorthwindApp.Core.Models;
using NorthwindApp.Infrastructure.Context;

namespace NorthwindApp.Infrastructure.Repositories
{
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
    }
}