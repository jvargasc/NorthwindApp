using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using NorthwindApp.Core.Models;
using NorthwindApp.Infrastructure.Context;

namespace NorthwindApp.Infrastructure.Repositories
{
    public class ShippersRepository : IShippersRepository
    {
        private readonly NorthwindContext _northwindContext;
        public ShippersRepository(NorthwindContext northwindContext)
        {
            _northwindContext = northwindContext;
        }

        public async Task<List<Shipper>> GetShippers()
        {
            return await _northwindContext.Shippers.ToListAsync();
        }

        public async Task<Shipper> GetShipper(int shipperId)
        {
            return await _northwindContext.Shippers
                    .Where(s => s.ShipperId == shipperId).FirstOrDefaultAsync();
        }
    }
}