using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using NorthwindApp.Core.Dtos;
using NorthwindApp.Core.Models;
using NorthwindApp.Infrastructure.Context;

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
        /*
                List<OrderDetail> orderDetailToUpdate = order.Order_Details.Where(o => o.OrderDetailID == null).ToList();
        if (orderDetailToUpdate.Count > 0)
        {
            List<OrderDetailDto> OrderDetailToInsert = new List<OrderDetailDto>();
            _mapper.Map(orderDetailToUpdate, OrderDetailToInsert);
            CreateOrderDetails(orderDetailToUpdate);
        }
        else
                // _northwindContext.Entry(order).State = EntityState.Modified;
                Order orderToRemove = order;

                try
                {
                    _northwindContext.Orders.Remove(orderToRemove);
                    _northwindContext.Orders.Add(order);
                }
                catch (System.Exception ex)
                {
                    // TODO
                    Console.WriteLine(ex.Message);
                }
        */
    }

    public async void UpdateOrderDetails(List<OrderDetail> orderDetails)
    {
        //https://stackoverflow.com/questions/21592596/update-multiple-rows-in-entity-framework-from-a-list-of-ids
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
