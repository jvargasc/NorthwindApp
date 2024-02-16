using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using NorthwindApp.Core.Models;
using NorthwindApp.Infrastructure.Repositories;

namespace NorthwindApp.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly IProductsRepository _productsRepository;
    public ProductsController(IProductsRepository productsRepository)
    {
        _productsRepository = productsRepository;
    }

    [HttpGet("getproducts")]
    public async Task<ActionResult<List<Product>>> GetProducts()
    {
        var products = await _productsRepository.GetProducts();
        return Ok(products);
    }

    [HttpGet("getproduct/{productId}")]
    public async Task<ActionResult<Product>> GetProduct(int productId)
    {
        var product = await _productsRepository.GetProduct(productId);
        if (product == null) return NotFound();

        return Ok(product);
    }

    [HttpPost]
    public async Task<ActionResult<Order>> CreateProduct([FromBody] Product productToCreate)
    {
        _productsRepository.CreateProduct(productToCreate);
        if (await _productsRepository.SaveAllAsync()) return Ok(productToCreate);

        return BadRequest("Failed to save Product");
    }

    [HttpPut]
    public async Task<ActionResult<Order>> UpdateProduct([FromBody] Product productToUpdate)
    {
        _productsRepository.UpdateProduct(productToUpdate);
        if (await _productsRepository.SaveAllAsync()) return Ok(productToUpdate);

        return BadRequest("Failed to update Product");
    }

}