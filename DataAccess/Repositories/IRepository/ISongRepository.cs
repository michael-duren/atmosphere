using Domain;

namespace Persistence.Repositories.IRepository;

public interface ISongRepository
{
    Task<ICollection<Song>> GetAllSongs();
    Task<Song> GetSongById(int songId);
    Task<Song> CreateSong(Song newSong);
    Task<Song> UpdateSong(int songId, Song newSong);
    Task DeleteSong(int songId);
}