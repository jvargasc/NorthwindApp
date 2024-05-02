using Microsoft.EntityFrameworkCore;
using NorthwindApp.Core.Models;
using NorthwindApp.Infrastructure.Context;
using NorthwindApp.Infrastructure.Helpers;

namespace NorthwindApp.Infrastructure.Repositories;

public class SuppliersRepository : ISuppliersRepository
{
    private readonly NorthwindContext _northwindContext;
    public SuppliersRepository(NorthwindContext northwindContext)
    {
        _northwindContext = northwindContext;
    }

    public async Task<PagedList<Supplier>> GetSuppliers(UserParams userParams)
    {
        var query = _northwindContext.Suppliers.AsNoTracking();

        return await PagedList<Supplier>.CreateAsync(query, userParams.PageNumber, userParams.PageSize);
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