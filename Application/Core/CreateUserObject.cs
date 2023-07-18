using Application.Accounts.DTOs;
using Application.Services;
using Domain;

namespace Application.Core;

public static class CreateUserObject
{
    public static UserDto CreateUserDto(AppUser user, TokenService tokenService)
    {
        return new UserDto
        {
            Token = tokenService.CreateToken(user),
            Username = user.UserName!,
        };
    }
}