using FluentValidation.Results;

namespace Application.Core;

public static class ParseErrorList
{
    public static List<string> ToErrorList(List<ValidationFailure> errors)
    {
        return errors
            .Select(error => error.ErrorMessage)
            .ToList();
    }
}