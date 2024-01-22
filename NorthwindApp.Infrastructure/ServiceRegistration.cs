using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using NorthwindApp.Infrastructure.Context;
using NorthwindApp.Infrastructure.Repositories;

namespace NorthwindApp.Infrastructure
{
    public static class ServiceRegistration
    {
        public static void AddPersistenceInfrastructure(this IServiceCollection services,
                                                             IConfiguration configuration)
        {
            string NorthwindConnectionsString = Environment.GetEnvironmentVariable("connectionStrings:northwindwebdbconnectionstring");

            services.AddDbContext<NorthwindContext>(options =>
                options.UseSqlServer(NorthwindConnectionsString,
                   b => b.MigrationsAssembly(typeof(NorthwindContext).Assembly.FullName))
            );

            services.AddHealthChecks().AddSqlServer(NorthwindConnectionsString, "Select 1;", "Northwind");

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
        }
    }
}