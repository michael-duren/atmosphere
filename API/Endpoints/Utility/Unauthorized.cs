using System.Text.Json;
using Application.Core;

namespace API.Endpoints.Utility;

public class Unauthorized: IResult
{
    private readonly ErrorMessage? _message;

    public Unauthorized(ErrorMessage? message)
    {
        _message = message;
    }
    
    public async Task ExecuteAsync(HttpContext httpContext)
    {
        httpContext.Response.StatusCode = StatusCodes.Status401Unauthorized;
        httpContext.Response.ContentType = "application/json";

        var options = new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase
        };

        var jsonResponse = JsonSerializer.Serialize(_message, options);
        await httpContext.Response.WriteAsync(jsonResponse);
    }
}