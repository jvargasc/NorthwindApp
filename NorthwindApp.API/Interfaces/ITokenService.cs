using NorthwindApp.Core.Models;

namespace NorthwindApp.API.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(AppUser user);
    }
}