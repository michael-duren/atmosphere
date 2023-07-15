using API.Interfaces;
using Application.Core;

namespace API.Endpoints.Utility;

public class HandleResult : IHandleResult
{
    public IResult Handle<T>(Result<T>? result)
    {
        if (result is null) return TypedResults.NotFound();

        if (result.IsSuccess && result.Value is not null)
            return TypedResults.Ok(result.Value);

        if (result.IsSuccess && result.Value is null)
            return TypedResults.NoContent();

        return TypedResults.BadRequest(result.Error);
    }
}