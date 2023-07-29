using Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;

namespace Application.Services;

public class RefreshTokenService
{
    private readonly TokenService _tokenService;
    private readonly UserManager<AppUser> _userManager;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public RefreshTokenService(TokenService tokenService, UserManager<AppUser> userManager, IHttpContextAccessor httpContextAccessor)
    {
        _tokenService = tokenService;
        _userManager = userManager;
        _httpContextAccessor = httpContextAccessor;
    }
    
    public async Task SetRefreshToken(AppUser user)
    {
        var refreshToken = _tokenService.GenerateRefreshToken();
        
        user.RefreshTokens.Add(refreshToken);
    
        await _userManager.UpdateAsync(user);
    
        var response = _httpContextAccessor.HttpContext?.Response;
        response?.Cookies.Append("RefreshToken", refreshToken.Token, new CookieOptions
        {
            // refresh token is not accessible by javascript
            HttpOnly = true,
            Expires = DateTime.UtcNow.AddDays(30)
            
        });
    }
}