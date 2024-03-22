using Microsoft.AspNetCore.Mvc;
using NorthwindApp.API.Extensions;
using NorthwindApp.Core.Models;
using NorthwindApp.Infrastructure.Helpers;
using NorthwindApp.Infrastructure.Repositories;

namespace NorthwindApp.API.Controllers;

public class ProductsController : BaseApiController
{
    private readonly IProductsRepository _productsRepository;
    public ProductsController(IProductsRepository productsRepository)
    {
        _productsRepository = productsRepository;
    }

    [HttpGet("getproducts")]
    public async Task<ActionResult<List<Product>>> GetProducts([FromQuery] UserParams userParams)
    {
        var products = await _productsRepository.GetProducts(userParams);

        Response.AddPaginationHeader(new PaginationHeader(products.CurrentPage, products.PageSize, products.TotalCount, products.TotalPages));

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