using API.Interfaces;
using Application.Accounts.Commands;
using Application.Accounts.DTOs;
using Application.Core;
using MediatR;

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
            .Produces<UserDto>(200, "application/json")
            .Produces<ErrorMessage>(400, "application/json");

        accounts.MapPost("/register", Register)
            .AllowAnonymous()
            .WithName("Register")
            .Accepts<RegisterDto>("application/json")
            .Produces<UserDto>(200, "application/json")
            .Produces<ErrorMessage>(400, "application/json");
    }

    private static async Task<IResult> Login(IMediator mediator, IHandleResult handleResult,
        LoginDto loginDto)
    {
        var login = new Login.Command
        {
            LoginDto = loginDto
        };

        return handleResult.Handle(await mediator.Send(login));
    }

    private static async Task<IResult> Register(IMediator mediator, IHandleResult handleResult, RegisterDto registerDto)
    {
        var register = new Register.Command
        {
            RegisterDto = registerDto
        };

        return handleResult.Handle(await mediator.Send(register));
    }
}