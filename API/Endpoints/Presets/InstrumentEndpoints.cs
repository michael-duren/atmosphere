using API.Interfaces;
using Application.Core;
using Application.Presets.Instruments.Commands;
using Application.Presets.Instruments.DTOs;
using Application.Presets.Instruments.Queries;
using MediatR;

namespace API.Endpoints.Presets;

public class InstrumentEndpoints : IEndpointDefinition
{
    public void RegisterEndpoints(WebApplication app)
    {
        var instruments = app.MapGroup("/api/presets/instruments");

        instruments.MapGet("/", GetAllInstruments)
            .WithName("GetAllInstruments")
            .Produces<SynthsQueryDto>(200, "application/json")
            .Produces<ErrorMessage>(400, "application/json");

        /*
         * POST methods
         */
        instruments.MapPost("/melodic", CreateMelodicSynth)
            .WithName("CreateDrumInstrument")
            .Produces<SynthsQueryDto>(200, "application/json")
            .Produces<ErrorMessage>(400, "application/json");
        instruments.MapPost("/bass", CreateBassSynth)
            .WithName("CreateBassSynth")
            .Produces<SynthsQueryDto>(200, "application/json")
            .Produces<ErrorMessage>(400, "application/json");

        /*
         * PUT methods
         */
        instruments.MapPut("/melodic/{id}", UpdateMelodicSynth)
            .WithName("UpdateMelodicSynth")
            .Produces<SynthsQueryDto>(200, "application/json")
            .Produces<ErrorMessage>(400, "application/json");

        instruments.MapPut("/bass/{id}", UpdateBassSynth)
            .WithName("UpdateBassSynth")
            .Produces<SynthsQueryDto>(200, "application/json")
            .Produces<ErrorMessage>(400, "application/json");

        /*
         * DELETE methods
         */
        // instruments.MapDelete()
        //     .WithName("DeleteInstrument")
        //     .Produces<SynthsQueryDto>(200, "application/json")
        //     .Produces<ErrorMessage>(400, "application/json");
    }

    private static async Task<IResult> UpdateBassSynth(IMediator mediator, IHandleResult handleResult,
        BassSynthPresetDto synthQueryDto,
        int id,
        CancellationToken cancellationToken)
    {
        var updateBassSynth = new UpdateSynth.Command
        {
            SynthQueryDto = synthQueryDto,
            Type = "bass",
            Id = id
        };
        return handleResult.Handle(await mediator.Send(updateBassSynth, cancellationToken));
    }

    private static async Task<IResult> UpdateMelodicSynth(IMediator mediator, IHandleResult handleResult,
        MelodicSynthPresetDto synthQueryDto,
        int id,
        CancellationToken cancellationToken)
    {
        var updateMelodicSynth = new UpdateSynth.Command
        {
            SynthQueryDto = synthQueryDto,
            Type = "melodic",
            Id = id
        };
        return handleResult.Handle(await mediator.Send(updateMelodicSynth, cancellationToken));
    }

    private static async Task<IResult> CreateMelodicSynth(IMediator mediator, IHandleResult handleResult,
        MelodicSynthPresetDto synthQueryDto,
        CancellationToken cancellationToken)
    {
        var createMelodicSynth = new CreateSynth.Command
        {
            SynthQueryDto = synthQueryDto,
            Type = "melodic"
        };
        return handleResult.Handle(await mediator.Send(createMelodicSynth, cancellationToken));
    }

    private static async Task<IResult> CreateBassSynth(IMediator mediator, IHandleResult handleResult,
        BassSynthPresetDto synthQueryDto,
        CancellationToken cancellationToken)
    {
        var createMelodicSynth = new CreateSynth.Command
        {
            SynthQueryDto = synthQueryDto,
            Type = "bass"
        };
        return handleResult.Handle(await mediator.Send(createMelodicSynth, cancellationToken));
    }

    private static async Task<IResult> GetAllInstruments(IMediator mediator, IHandleResult handleResult,
        CancellationToken cancellationToken)
    {
        var getAllInstruments = new GetAllInstruments.Query();
        return handleResult.Handle(await mediator.Send(getAllInstruments, cancellationToken));
    }
}