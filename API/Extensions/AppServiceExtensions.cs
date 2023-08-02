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
        builder.Services.AddDbContext<AppDbContext>(options =>
        {
            var env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
            string connStr;
            
            // Depending on if in development or production, use either FlyIO
            // connection string, or development connection string from var.
            if (env == "Development")
            {
                connStr = config.GetConnectionString("DefaultConnection");
            }
            else
            {
                // Use connection string provided at runtime by FlyIO.
                var connUrl = Environment.GetEnvironmentVariable("DATABASE_URL");
                
                // Parse connection URL to connection string for Npgsql
                // Parse connection URL to connection string for Npgsql
                connUrl = connUrl!.Replace("postgres://", string.Empty);
                var pgUserPass = connUrl.Split("@")[0];
                var pgHostPortDb = connUrl.Split("@")[1];
                var pgHostPort = pgHostPortDb.Split("/")[0];
                var pgDb = pgHostPortDb.Split("/")[1];
                var pgUser = pgUserPass.Split(":")[0];
                var pgPass = pgUserPass.Split(":")[1];
                var pgHost = pgHostPort.Split(":")[0];
                var pgPort = pgHostPort.Split(":")[1];
                var updatedHost = pgHost.Replace("flycast", "internal");
        
                connStr = $"Server={updatedHost};Port={pgPort};User Id={pgUser};Password={pgPass};Database={pgDb};";
                    
            }
                // Whether the connection string came from the local development configuration file
                // or from the environment variable from FlyIO, use it to set up your DbContext.
                options.UseNpgsql(connStr);
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