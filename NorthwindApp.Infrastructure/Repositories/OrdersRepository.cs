using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using NorthwindApp.Core.Models;
using NorthwindApp.Infrastructure.Context;
using NorthwindApp.Infrastructure.Helpers;

namespace NorthwindApp.Infrastructure.Repositories;

public class OrdersRepository : IOrdersRepository
{
    private readonly NorthwindContext _northwindContext;
    private readonly IMapper _mapper;

    public OrdersRepository(NorthwindContext northwindContext, IMapper mapper)
    {
        _northwindContext = northwindContext;
        _mapper = mapper;
    }

    public async Task<PagedList<Order>> GetOrders(UserParams userParams)
    {
        var query = _northwindContext.Orders.AsNoTracking();

        return await PagedList<Order>.CreateAsync(query, userParams.PageNumber, userParams.PageSize);
    }

    public async Task<Order> GetOrder(int orderId)
    {
        return await _northwindContext.Orders
                .Include(od => od.Order_Details)
                .Where(c => c.OrderId == orderId).FirstOrDefaultAsync();
    }

    public async Task<OrderDetail> GetOrderDetail(int orderId, int orderDetailId)
    {
        return await _northwindContext.Order_Details
                .Where(c => c.OrderId == orderId && c.OrderDetailID == orderDetailId).FirstOrDefaultAsync();
    }

    public async Task<List<OrderDetail>> GetOrderDetails(int orderId)
    {
        return await _northwindContext.Order_Details
                .Where(c => c.OrderId == orderId).ToListAsync();
    }

    public void CreateOrder(Order order)
    {
        _northwindContext.Orders.Add(order);
    }

    public void CreateOrderDetails(List<OrderDetail> orderDetails)
    {
        _northwindContext.Order_Details.AddRange(orderDetails);
    }

    public async void UpdateOrder(Order order)
    {
        _northwindContext.Entry(order).State = EntityState.Modified;
    }

    public async void UpdateOrderDetails(List<OrderDetail> orderDetails)
    {
        foreach (OrderDetail detailItem in orderDetails)
        {
            _northwindContext.Entry(detailItem).State = EntityState.Modified;
        }
    }

    public async void DeleteOrderDetails(List<OrderDetail> orderDetails)
    {
        _northwindContext.RemoveRange(orderDetails);
    }

    public async Task<bool> SaveAllAsync()
    {
        return await _northwindContext.SaveChangesAsync() > 0;
    }

}
