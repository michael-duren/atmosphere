namespace Application.Accounts.DTOs;

public class UserDto
{
    public string Username { get; set; } = null!;
    public string Token { get; set; } = null!;
    public string? Image { get; set; }
}