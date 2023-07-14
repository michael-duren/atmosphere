using Application.Accounts.DTOs;
using Domain;
using FluentValidation;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Application.Accounts.Validators;

public class RegisterValidator : AbstractValidator<RegisterDto>
{
    private readonly UserManager<AppUser> _userManager;

    public RegisterValidator(UserManager<AppUser> userManager)
    {
        _userManager = userManager;
        var regex = @"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$";

        RuleFor(x => x.Username)
            .NotEmpty()
            .MinimumLength(6)
            .WithMessage("Username must have at least 6 characters")
            .MustAsync(BeUniqueUsername)
            .WithMessage("Username already exists");
        RuleFor(x => x.Email)
            .NotEmpty()
            .EmailAddress()
            .WithMessage("Please enter a valid email address")
            .MustAsync(BeUniqueEmail)
            .WithMessage("Email already exists");
        RuleFor(x => x.Password)
            .NotEmpty()
            .Matches(regex)
            .WithMessage(
                "Password must contain an uppercase and lowercase letter, a special character, a number, and must be 8 characters or more"
            );
    }

    private async Task<bool> BeUniqueEmail(string email, CancellationToken cancellationToken)
    {
        var user = await _userManager.FindByEmailAsync(email);
        return user is null;
    }

    private async Task<bool> BeUniqueUsername(
        string userName,
        CancellationToken cancellationToken
    )
    {
        var users = await _userManager.Users.ToListAsync();
        var user = users.Find(u => u.UserName == userName);
        return user is null;
    }
}