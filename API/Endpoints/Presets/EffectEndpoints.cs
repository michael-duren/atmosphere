using API.Interfaces;
using Application.Core;
using Application.Presets.Effects.Commands;
using Application.Presets.Effects.DTOs;
using Application.Presets.Effects.Queries;
using MediatR;

namespace API.Endpoints.Presets;

public class EffectEndpoints : IEndpointDefinition
{
    public void RegisterEndpoints(WebApplication app)
    {
        var effects = app.MapGroup("/api/presets/effects");

        effects.MapGet("/", GetAllEffects)
            .WithName("GetAllEffects")
            .Produces<List<EffectsQueryDto>>(200, "application/json")
            .Produces<ErrorMessage>(400, "application/json");

        effects.MapGet("/{effectName}/{id}", GetEffectById)
            .WithName("GetEffectById")
            .Produces<EffectQueryDto>(200, "application/json")
            .Produces<ErrorMessage>(400, "application/json");

        effects.MapDelete("/{effectName}/{id}", DeleteEffectById)
            .WithName("DeleteEffectById")
            .Produces(204)
            .Produces<ErrorMessage>(400, "application/json");

        /*
         * POST methods for creating new effects
         */
        effects.MapPost("/distortion", CreateDistortionPreset)
            .WithName("CreateDistortionPreset")
            .Produces<DistortionQueryDto>(201, "application/json")
            .Produces<ErrorMessage>(400, "application/json");
        effects.MapPost("/reverb", CreateReverbPreset)
            .WithName("CreateReverbPreset")
            .Produces<ReverbQueryDto>(201, "application/json")
            .Produces<ErrorMessage>(400, "application/json");
        effects.MapPost("/delay", CreateDelayPreset)
            .WithName("CreateDelayPreset")
            .Produces<DelayQueryDto>(201, "application/json")
            .Produces<ErrorMessage>(400, "application/json");

        /*
         * PUT methods for updating effects
         */
        effects.MapPut("/distortion/{id}", UpdateDistortionPreset)
            .WithName("UpdateDistortionPreset")
            .Produces(200)
            .Produces<ErrorMessage>(400, "application/json");

        effects.MapPut("/reverb/{id}", UpdateReverbPreset)
            .WithName("UpdateReverbPreset")
            .Produces(200)
            .Produces<ErrorMessage>(400, "application/json");
        effects.MapPut("/delay/{id}", UpdateDelayPreset)
            .WithName("UpdateDelayPreset")
            .Produces(200)
            .Produces<ErrorMessage>(400, "application/json");
    }

    private static async Task<IResult> UpdateDelayPreset(IMediator mediator, IHandleResult handleResult,
        DelayQueryDto delayQueryDto, CancellationToken cancellationToken, int id)
    {
        var updateDelayPreset = new UpdateEffect.Command
        {
            Type = "delay",
            Effect = delayQueryDto,
            Id = id
        };
        return handleResult.Handle(await mediator.Send(updateDelayPreset, cancellationToken));
    }

    private static async Task<IResult> UpdateReverbPreset(IMediator mediator, IHandleResult handleResult,
        ReverbQueryDto reverbQueryDto, CancellationToken cancellationToken, int id)
    {
        var updateReverbPreset = new UpdateEffect.Command
        {
            Type = "reverb",
            Effect = reverbQueryDto,
            Id = id
        };
        return handleResult.Handle(await mediator.Send(updateReverbPreset, cancellationToken));
    }

    private static async Task<IResult> UpdateDistortionPreset(IMediator mediator, IHandleResult handleResult,
        DistortionQueryDto distortionQueryDto, CancellationToken cancellationToken, int id)
    {
        var updateDistortionPreset = new UpdateEffect.Command
        {
            Type = "distortion",
            Effect = distortionQueryDto,
            Id = id
        };
        return handleResult.Handle(await mediator.Send(updateDistortionPreset, cancellationToken));
    }

    private async Task<IResult> CreateDelayPreset(IMediator mediator, IHandleResult handleResult,
        DelayQueryDto delayQueryDto, CancellationToken cancellationToken)
    {
        var createdDelayPreset = new CreateEffect.Command
        {
            Type = "delay",
            EffectQueryDto = delayQueryDto
        };
        return handleResult.Handle(await mediator.Send(createdDelayPreset, cancellationToken));
    }

    private async Task<IResult> CreateReverbPreset(IMediator mediator, IHandleResult handleResult,
        ReverbQueryDto reverbQueryDto, CancellationToken cancellationToken)
    {
        var createdReverbPreset = new CreateEffect.Command
        {
            Type = "reverb",
            EffectQueryDto = reverbQueryDto
        };
        return handleResult.Handle(await mediator.Send(createdReverbPreset, cancellationToken));
    }

    private async Task<IResult> CreateDistortionPreset(IMediator mediator, IHandleResult handleResult,
        DistortionQueryDto distortionQueryDto, CancellationToken cancellationToken)
    {
        var createdDistortionPreset = new CreateEffect.Command
        {
            Type = "distortion",
            EffectQueryDto = distortionQueryDto
        };
        return handleResult.Handle(await mediator.Send(createdDistortionPreset, cancellationToken));
    }

    private static async Task<IResult> DeleteEffectById(string effectName, int id, IMediator mediator,
        IHandleResult handleResult,
        CancellationToken cancellationToken)
    {
        var deleteEffectById = new DeleteEffectById.Command
        {
            Id = id,
            Type = effectName
        };
        return handleResult.Handle(await mediator.Send(deleteEffectById, cancellationToken));
    }

    private static async Task<IResult> GetEffectById(string effectName, int id, IMediator mediator,
        IHandleResult handleResult,
        CancellationToken cancellationToken)
    {
        var getEffectById = new GetEffectById.Query
        {
            Id = id,
            Type = effectName
        };
        return handleResult.Handle(await mediator.Send(getEffectById, cancellationToken));
    }

    private static async Task<IResult> GetAllEffects(IMediator mediator, IHandleResult handleResult,
        CancellationToken cancellationToken)
    {
        var getAllSongs = new GetAllEffects.Query();
        return handleResult.Handle(await mediator.Send(getAllSongs, cancellationToken));
    }
}