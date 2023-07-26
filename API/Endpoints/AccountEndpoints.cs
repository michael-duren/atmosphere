using API.Endpoints.Utility;
using API.Interfaces;
using Application.Accounts.Commands;
using Application.Accounts.DTOs;
using Application.Accounts.Queries;
using Application.Core;
using MediatR;
using RefreshToken = Application.Accounts.Commands.RefreshToken;

namespace API.Endpoints;

public class AccountEndpoints : IEndpointDefinition
{
    public void RegisterEndpoints(WebApplication app)
    {
        var accounts = app.MapGroup("/api/account");

        accounts.MapGet("/", GetCurrentUser)
            .WithName("GetCurrentUser")
            .Produces<UserDto>(200, "application/json")
            .Produces<ErrorMessage>(401, "application/json");

        accounts.MapPost("/login", Login)
            .AllowAnonymous()
            .WithName("Login")
            .Accepts<LoginDto>("application/json")
            .Produces<UserDto>(200, "application/json")
            .Produces<ErrorMessage>(400, "application/json");

        accounts.MapPost("/register", Register)
            .AllowAnonymous()
            .WithName("Register")
            .Accepts<RegisterDto>("application/json")
            .Produces<UserDto>(200, "application/json")
            .Produces<ErrorMessage>(400, "application/json");

        accounts.MapPost("/refresh-token", GetRefreshToken)
            .WithName("RefreshToken")
            .Produces<UserDto>(200, "application/json")
            .Produces<ErrorMessage>(403, "application/json");
    }

    private static async Task<IResult> GetRefreshToken(HttpContext context, IMediator mediator,
        IHandleResult handleResult)
    {
        var refreshToken = context.Request.Cookies["refreshToken"];
        var result = await mediator.Send(new RefreshToken.Command { CurrentRefreshToken = refreshToken! });
        return result.IsSuccess ? handleResult.Handle(result) : new Unauthorized(result.Error);
    }

    private static async Task<IResult> GetCurrentUser(IMediator mediator, IHandleResult handleResult)
    {
        var result = await mediator.Send(new GetCurrentUser.Query());

        return result.IsSuccess ? handleResult.Handle(result) : new Unauthorized(result.Error);
    }

    private static async Task<IResult> Login(IMediator mediator, IHandleResult handleResult,
        LoginDto loginDto)
    {
        var login = new Login.Command
        {
            LoginDto = loginDto
        };

        var result = await mediator.Send(login);
        return result.IsSuccess ? handleResult.Handle(result) : new Unauthorized(result.Error);
    }

    private static async Task<IResult> Register(IMediator mediator, IHandleResult handleResult, RegisterDto registerDto)
    {
        var register = new Register.Command
        {
            RegisterDto = registerDto
        };

        var result = await mediator.Send(register);
        return result.IsSuccess ? handleResult.Handle(result) : new Unauthorized(result.Error);
    }
}