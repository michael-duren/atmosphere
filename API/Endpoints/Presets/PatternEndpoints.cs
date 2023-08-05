using API.Interfaces;
using Application.Core;
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
    }

    private static async Task<IResult> GetAllPatterns(IMediator mediator, IHandleResult handleResult,
        CancellationToken cancellationToken)
    {
        var getAllPatterns = new GetAllPatterns.Query();
        return handleResult.Handle(await mediator.Send(getAllPatterns, cancellationToken));
    }
}