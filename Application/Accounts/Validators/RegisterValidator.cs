using Application.Accounts.DTOs;
using FluentValidation;

namespace Application.Accounts.Validators;

public class RegisterValidator: AbstractValidator<RegisterDto>
{
   public RegisterValidator()
   {
      RuleFor(x => x.Email).NotEmpty().EmailAddress();
      RuleFor(x => x.Password).NotEmpty().MinimumLength(8);
      RuleFor(x => x.Username).NotEmpty();
   } 
}