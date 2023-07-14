using Application.Accounts.DTOs;
using FluentValidation;

namespace Application.Accounts.Validators;

public class LoginValidator: AbstractValidator<LoginDto>
{
    public LoginValidator()
    {
        RuleFor(x => x.Email).NotEmpty().EmailAddress();
        RuleFor(x => x.Password).NotEmpty().MinimumLength(8);
    } 
}