using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using NorthwindApp.Core.Models;
using NorthwindApp.Infrastructure.Context;

namespace NorthwindApp.Infrastructure.Repositories
{
    public class OrdersRepository : IOrdersRepository
    {
        private readonly NorthwindContext _northwindContext;
        public OrdersRepository(NorthwindContext northwindContext)
        {
            _northwindContext = northwindContext;
        }

        public async Task<List<Order>> GetOrders()
        {
            return await _northwindContext.Orders.ToListAsync();
        }

        public async Task<Order> GetOrder(int orderId)
        {
            return await _northwindContext.Orders
                    .Where(c => c.OrderId == orderId).FirstOrDefaultAsync();
        }
    }
}