using Microsoft.EntityFrameworkCore;
using NorthwindApp.Core.Models;
using NorthwindApp.Infrastructure.Context;

namespace NorthwindApp.Infrastructure.Repositories;

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

    public void CreateSupplier(Supplier supplier)
    {
        _northwindContext.Suppliers.Add(supplier);
    }

    public void UpdateSupplier(Supplier supplier)
    {
        _northwindContext.Entry(supplier).State = EntityState.Modified;
    }

    public async Task<bool> SaveAllAsync()
    {
        return await _northwindContext.SaveChangesAsync() > 0;
    }
}