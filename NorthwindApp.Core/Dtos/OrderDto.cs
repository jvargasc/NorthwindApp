﻿namespace NorthwindApp.Core.Dtos;

public partial class OrderDto
{
    public int OrderId { get; set; }

    public int CustomerId { get; set; }

    public int? EmployeeId { get; set; }

    public DateTime? OrderDate { get; set; }

    public DateTime? RequiredDate { get; set; }

    public DateTime? ShippedDate { get; set; }

    public int? ShipperId { get; set; }

    public decimal? Freight { get; set; }

    public string? ShipName { get; set; }

    public string? ShipAddress { get; set; }

    public string? ShipCity { get; set; }

    // public int? RegionId { get; set; }
    public string? ShipRegion { get; set; }

    public string? ShipPostalCode { get; set; }

    public string? ShipCountry { get; set; }

    public virtual ICollection<OrderDetailDto> Order_Details { get; set; } = new List<OrderDetailDto>();
}
