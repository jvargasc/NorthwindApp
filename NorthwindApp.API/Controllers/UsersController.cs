using System.Security.Cryptography;
using System.Text;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using NorthwindApp.API.Interfaces;
using NorthwindApp.Core.Dtos;
using NorthwindApp.Core.Models;
using NorthwindApp.Infrastructure.Repositories;

namespace NorthwindApp.API.Controllers;

public class UsersController : BaseApiController
{
    private readonly IUsersRepository _usersRepository;
    private readonly IMapper _mapper;
    private readonly ITokenService _tokenService;

    public UsersController(IUsersRepository usersRepository, IMapper mapper, ITokenService tokenService)
    {
        _tokenService = tokenService;
        _usersRepository = usersRepository;
        _mapper = mapper;
    }

    [HttpPost("login")]
    public async Task<ActionResult<AppUserDto>> Login(LoginDto login)
    {
        var user = await _usersRepository.GetUser(login.UserName.ToLower());
        if (user == null) return Unauthorized("invalid username");

        using var hmac = new HMACSHA512(user.PasswordSalt);

        var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(login.Password));

        for (int i = 0; i < computedHash.Length; i++)
        {
            if (computedHash[i] != user.PasswordHash[i])
                return Unauthorized("invalid password");
        }

        return new AppUserDto
        {
            UserName = user.UserName,
            Token = _tokenService.CreateToken(user)
        };

        // var result = await _userManager.CheckPasswordAsync(user, login.Password);
        // if (!result) return Unauthorized("Invalid password");
    }

    [HttpPost("register")]
    public async Task<ActionResult<AppUserDto>> Register([FromBody] UserToCreate userToCreate)
    {
        if (await _usersRepository.UserExists(userToCreate.UserName.ToLower()))
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

        // AppUserDto userCreated = _mapper.Map<AppUserDto>(user);

        return new AppUserDto
        {
            UserName = user.UserName,
            Token = _tokenService.CreateToken(user)
        };
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
    public async Task<ActionResult<AppUserDto>> GetUser(string userName)
    {
        AppUser user = await _usersRepository.GetUser(userName);

        if (user == null)
            return BadRequest("That user name doesn't exists");

        AppUserDto userDto = _mapper.Map<AppUserDto>(user);

        return Ok(userDto);
    }

}
