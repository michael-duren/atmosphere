namespace API.Abstractions;

public interface IEndpointDefinition
{
    void RegisterEndpoints(WebApplication app);
}