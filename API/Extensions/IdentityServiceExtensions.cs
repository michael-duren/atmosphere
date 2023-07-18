using System.Text;
using Application.Services;
using DataAccess;
using Domain;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;

namespace API.Extensions;

public static class IdentityServiceExtensions
{
    public static void AddIdentityServiceExtensions(this WebApplicationBuilder builder)
    {
        builder.Services.AddIdentityCore<AppUser>(options => { options.User.RequireUniqueEmail = true; })
            .AddEntityFrameworkStores<AppDbContext>();
        
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["TokenKey"]!));

        builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(opt =>
        {
            opt.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = key,
                ValidateIssuer = false,
                ValidateAudience = false
            };
        });

        builder.Services.AddAuthorization(opt =>
        {
            opt.FallbackPolicy = new AuthorizationPolicyBuilder()
                .AddAuthenticationSchemes(JwtBearerDefaults.AuthenticationScheme)
                .RequireAuthenticatedUser()
                .Build();
        });

        builder.Services.AddScoped<TokenService>();
    }
}