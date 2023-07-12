using Microsoft.AspNetCore.Identity;

namespace Domain;

public class AppUser : IdentityUser
{
    public ICollection<Song> Songs { get; set; } = new List<Song>();
    public string? Image { get; set; }
}