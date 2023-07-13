using Domain;
using Microsoft.EntityFrameworkCore;
using Persistence.Repositories.IRepository;

namespace Persistence.Repositories;

public class SongRepository : ISongRepository
{
    private readonly AppDbContext _context;

    public SongRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<ICollection<Song>> GetAllSongs()
    {
        return await _context.Songs.ToListAsync();
    }

    public async Task<Song> GetSongById(int songId)
    {
        return await _context.Songs.FirstAsync(s => s.Id == songId);
    }

    public async Task<Song> CreateSong(Song newSong)
    {
        _context.Songs.Add(newSong);
        await _context.SaveChangesAsync();
        return newSong;
    }

    public async Task<Song> UpdateSong(int songId, Song updatedSong)
    {
        _context.Songs.Update(updatedSong);
        await _context.SaveChangesAsync();
        return updatedSong;
    }

    public async Task DeleteSong(int songId)
    {
        var songToDelete = await _context.Songs.FindAsync(songId);
        if (songToDelete != null) _context.Songs.Remove(songToDelete);
        await _context.SaveChangesAsync();
    }
}