using Microsoft.AspNetCore.Mvc;
using NorthwindApp.Core.Models;
using NorthwindApp.Infrastructure.Repositories;
using AutoMapper;

namespace NorthwindApp.API.Controllers;
[ApiController]
[Route("api/[controller]")]
public class OrdersController : ControllerBase
{
    private readonly IOrdersRepository _ordersRepository;
    private readonly IMapper _mapper;

    public OrdersController(IOrdersRepository ordersRepository, IMapper mapper)
    {
        _ordersRepository = ordersRepository;
        _mapper = mapper;
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

    [HttpPost]
    public async Task<ActionResult<Order>> CreateOrder([FromBody] Order orderToCreate)
    {
        _ordersRepository.CreateOrder(orderToCreate);
        if (await _ordersRepository.SaveAllAsync()) return Ok(orderToCreate);

        return BadRequest("Failed to save Order");
    }

    [HttpPut]
    public async Task<ActionResult<Order>> UpdateOrder([FromBody] Order orderToUpdate)
    {

        List<OrderDetail> orderDetailDtoToCreate = orderToUpdate.Order_Details.Where(od => od.OrderDetailID == 0).ToList();

        foreach (OrderDetail item in orderDetailDtoToCreate)
            orderToUpdate.Order_Details.Remove(item);

        int orderId = orderToUpdate.OrderId;

        List<OrderDetail> orderDetailsToUpdate = orderToUpdate.Order_Details.ToList();
        List<OrderDetail> orderDetailsExisting = await _ordersRepository.GetOrderDetails(orderId);
        List<OrderDetail> orderDetailsToExclude = orderDetailsExisting.Except(orderDetailsToUpdate).ToList();

        if (orderDetailsToExclude.Count > 0)
            _ordersRepository.DeleteOrderDetails(orderDetailsToExclude);

        // if (orderDetailsToExclude.Count > 0)
        //     await _ordersRepository.SaveAllAsync();

        _ordersRepository.UpdateOrder(orderToUpdate);
        _ordersRepository.UpdateOrderDetails(orderDetailsToUpdate);

        if (orderDetailDtoToCreate.Count > 0)
            _ordersRepository.CreateOrderDetails(orderDetailDtoToCreate);

        if (await _ordersRepository.SaveAllAsync())
        {
            Order orderUpdated = await _ordersRepository.GetOrder(orderId);
            if (orderUpdated != null)
                return Ok(orderUpdated);
        }

        return BadRequest("Failed to update Order");
    }
}