using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using NorthwindApp.Core.Models;
using NorthwindApp.Infrastructure.Repositories;

namespace NorthwindApp.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrdersController : ControllerBase
    {
        private readonly IOrdersRepository _ordersRepository;
        public OrdersController(IOrdersRepository ordersRepository)
        {
            _ordersRepository = ordersRepository;
        }

        [HttpGet("getorders")]
        public async Task<ActionResult<List<Order>>> GetOrders()
        {
            var orders = await _ordersRepository.GetOrders();
            return Ok(orders);
        }

        [HttpGet("getorder/{orderId}")]
        public async Task<ActionResult<Order>> GetOrder(int orderId)
        {
            var order = await _ordersRepository.GetOrder(orderId);
            if (order == null) return NotFound();

            return Ok(order);
        }

    }
}