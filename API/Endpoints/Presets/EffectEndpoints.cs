using API.Interfaces;
using Application.Core;
using Application.Presets.Effects.DTOs;
using Application.Presets.Effects.Queries;
using Application.Songs.Queries;
using MediatR;

namespace API.Endpoints.Presets;

public class EffectEndpoints: IEndpointDefinition
{
    public void RegisterEndpoints(WebApplication app)
    {
        var effects = app.MapGroup("/api/presets/effects");
        
        effects.MapGet("/", GetAllEffects)
            .WithName("GetAllEffects")
            .Produces<List<EffectsQueryDto>>(200, "application/json")
            .Produces<ErrorMessage>(400, "application/json");
        
        // effects.MapGet("/{effectName}/{id}", GetEffectById)
        //     .WithName("GetEffectById")
        //     .Produces<EffectQueryDto>(200, "application/json")
        //     .Produces<ErrorMessage>(400, "application/json");
    }
    
    private static async Task<IResult> GetAllEffects(IMediator mediator, IHandleResult handleResult,
        CancellationToken cancellationToken)
    {
        var getAllSongs = new GetAllEffects.Query();
        return handleResult.Handle(await mediator.Send(getAllSongs, cancellationToken));
    }
}