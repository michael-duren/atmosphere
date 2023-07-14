using API.Abstractions;
using Application.Accounts;
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

    private async Task<IResult> Login(IMediator mediator, [FromBody]LoginDto loginDto)
    {
        if (loginDto.Email.IsNullOrEmpty()) return TypedResults.BadRequest("Email is required");
        if (loginDto.Password.IsNullOrEmpty()) return TypedResults.BadRequest("Password is required");
        
        var login = new Login.Command
        {
            Email = loginDto.Email,
            Password = loginDto.Password
        };
        
       var user = await mediator.Send(login);
       if (user is null) return TypedResults.Unauthorized();

       return TypedResults.Ok(user);
    }
    private async Task<IResult> Register()
    {
        throw new NotImplementedException();
    }

}