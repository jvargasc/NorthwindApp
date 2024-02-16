using System;
using System.Collections.Generic;

namespace NorthwindApp.Infrastructure.Models;

public partial class Territory
{
    public int TerritoryId { get; set; }

    public string TerritoryDescription { get; set; } = null!;

    public int RegionId { get; set; }
}
