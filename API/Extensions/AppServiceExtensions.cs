using API.Abstractions;
using Application.Accounts.Commands;
using Application.Core;
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
        var connection = config.GetConnectionString("DefaultConnection");
        
        builder.Services.AddDbContext<AppDbContext>(options =>
        {
            options
                .UseNpgsql(connection);
        });
        
        builder.Services.AddControllers();
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();
        builder.Services.AddMediatR(typeof(CreateSong.Command));
        builder.Services.AddAutoMapper(typeof(MappingProfiles).Assembly);
        builder.Services.AddFluentValidationAutoValidation();
        builder.Services.AddValidatorsFromAssemblyContaining<CreateSong>();
        builder.Services.AddValidatorsFromAssemblyContaining<Login>();
        builder.Services.AddProblemDetails();
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