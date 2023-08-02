using Domain;
using Microsoft.EntityFrameworkCore;
using DataAccess;
using Microsoft.AspNetCore.Identity;
using API.Extensions;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.RegisterAppServices(builder.Configuration);
builder.AddIdentityServiceExtensions();


var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseDefaultFiles(); // look in wwwroot folder and find index.html, js, css, etc
app.UseStaticFiles(); // serve static files from wwwroot folder
app.MapFallbackToFile("index.html").AllowAnonymous(); // if we don't find anything i.e. api endpoints, return index.html (react app)

app.UseCors("CorsPolicy");
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();
app.RegisterEndpointDefinitions();



using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;

try
{
    var context = services.GetRequiredService<AppDbContext>();
    var userManager = services.GetRequiredService<UserManager<AppUser>>();
    await context.Database.MigrateAsync();
    await Seed.SeedData(context, userManager);
}
catch (Exception e)
{
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(e, "An error occurred while migrating or seeding the database");
}

app.Run();