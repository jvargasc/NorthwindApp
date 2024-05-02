using Microsoft.EntityFrameworkCore;
using NorthwindApp.Core.Models;
using NorthwindApp.Infrastructure.Context;
using NorthwindApp.Infrastructure.Helpers;

namespace NorthwindApp.Infrastructure.Repositories;

public class TerritoriesRepository : ITerritoriesRepository
{
    private readonly NorthwindContext _northwindContext;
    public TerritoriesRepository(NorthwindContext northwindContext)
    {
        _northwindContext = northwindContext;
    }

    public async Task<PagedList<Territory>> GetTerritories(UserParams userParams)
    {
        var query = _northwindContext.Territories.AsNoTracking();

        return await PagedList<Territory>.CreateAsync(query, userParams.PageNumber, userParams.PageSize);
    }

    public async Task<Territory> GetTerritory(int territoryId)
    {
        return await _northwindContext.Territories
                .Where(t => t.TerritoryId == territoryId).FirstOrDefaultAsync();
    }

    public void CreateTerritory(Territory territory)
    {
        _northwindContext.Territories.Add(territory);
    }

    public void UpdateTerritory(Territory territory)
    {
        _northwindContext.Entry(territory).State = EntityState.Modified;
    }

    public async Task<bool> SaveAllAsync()
    {
        return await _northwindContext.SaveChangesAsync() > 0;
    }
}