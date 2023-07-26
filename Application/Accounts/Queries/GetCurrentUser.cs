using Application.Accounts.DTOs;
using Application.Core;
using Application.Interfaces;
using Application.Services;
using AutoMapper;
using DataAccess;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Accounts.Queries;

public class GetCurrentUser
{
    public class Query : IRequest<Result<UserDto>>
    {
    }

    public class Handler : IRequestHandler<Query, Result<UserDto>>
    {
        private readonly IUserAccessor _userAccessor;
        private readonly IMapper _mapper;
        private readonly AppDbContext _context;
        private readonly TokenService _tokenService;
        private readonly RefreshTokenService _refreshTokenService;

        public Handler(IUserAccessor userAccessor, IMapper mapper, AppDbContext context, TokenService tokenService, RefreshTokenService refreshTokenService)
        {
            _userAccessor = userAccessor;
            _mapper = mapper;
            _context = context;
            _tokenService = tokenService;
            _refreshTokenService = refreshTokenService;
        }

        public async Task<Result<UserDto>> Handle(Query request, CancellationToken cancellationToken)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == _userAccessor.GetUsername(),
                cancellationToken: cancellationToken);

            if (user is null)
                return Result<UserDto>.Failure(
                    new ErrorMessage(new List<string> { "User not found" }));

            await _refreshTokenService.SetRefreshToken(user);
            return Result<UserDto>.Success(CreateUserObject.CreateUserDto(user, _tokenService));
        }
    }
}