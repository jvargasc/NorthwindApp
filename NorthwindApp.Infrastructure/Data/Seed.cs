using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using NorthwindApp.Core.Models;
using NorthwindApp.Infrastructure.Context;

namespace NorthwindApp.Infrastructure.Data;

public static class Seed
{
    public static async Task SeedData(NorthwindContext dbContext)
    {
        if (await dbContext.Categories.AnyAsync()) return;

        var categoriesData = await File.ReadAllTextAsync("Data/CategorySeedData.json");

        var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };

        var categories = JsonSerializer.Deserialize<List<Category>>(categoriesData, options);

        foreach (var category in categories)
        {
            await dbContext.Categories.AddAsync(category);
        }

    }
}
