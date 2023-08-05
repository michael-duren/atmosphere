using API.Interfaces;
using Application.Core;
using Application.Presets.Instruments.DTOs;
using Application.Presets.Instruments.Queries;
using MediatR;

namespace API.Endpoints.Presets;

public class InstrumentEndpoints : IEndpointDefinition
{
    public void RegisterEndpoints(WebApplication app)
    {
        var effects = app.MapGroup("/api/presets/instruments");

        effects.MapGet("/", GetAllInstruments)
            .WithName("GetAllInstruments")
            .Produces<InstrumentsQueryDto>(200, "application/json")
            .Produces<ErrorMessage>(400, "application/json");
    }

    private static async Task<IResult> GetAllInstruments(IMediator mediator, IHandleResult handleResult,
        CancellationToken cancellationToken)
    {
        var getAllInstruments = new GetAllInstruments.Query();
        return handleResult.Handle(await mediator.Send(getAllInstruments, cancellationToken));
    }
}