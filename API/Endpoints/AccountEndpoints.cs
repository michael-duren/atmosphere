using API.Abstractions;
using Application.Accounts;
using Application.Accounts.Commands;
using Application.Accounts.DTOs;
using Application.Core;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace API.Endpoints;

public class AccountEndpoints : IEndpointDefinition
{
    public void RegisterEndpoints(WebApplication app)
    {
        var accounts = app.MapGroup("/api/account");

        accounts.MapPost("/login", Login)
            .AllowAnonymous()
            .WithName("Login")
            .Accepts<LoginDto>("application/json")
            .Produces<Result<UserDto>>(200, "application/json")
            .Produces<Result<UserDto>>(400, "application/json");

        accounts.MapPost("/register", Register)
            .AllowAnonymous()
            .WithName("Register")
            .Accepts<RegisterDto>("application/json")
            .Produces<Result<UserDto>>(200, "application/json")
            .Produces<Result<UserDto>>(400, "application/json");
    }

    private static async Task<IResult> Login(IMediator mediator, [FromBody] LoginDto loginDto)
    {
        var login = new Login.Command
        {
            LoginDto = loginDto
        };

        var result = await mediator.Send(login);

        if (!result.IsSuccess)
            return TypedResults.BadRequest(result);

        return TypedResults.Ok(result);
    }

    private static async Task<IResult> Register(IMediator mediator, RegisterDto registerDto)
    {
        var register = new Register.Command
        {
            RegisterDto = registerDto
        };

        var result = await mediator.Send(register);

        if (!result.IsSuccess)
            return TypedResults.BadRequest(result);

        return TypedResults.Ok(result);
    }
}