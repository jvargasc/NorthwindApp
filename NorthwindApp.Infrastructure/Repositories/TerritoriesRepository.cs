using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using NorthwindApp.Core.Models;
using NorthwindApp.Infrastructure.Context;

namespace NorthwindApp.Infrastructure.Repositories
{
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

        public async Task<Territory> GetTerritory(string territoryId)
        {
            return await _northwindContext.Territories
                    .Where(t => t.TerritoryId == territoryId).FirstOrDefaultAsync();
        }
    }
}