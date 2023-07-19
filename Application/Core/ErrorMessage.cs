using System.Runtime.InteropServices.JavaScript;

namespace Application.Core;

public class ErrorMessage
{
    public List<string> Error { get; set; }

    public ErrorMessage(List<string> errorMessage)
    {
        Error = errorMessage;
    }
}