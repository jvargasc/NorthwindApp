using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using NorthwindApp.API.Interfaces;
using NorthwindApp.API.Services;

namespace NorthwindApp.API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services,
            IConfiguration config)
        {
            services.AddCors();
            services.AddApplicationInsightsTelemetry(config["APPLICATIONINSIGHTS_CONNECTION_STRING"]);
            services.AddScoped<ITokenService, TokenService>();

            return services;
        }
    }
}