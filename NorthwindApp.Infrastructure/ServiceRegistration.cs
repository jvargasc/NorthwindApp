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
                                                             IConfiguration configuration,
                                                             bool IsDevelopment)
        {
            string NorthwindConnectionsString = "";

            if (IsDevelopment)
                NorthwindConnectionsString = configuration.GetConnectionString("DefaultConnection");
            else
            {
                // Use connection string provided at runtime by FlyIO.
                var connUrl = Environment.GetEnvironmentVariable("DATABASE_URL");

                // Parse connection URL to connection string for Npgsql
                connUrl = connUrl.Replace("postgres://", string.Empty);
                var pgUserPass = connUrl.Split("@")[0];
                var pgHostPortDb = connUrl.Split("@")[1];
                var pgHostPort = pgHostPortDb.Split("/")[0];
                var pgDb = pgHostPortDb.Split("/")[1];
                var pgUser = pgUserPass.Split(":")[0];
                var pgPass = pgUserPass.Split(":")[1];
                var pgHost = pgHostPort.Split(":")[0];
                var pgPort = pgHostPort.Split(":")[1];

                var updatedHost = pgHost.Replace("flycast", "internal");

                NorthwindConnectionsString = $"Server={updatedHost};Port={pgPort};User Id={pgUser};Password={pgPass};Database={pgDb};";
            }

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
