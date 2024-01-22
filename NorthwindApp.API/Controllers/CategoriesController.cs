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
public class CategoriesController : ControllerBase
{
    private readonly ICategoriesRepository _categoriesRepository;

    public CategoriesController(ICategoriesRepository categoriesRepository)
    {
        _categoriesRepository = categoriesRepository;
    }

    [HttpGet("getcategories")]
    public async Task<ActionResult<List<Category>>> GetCategories()
    {
        var Categories = await _categoriesRepository.GetCategories();
        return Ok(Categories);
    }

    [HttpGet("getcategory/{categoryId}")]
    public async Task<ActionResult<Category>> GetCategory(int categoryId)
    {
        var Category = await _categoriesRepository.GetCategory(categoryId);
        if (Category == null) return NotFound();

        return Ok(Category);
    }

}