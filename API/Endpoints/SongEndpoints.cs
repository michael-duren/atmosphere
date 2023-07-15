using API.Interfaces;
using Application.Core;
using Application.Songs.DTOs;
using Application.Songs.Queries;
using MediatR;

namespace API.Endpoints;

public class SongEndpoints : IEndpointDefinition
{
    public void RegisterEndpoints(WebApplication app)
    {
        var songs = app.MapGroup("/api/songs");

        songs.MapGet("/", GetAllSongs)
            .WithName("GetAllSongs")
            .Produces<List<SongQueryDto>>(200, "application/json")
            .Produces<ErrorMessage>(400, "application/json");

        songs.MapGet("/{id}", GetSongById)
            .WithName("GetSongById")
            .Produces<SongQueryDto>(200, "application/json")
            .Produces<ErrorMessage>(400, "application/json");
    }

    private static async Task<IResult> GetAllSongs(IMediator mediator, IHandleResult handleResult,
        CancellationToken cancellationToken)
    {
        var getAllSongs = new GetAllSongs.Query();
        return handleResult.Handle(await mediator.Send(getAllSongs, cancellationToken));
    }

    private static async Task<IResult> GetSongById(IMediator mediator, IHandleResult handleResult, int id,
        CancellationToken cancellationToken)
    {
        var getSong = new GetSongById.Query { Id = id };
        return handleResult.Handle(await mediator.Send(getSong, cancellationToken));
    }
}