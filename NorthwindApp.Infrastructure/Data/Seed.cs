using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using NorthwindApp.Core.Models;
using NorthwindApp.Infrastructure.Context;

namespace NorthwindApp.Infrastructure.Data;

public static class Seed
{
    public static async Task SeedData(NorthwindContext dbContext)
    {
        string directory = Directory.GetCurrentDirectory();
        JsonSerializerOptions options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };

        if (!await dbContext.Categories.AnyAsync())
            SeedCategories(dbContext, directory, options);

        if (!await dbContext.Customers.AnyAsync())
            SeedCustomers(dbContext, directory, options);

        if (!await dbContext.Employees.AnyAsync())
            SeedEmployees(dbContext, directory, options);

        if (!await dbContext.Products.AnyAsync())
            SeedProducts(dbContext, directory, options);

        if (!await dbContext.Regions.AnyAsync())
            SeedRegions(dbContext, directory, options);

        if (!await dbContext.Shippers.AnyAsync())
            SeedShippers(dbContext, directory, options);

        if (!await dbContext.Suppliers.AnyAsync())
            SeedSuppliers(dbContext, directory, options);

        if (!await dbContext.Territories.AnyAsync())
            SeedTerritories(dbContext, directory, options);

    }

    private static async Task SeedCategories(NorthwindContext dbContext, string directory, JsonSerializerOptions options)
    {
        var categoriesData = await File.ReadAllTextAsync($"{directory}/Data/CategoriesSeedData.json");

        var categories = JsonSerializer.Deserialize<List<Category>>(categoriesData, options);

        foreach (var category in categories)
        {
            await dbContext.Categories.AddAsync(category);
        }

        dbContext.SaveChangesAsync();
    }

    private static async Task SeedCustomers(NorthwindContext dbContext, string directory, JsonSerializerOptions options)
    {
        var customersData = await File.ReadAllTextAsync($"{directory}/Data/CustomersSeedData.json");

        var customers = JsonSerializer.Deserialize<List<Customer>>(customersData, options);

        foreach (var customer in customers)
        {
            await dbContext.Customers.AddAsync(customer);
        }

        dbContext.SaveChangesAsync();
    }

    private static async Task SeedEmployees(NorthwindContext dbContext, string directory, JsonSerializerOptions options)
    {
        var employeesData = await File.ReadAllTextAsync($"{directory}/Data/EmployeesSeedData.json");

        var employees = JsonSerializer.Deserialize<List<Employee>>(employeesData, options);
        int counter = 0;

        foreach (var employee in employees)
        {
            counter++;
            Console.WriteLine(counter);
            Console.WriteLine(employee.HireDate + " " + employee.BirthDate);
            await dbContext.Employees.AddAsync(employee);
        }

        dbContext.SaveChangesAsync();
    }

    /*
        Here I'm suppossed to Seed the Orders Table
    */

    private static async Task SeedProducts(NorthwindContext dbContext, string directory, JsonSerializerOptions options)
    {
        var productsData = await File.ReadAllTextAsync($"{directory}/Data/ProductsSeedData.json");

        var products = JsonSerializer.Deserialize<List<Product>>(productsData, options);

        foreach (var product in products)
        {
            await dbContext.Products.AddAsync(product);
        }

        dbContext.SaveChangesAsync();
    }

    private static async Task SeedRegions(NorthwindContext dbContext, string directory, JsonSerializerOptions options)
    {
        var regionsData = await File.ReadAllTextAsync($"{directory}/Data/RegionsSeedData.json");

        var regions = JsonSerializer.Deserialize<List<Region>>(regionsData, options);

        foreach (var region in regions)
        {
            await dbContext.Regions.AddAsync(region);
        }

        dbContext.SaveChangesAsync();
    }

    private static async Task SeedShippers(NorthwindContext dbContext, string directory, JsonSerializerOptions options)
    {
        var shippersData = await File.ReadAllTextAsync($"{directory}/Data/ShippersSeedData.json");

        var shippers = JsonSerializer.Deserialize<List<Shipper>>(shippersData, options);

        foreach (var shipper in shippers)
        {
            await dbContext.Shippers.AddAsync(shipper);
        }

        dbContext.SaveChangesAsync();
    }

    private static async Task SeedSuppliers(NorthwindContext dbContext, string directory, JsonSerializerOptions options)
    {
        var suppliersData = await File.ReadAllTextAsync($"{directory}/Data/SuppliersSeedData.json");

        var suppliers = JsonSerializer.Deserialize<List<Supplier>>(suppliersData, options);

        foreach (var supplier in suppliers)
        {
            await dbContext.Suppliers.AddAsync(supplier);
        }

        dbContext.SaveChangesAsync();
    }

    private static async Task SeedTerritories(NorthwindContext dbContext, string directory, JsonSerializerOptions options)
    {
        var territoriesData = await File.ReadAllTextAsync($"{directory}/Data/TerritoriesSeedData.json");

        var territories = JsonSerializer.Deserialize<List<Territory>>(territoriesData, options);

        foreach (var territory in territories)
        {
            await dbContext.Territories.AddAsync(territory);
        }

        dbContext.SaveChangesAsync();
    }


    private static async Task SeedTable(NorthwindContext dbContext, string fileName, JsonSerializerOptions options)
    {
        var genericData = await File.ReadAllTextAsync(fileName);

        //var genericEntities = JsonSerializer.Deserialize<List<GenericNorthwindClass>>(employeesData, options);
        /*
         Still working in the correct abstraction (to have a design pattern) so instead of having multiples
         methods to seed tables, a seed method should work with multiple files/types/tables
        */

    }

    private class GenericNorthwindClass<T>
    {

        // private data members
        private T data;

        // using properties
        public T value
        {

            // using accessors
            get
            {
                return this.data;
            }
            set
            {
                this.data = value;
            }
        }
    }

}
