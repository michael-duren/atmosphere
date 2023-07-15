using Application.Core;

namespace API.Interfaces;

public interface IHandleResult
{
    IResult Handle<T>(Result<T>? result);
}