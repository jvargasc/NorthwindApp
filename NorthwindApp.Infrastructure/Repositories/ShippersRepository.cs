using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using NorthwindApp.Core.Models;
using NorthwindApp.Infrastructure.Context;

namespace NorthwindApp.Infrastructure.Repositories;

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

    public void CreateShipper(Shipper shipper)
    {
        _northwindContext.Shippers.Add(shipper);
    }

    public void UpdateShipper(Shipper shipper)
    {
        _northwindContext.Entry(shipper).State = EntityState.Modified;
    }

    public async Task<bool> SaveAllAsync()
    {
        return await _northwindContext.SaveChangesAsync() > 0;
    }
}