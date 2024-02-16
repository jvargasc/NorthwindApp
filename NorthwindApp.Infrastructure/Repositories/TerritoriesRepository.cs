using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using NorthwindApp.Core.Models;
using NorthwindApp.Infrastructure.Context;

namespace NorthwindApp.Infrastructure.Repositories;

public class TerritoriesRepository : ITerritoriesRepository
{
    private readonly NorthwindContext _northwindContext;
    public TerritoriesRepository(NorthwindContext northwindContext)
    {
        _northwindContext = northwindContext;
    }

    public async Task<List<Territory>> GetTerritories()
    {
        return await _northwindContext.Territories.ToListAsync();
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