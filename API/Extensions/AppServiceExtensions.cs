using DataAccess;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions;

public static class AppServiceExtensions
{
    public static void AddApplicationServices(this WebApplicationBuilder builder, IConfiguration config)
    {
        builder.Services.AddControllers();
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();
        var connection = config.GetConnectionString("DefaultConnection");

        builder.Services.AddDbContext<AppDbContext>(o => { o.UseNpgsql(connection); });
    }
}