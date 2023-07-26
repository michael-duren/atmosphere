using Application.Accounts.DTOs;
using Application.Core;
using Application.Interfaces;
using Application.Services;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Application.Accounts.Commands;

public class RefreshToken
{
    public class Command : IRequest<Result<UserDto>>
    {
        public string CurrentRefreshToken { get; set; } = null!;
    }

    public class Handler : IRequestHandler<Command, Result<UserDto>>
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly RefreshTokenService _refreshTokenService;
        private readonly IUserAccessor _userAccessor;
        private readonly TokenService _tokenService;

        public Handler(UserManager<AppUser> userManager, RefreshTokenService refreshTokenService,
            IUserAccessor userAccessor, TokenService tokenService)
        {
            _userManager = userManager;
            _refreshTokenService = refreshTokenService;
            _userAccessor = userAccessor;
            _tokenService = tokenService;
        }

        public async Task<Result<UserDto>> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = await _userManager.Users.Include(r => r.RefreshTokens)
                .FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

            if (user is null) return Result<UserDto>.Failure(new ErrorMessage(new List<string> { "User not found" }));

            var oldToken = user.RefreshTokens.SingleOrDefault(x => x.Token == request.CurrentRefreshToken);

            if (oldToken is not null && !oldToken.IsActive)
                return Result<UserDto>.Failure(new ErrorMessage(new List<string> { "Unauthorized" }));

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