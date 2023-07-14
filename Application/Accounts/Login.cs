using API.Services;
using Application.Accounts.DTOs;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Application.Accounts;

public class Login
{
    public class Command : IRequest<UserDto>
    {
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;
    }

    public class Handler : IRequestHandler<Command, UserDto>
    {
        private readonly TokenService _tokenService;
        private readonly UserManager<AppUser> _userManager;

        public Handler(TokenService tokenService, UserManager<AppUser> userManager)
        {
            _tokenService = tokenService;
            _userManager = userManager;
        }

        public async Task<UserDto> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = await _userManager.FindByEmailAsync(request.Email);
            if (user == null) return null;

            var result = await _userManager.CheckPasswordAsync(user, request.Password);

            return result ? CreateUserObject(user) : null;
        }

        private UserDto CreateUserObject(AppUser user)
        {
            return new UserDto
            {
                Token = _tokenService.CreateToken(user),
                Username = user.UserName!,
            };
        }
    }
}