using System.Security.Cryptography;
using System.Text;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using NorthwindApp.Core.Dtos;
using NorthwindApp.Core.Models;
using NorthwindApp.Infrastructure.Context;
using NorthwindApp.Infrastructure.Repositories;

namespace NorthwindApp.API.Controllers;

public class UsersController : BaseApiController
{
    private readonly IUsersRepository _usersRepository;
    private readonly IMapper _mapper;

    public UsersController(IUsersRepository usersRepository, IMapper mapper)
    {
        _usersRepository = usersRepository;
        _mapper = mapper;
    }

    [HttpPost("login")]
    public async Task<ActionResult<AppUserDto>> Login([FromBody] UserToCreate userToCreate)
    {

    }

    [HttpPost("register")]
    public async Task<ActionResult<AppUserDto>> Register([FromBody] UserToCreate userToCreate)
    {
        if (!(await _usersRepository.UserExists(userToCreate.UserName)))
            return BadRequest("That user name is taken");

        using var hmac = new HMACSHA512();

        var user = new AppUser
        {
            UserName = userToCreate.UserName.ToLower(),
            PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(userToCreate.Password)),
            PasswordSalt = hmac.Key
        };

        _usersRepository.CreateUser(user);
        await _usersRepository.SaveAllAsync();

        AppUserDto userCreated = _mapper.Map<AppUserDto>(user);

        return userCreated;
    }

    [HttpGet("getusers")]
    public async Task<ActionResult<List<AppUserDto>>> GetUsers()
    {
        List<AppUser> users = await _usersRepository.GetUsers();
        // var user = _mapper.Map<AppUser>(registerDto);
        List<AppUserDto> usersDto = _mapper.Map<List<AppUserDto>>(users);

        return Ok(usersDto);
    }

    [HttpGet("getuser")]
    public async Task<ActionResult<List<AppUserDto>>> GetUser([FromHeader] string userName)
    {
        AppUser user = await _usersRepository.GetUser(userName);

        if (user != null)
            return BadRequest("That user name doesn't exists");

        List<AppUserDto> userDto = _mapper.Map<List<AppUserDto>>(user);

        return Ok(userDto);
    }

}
