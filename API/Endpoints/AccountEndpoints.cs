using API.Abstractions;
using Application.Accounts;
using Application.Accounts.Commands;
using Application.Accounts.DTOs;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace API.Endpoints;

public class AccountEndpoints : IEndpointDefinition
{
    public void RegisterEndpoints(WebApplication app)
    {
        var accounts = app.MapGroup("/api/account");

        accounts.MapPost("/login", Login);

        accounts.MapPost("/register", Register);
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