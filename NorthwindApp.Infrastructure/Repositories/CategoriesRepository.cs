using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using NorthwindApp.Core.Models;
using NorthwindApp.Infrastructure.Context;

namespace NorthwindApp.Infrastructure.Repositories
{
    public class CategoriesRepository : ICategoriesRepository
    {
        private readonly NorthwindContext _northwindContext;
        public CategoriesRepository(NorthwindContext northwindContext)
        {
            _northwindContext = northwindContext;
        }

        public async Task<List<Category>> GetCategories()
        {
            return await _northwindContext.Categories.ToListAsync();
        }

        public async Task<Category> GetCategory(int categoryId)
        {
            return await _northwindContext.Categories
                    .Where(c => c.CategoryId == categoryId).FirstOrDefaultAsync();
        }
    }
}