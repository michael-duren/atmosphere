using DataAccess;
using Domain;

namespace API.Extensions;

public static class IdentityServiceExtensions
{
    public static void AddIdentityServiceExtensions(this WebApplicationBuilder builder)
    {
        builder.Services.AddIdentityCore<AppUser>()
            .AddEntityFrameworkStores<AppDbContext>();
    }
}