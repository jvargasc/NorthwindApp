using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using NorthwindApp.Core.Models;

namespace NorthwindApp.Infrastructure.Repositories
{
    public interface IShippersRepository
    {
        Task<List<Shipper>> GetShippers();
        Task<Shipper> GetShipper(int shipperId);
    }
}