using Microsoft.EntityFrameworkCore;
using NorthwindApp.Core.Models;
using NorthwindApp.Infrastructure.Context;

namespace NorthwindApp.Infrastructure.Repositories;

public class UsersRepository : IUsersRepository
{
    private readonly NorthwindContext _northwindContext;

    public UsersRepository(NorthwindContext northwindContext)
    {
        _northwindContext = northwindContext;
    }

    public void CreateUser(AppUser user)
    {
        _northwindContext.Users.Add(user);
    }

    public async Task<AppUser> GetUser(string username)
    {
        return await _northwindContext.Users.Where(u => u.UserName == username).FirstOrDefaultAsync();
    }

    public async Task<List<AppUser>> GetUsers()
    {
        return await _northwindContext.Users.ToListAsync();
    }

    public async Task<bool> SaveAllAsync()
    {
        return await _northwindContext.SaveChangesAsync() > 0;
    }

    public void UpdateUser(AppUser user)
    {
        _northwindContext.Entry(user).State = EntityState.Modified;
    }

    public async Task<bool> UserExists(string username)
    {
        return await _northwindContext.Users.AnyAsync(u => u.UserName == username.ToLower());
    }
}
