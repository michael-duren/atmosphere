using System.Runtime.InteropServices.JavaScript;

namespace Application.Core;

public class ErrorMessage
{
    public List<string> Messages { get; set; }

    public ErrorMessage(List<string> errorMessage)
    {
        Messages = errorMessage;
    }
}