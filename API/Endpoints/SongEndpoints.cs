using API.Abstractions;
using Application.Songs.Queries;
using MediatR;

namespace API.Endpoints;

public class SongEndpoints: IEndpointDefinition
{
    public void RegisterEndpoints(WebApplication app)
    {
        var songs = app.MapGroup("/api/songs");

        songs.MapGet("/", GetAllSongs);
        
        songs.MapGet("/{id}", GetSongById);
    }
    
    private static async Task<IResult> GetAllSongs(IMediator mediator, CancellationToken cancellationToken)
    {
        var getAllSongs = new GetAllSongs.Query();
        var songs = await mediator.Send(getAllSongs, cancellationToken);
        return TypedResults.Ok(songs);
    }
    
    private static async Task<IResult> GetSongById(IMediator mediator, int id, CancellationToken cancellationToken)
    {
        var getSong = new GetSongById.Query { Id = id };
        var song = await mediator.Send(getSong, cancellationToken);
        return TypedResults.Ok(song);
    }
}