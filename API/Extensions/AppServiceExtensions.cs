using Application.Core;
using Application.Songs.Commands;
using DataAccess;
using Microsoft.EntityFrameworkCore;
using MediatR;

namespace API.Extensions;

public static class AppServiceExtensions
{
    public static void AddApplicationServices(this WebApplicationBuilder builder, IConfiguration config)
    {
        builder.Services.AddControllers();
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();
        builder.Services.AddMediatR(typeof(CreateSong.Command));
        builder.Services.AddAutoMapper(typeof(MappingProfiles).Assembly);
        
        var connection = config.GetConnectionString("DefaultConnection");

        builder.Services.AddDbContext<AppDbContext>(options =>
        {
            options
                .UseNpgsql(connection);
        });
    }
}