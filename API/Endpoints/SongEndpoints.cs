using API.Interfaces;
using Application.Core;
using Application.Songs.Commands;
using Application.Songs.DTOs;
using Application.Songs.Queries;
using Domain;
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

        songs.MapPost("/", CreateSong)
            .WithName("CreateSong")
            .Accepts<SongCreateDto>("application/json")
            .Produces(200)
            .Produces<ErrorMessage>(400, "application/json");

        songs.MapPut("/{id}", UpdateSong)
            .WithName("UpdateSong")
            .Accepts<SongCreateDto>("application/json")
            .Produces(200)
            .Produces<ErrorMessage>(400, "application/json");

        songs.MapDelete("/{id}", DeleteSong)
            .WithName("DeleteSong");
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

    private static async Task<IResult> CreateSong(IMediator mediator, IHandleResult handleResult,
        SongCreateDto songCreateDto, CancellationToken cancellationToken)
    {
        var createSong = new CreateSong.Command { Song = songCreateDto };
        return handleResult.Handle(await mediator.Send(createSong, cancellationToken));
    }

    private static async Task<IResult> UpdateSong(IMediator mediator, IHandleResult handleResult, int id,
        Song song, CancellationToken cancellationToken)
    {
        var updateSong = new UpdateSong.Command { Song = song, Id = id };
        return handleResult.Handle(await mediator.Send(updateSong, cancellationToken));
    }

    private static async Task<IResult> DeleteSong(IMediator mediator, IHandleResult handleResult, int id,
        CancellationToken cancellationToken)
    {
        var deleteSong = new DeleteSong.Command { Id = id };
        return handleResult.Handle(await mediator.Send(deleteSong, cancellationToken));
    }
}