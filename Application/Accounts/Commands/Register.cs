using Application.Accounts.DTOs;
using Application.Core;
using Application.Services;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Application.Accounts.Commands;

public class Register
{
    public class Command : IRequest<Result<UserDto>>
    {
        public RegisterDto RegisterDto { get; set; } = null!;
    }

    public class Handler : IRequestHandler<Command, Result<UserDto>>
    {
        private readonly TokenService _tokenService;
        private readonly UserManager<AppUser> _userManager;
        private readonly IValidator<RegisterDto> _validator;

        public Handler(TokenService tokenService, UserManager<AppUser> userManager, IValidator<RegisterDto> validator)
        {
            _tokenService = tokenService;
            _userManager = userManager;
            _validator = validator;
        }

        public async Task<Result<UserDto>> Handle(Command request, CancellationToken cancellationToken)
        {
            var validationResult = await _validator.ValidateAsync(request.RegisterDto, cancellationToken);

            if (!validationResult.IsValid)
                return Result<UserDto>.Failure(new ErrorMessage(ParseErrorList.ToErrorList(validationResult.Errors)));

            var user = new AppUser
            {
                UserName = request.RegisterDto.Username,
                Email = request.RegisterDto.Email,
            };

            var result = await _userManager.CreateAsync(user, request.RegisterDto.Password);

            return !result.Succeeded
                ? Result<UserDto>.Failure(new ErrorMessage(new List<string> { "User creation failed" }))
                : Result<UserDto>.Success(CreateUserObject.CreateUserDto(user, _tokenService));
        }
    }
}