using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using NorthwindApp.Core.Models;
using NorthwindApp.Infrastructure.Context;

namespace NorthwindApp.Infrastructure.Repositories;

public class OrdersRepository : IOrdersRepository
{
    private readonly NorthwindContext _northwindContext;
    public OrdersRepository(NorthwindContext northwindContext)
    {
        _northwindContext = northwindContext;
    }

    public async Task<List<Order>> GetOrders()
    {
        return await _northwindContext.Orders
        .Include(od => od.Order_Details)
        .ToListAsync();
    }

    public async Task<Order> GetOrder(int orderId)
    {
        return await _northwindContext.Orders
                .Include(od => od.Order_Details)
                .Where(c => c.OrderId == orderId).FirstOrDefaultAsync();
    }

    public void CreateOrder(Order order)
    {
        _northwindContext.Orders.Add(order);
    }

    public void UpdateOrder(Order order)
    {
        // _northwindContext.Entry(order).State = EntityState.Modified;
        Order orderToRemove = order;

        _northwindContext.Orders.Remove(orderToRemove);
        _northwindContext.Orders.Add(order);
    }

    public async void DeleteOrder(int orderId)
    {
        Task<Order> order = GetOrder(orderId);
        Order orderToRemove = new Order(); // =  ;

        if (orderToRemove != null)
            _northwindContext.Orders.Remove(orderToRemove);
    }

    public async Task<bool> SaveAllAsync()
    {
        return await _northwindContext.SaveChangesAsync() > 0;
    }
}
