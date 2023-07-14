using Domain;
using Microsoft.EntityFrameworkCore;
using DataAccess;
using Microsoft.AspNetCore.Identity;
using API.Extensions;
using Application.Songs.Queries;
using MediatR;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.AddApplicationServices(builder.Configuration);
builder.AddIdentityServiceExtensions();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapGet("/api/songs", async (IMediator mediator, CancellationToken cancellationToken) =>
{
    var getAllSongs = new GetAllSongs.Query();
    var songs = await mediator.Send(getAllSongs, cancellationToken);
    return songs;
});
app.MapGet("/api/songs/{id}", async (IMediator mediator, CancellationToken cancellationToken, int id) =>
{
    var getSongById = new GetSongById.Query { Id = id };
    var songs = await mediator.Send(getSongById, cancellationToken);
    return songs;
});

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