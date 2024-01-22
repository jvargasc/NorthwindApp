using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using NorthwindApp.Core.Models;
using NorthwindApp.Infrastructure.Context;

namespace NorthwindApp.Infrastructure.Repositories
{
    public class SuppliersRepository : ISuppliersRepository
    {
        private readonly NorthwindContext _northwindContext;
        public SuppliersRepository(NorthwindContext northwindContext)
        {
            _northwindContext = northwindContext;
        }

        public async Task<List<Supplier>> GetSuppliers()
        {
            return await _northwindContext.Suppliers.ToListAsync();
        }

        public async Task<Supplier> GetSupplier(int supplierid)
        {
            return await _northwindContext.Suppliers
                    .Where(s => s.SupplierId == supplierid).FirstOrDefaultAsync();
        }
    }
}