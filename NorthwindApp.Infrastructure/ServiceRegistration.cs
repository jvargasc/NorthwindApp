using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using NorthwindApp.Infrastructure.Context;
using NorthwindApp.Infrastructure.Repositories;
using NorthwindApp.Infrastructure.Data;
using Microsoft.Extensions.Logging;
using System.Reflection;

namespace NorthwindApp.Infrastructure
{
    public static class ServiceRegistration
    {
        public static void AddPersistenceInfrastructure(this IServiceCollection services,
                                                             IConfiguration configuration)
        {
            string NorthwindConnectionsString = configuration.GetConnectionString("DefaultConnection");

            services.AddDbContext<NorthwindContext>(opt =>
            {
                opt.UseNpgsql(NorthwindConnectionsString);
            });

            // services.AddHealthChecks().AddSqlServer(NorthwindConnectionsString, "Select 1;", "Northwind");

            // Add services to the container.
            services.AddScoped<ICategoriesRepository, CategoriesRepository>();
            services.AddScoped<ICustomersRepository, CustomersRepository>();
            services.AddScoped<IEmployeesRepository, EmployeesRepository>();
            services.AddScoped<IOrdersRepository, OrdersRepository>();
            services.AddScoped<IProductsRepository, ProductsRepository>();
            services.AddScoped<IRegionsRepository, RegionsRepository>();
            services.AddScoped<IShippersRepository, ShippersRepository>();
            services.AddScoped<ISuppliersRepository, SuppliersRepository>();
            services.AddScoped<ITerritoriesRepository, TerritoriesRepository>();
            services.AddScoped<IUsersRepository, UsersRepository>();
        }

        public static async void SeedData(this IServiceCollection services, IServiceProvider? servicesScoped)
        {
            try
            {
                var context = servicesScoped.GetRequiredService<NorthwindContext>();
                context.Database.EnsureCreated();
                // await context.Database.MigrateAsync();
                await Seed.SeedData(context);
            }
            catch (Exception ex)
            {
                var logger = servicesScoped.GetService<ILogger<NorthwindContext>>();
                logger.LogError(ex, "An error occurred during seeding");
            }
        }
    }
}