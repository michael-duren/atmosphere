using Application.Accounts.DTOs;
using Application.Core;
using Application.Services;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Application.Accounts.Commands;

public class Login
{
    public class Command : IRequest<Result<UserDto>>
    {
        public LoginDto LoginDto { get; set; } = null!;
    }

    public class Handler : IRequestHandler<Command, Result<UserDto>>
    {
        private readonly TokenService _tokenService;
        private readonly UserManager<AppUser> _userManager;
        private readonly IValidator<LoginDto> _validator;
        private readonly RefreshTokenService _refreshTokenService;

        public Handler(TokenService tokenService, UserManager<AppUser> userManager, IValidator<LoginDto> validator, RefreshTokenService refreshTokenService)
        {
            _tokenService = tokenService;
            _userManager = userManager;
            _validator = validator;
            _refreshTokenService = refreshTokenService;
        }

        public async Task<Result<UserDto>> Handle(Command request, CancellationToken cancellationToken)
        {
            // var validationResult = await _validator.ValidateAsync(request.LoginDto, cancellationToken);
            // if (!validationResult.IsValid)
            //     return Result<UserDto>.Failure(new ErrorMessage(ParseErrorList.ToErrorList(validationResult.Errors)));

            var user = await _userManager.FindByEmailAsync(request.LoginDto.Email);
            if (user is null)
                return Result<UserDto>.Failure(new ErrorMessage(new List<string> { "User not found" }));

            var result = await _userManager.CheckPasswordAsync(user, request.LoginDto.Password);

            if (!result)
                return Result<UserDto>.Failure(new ErrorMessage(new List<string> { "Invalid password" }));

            await _refreshTokenService.SetRefreshToken(user);
            return Result<UserDto>.Success(CreateUserObject(user));
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