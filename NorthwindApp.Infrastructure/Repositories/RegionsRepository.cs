using Microsoft.EntityFrameworkCore;
using NorthwindApp.Core.Models;
using NorthwindApp.Infrastructure.Context;

namespace NorthwindApp.Infrastructure.Repositories;
public class RegionsRepository : IRegionsRepository
{
    private readonly NorthwindContext _northwindContext;
    public RegionsRepository(NorthwindContext northwindContext)
    {
        _northwindContext = northwindContext;
    }

    public async Task<Region> GetRegion(int regionId)
    {
        return await _northwindContext.Regions.
                    Where(R => R.RegionId == regionId).FirstOrDefaultAsync();
    }

    public async Task<List<Region>> GetRegions()
    {
        return await _northwindContext.Regions.ToListAsync();
    }

    public void CreateRegion(Region region)
    {
        _northwindContext.Regions.Add(region);
    }

    public void UpdateRegion(Region region)
    {
        _northwindContext.Entry(region).State = EntityState.Modified;
    }

    public async Task<bool> SaveAllAsync()
    {
        return await _northwindContext.SaveChangesAsync() > 0;
    }
}
