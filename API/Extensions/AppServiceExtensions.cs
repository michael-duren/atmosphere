using API.Endpoints.Utility;
using API.Interfaces;
using Application.Accounts.Commands;
using Application.Core;
using Application.Interfaces;
using Application.Security;
using Application.Songs.Commands;
using DataAccess;
using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.EntityFrameworkCore;
using MediatR;

namespace API.Extensions;

public static class AppServiceExtensions
{
    public static void RegisterAppServices(this WebApplicationBuilder builder, IConfiguration config)
    {
        // connect db 
        var connection = config.GetConnectionString("DefaultConnection");

        builder.Services.AddDbContext<AppDbContext>(options =>
        {
            options
                .UseNpgsql(connection);
        });

        // swagger
        builder.Services.AddControllers();
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        // cors policy for development
        builder.Services.AddCors(opt =>
        {
            opt.AddPolicy("CorsPolicy",
                policy =>
                {
                    policy
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowCredentials()
                        .WithExposedHeaders("WWW-Authenticate")
                        .WithOrigins("http://localhost:5173");
                });
        });

        // mediatr
        builder.Services.AddMediatR(typeof(CreateSong.Command));
        builder.Services.AddAutoMapper(typeof(MappingProfiles).Assembly);

        // validators
        builder.Services.AddFluentValidationAutoValidation();
        builder.Services.AddValidatorsFromAssemblyContaining<CreateSong>();
        builder.Services.AddValidatorsFromAssemblyContaining<Login>();

        // http context access
        builder.Services.AddHttpContextAccessor();
        builder.Services.AddScoped<IUserAccessor, UserAccessor>();

        // handle result
        builder.Services.AddScoped<IHandleResult, HandleResult>();
    }

    public static void RegisterEndpointDefinitions(this WebApplication app)
    {
        /*
         * scan the assembly (the minimal api project) for all types that implement IEndpointDefinition
         * only get types that are not abstract and not interfaces
         * we cast it to IEndpointDefinition because we know it implements it 
         */

        var endpointDefinitions = typeof(Program).Assembly
            .GetTypes()
            .Where(t => t.IsAssignableTo(typeof(IEndpointDefinition)) && !t.IsAbstract && !t.IsInterface)
            .Select(Activator.CreateInstance)
            .Cast<IEndpointDefinition>();

        // register all the endpoints
        foreach (var endpointDef in endpointDefinitions) endpointDef.RegisterEndpoints(app);
    }
}