using API.Interfaces;
using Application.Core;
using Application.Presets.Patterns.Commands;
using Application.Presets.Patterns.DTOs;
using Application.Presets.Patterns.Queries;
using MediatR;

namespace API.Endpoints.Presets;

public class PatternEndpoints : IEndpointDefinition
{
    public void RegisterEndpoints(WebApplication app)
    {
        var patterns = app.MapGroup("/api/presets/patterns");

        patterns.MapGet("/", GetAllPatterns)
            .WithName("GetAllPatterns")
            .Produces<PatternsQueryDto>(200, "application/json")
            .Produces<ErrorMessage>(400, "application/json");

        patterns.MapDelete("/{patternType}/{id}", DeletePatternById)
            .WithName("DeletePatternById")
            .Produces(200)
            .Produces<ErrorMessage>(400, "application/json");

        /*
         * POST requests
         */
        patterns.MapPost("/melodic", CreateMelodicPattern)
            .WithName("CreateMelodicPattern")
            .Accepts<MelodicPatternPresetDto>("application/json")
            .Produces<MelodicPatternPresetDto>(200, "application/json")
            .Produces<ErrorMessage>(400, "application/json");
        patterns.MapPost("/kit", CreateKitPattern)
            .WithName("CreateKitPattern")
            .Accepts<KitPatternPresetDto>("application/json")
            .Produces<KitPatternPresetDto>(200, "application/json")
            .Produces<ErrorMessage>(400, "application/json");

        /*
         * PUT requests
         */
        patterns.MapPut("/melodic/{id}", UpdateMelodicPattern)
            .WithName("UpdateMelodicPattern")
            .Accepts<MelodicPatternPresetDto>("application/json")
            .Produces<MelodicPatternPresetDto>(200, "application/json")
            .Produces<ErrorMessage>(400, "application/json");
        patterns.MapPut("/kit/{id}", UpdateKitPattern)
            .WithName("UpdateKitPattern")
            .Accepts<KitPatternPresetDto>("application/json")
            .Produces<KitPatternPresetDto>(200, "application/json")
            .Produces<ErrorMessage>(400, "application/json");
    }

    private static async Task<IResult> DeletePatternById(IMediator mediator, IHandleResult handleResult,
        string patternType, int id,
        CancellationToken cancellationToken)
    {
        var deletePattern = new DeletePattern.Command
        {
            Id = id,
            Type = patternType
        };
        return handleResult.Handle(await mediator.Send(deletePattern, cancellationToken));
    }

    private static async Task<IResult> UpdateKitPattern(IMediator mediator, IHandleResult handleResult,
        MelodicPatternPresetDto patternQueryDto, int id,
        CancellationToken cancellationToken)
    {
        var updateKitPattern = new UpdatePattern.Command
        {
            PatternsQueryDto = patternQueryDto,
            Type = "kit",
            Id = id
        };
        return handleResult.Handle(await mediator.Send(updateKitPattern, cancellationToken));
    }

    private static async Task<IResult> UpdateMelodicPattern(IMediator mediator, IHandleResult handleResult,
        MelodicPatternPresetDto patternQueryDto, int id,
        CancellationToken cancellationToken)
    {
        var updateMelodicPattern = new UpdatePattern.Command
        {
            PatternsQueryDto = patternQueryDto,
            Type = "melodic",
            Id = id
        };
        return handleResult.Handle(await mediator.Send(updateMelodicPattern, cancellationToken));
    }

    private static async Task<IResult> CreateMelodicPattern(IMediator mediator, IHandleResult handleResult,
        MelodicPatternPresetDto patternQueryDto,
        CancellationToken cancellationToken)
    {
        var createMelodicPattern = new CreatePattern.Command
        {
            PatternsQueryDto = patternQueryDto,
            Type = "melodic"
        };
        return handleResult.Handle(await mediator.Send(createMelodicPattern, cancellationToken));
    }

    private static async Task<IResult> CreateKitPattern(IMediator mediator, IHandleResult handleResult,
        KitPatternPresetDto patternQueryDto,
        CancellationToken cancellationToken)
    {
        var createKitPattern = new CreatePattern.Command
        {
            PatternsQueryDto = patternQueryDto,
            Type = "kit"
        };
        return handleResult.Handle(await mediator.Send(createKitPattern, cancellationToken));
    }

    private static async Task<IResult> GetAllPatterns(IMediator mediator, IHandleResult handleResult,
        CancellationToken cancellationToken)
    {
        var getAllPatterns = new GetAllPatterns.Query();
        return handleResult.Handle(await mediator.Send(getAllPatterns, cancellationToken));
    }
}