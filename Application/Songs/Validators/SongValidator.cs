using Application.Songs.DTOs;
using DataAccess;
using Domain;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace Application.Songs.Validators;

public class SongValidator : AbstractValidator<SongCreateDto>
{
    private readonly AppDbContext _context;

    public SongValidator(AppDbContext context)
    {
        _context = context;
        RuleFor(x => x.SongName).NotEmpty().MustAsync(BeUniqueSongName).WithMessage("Song name already exists");
        RuleFor(x => x.Bpm).NotEmpty();
        RuleFor(x => x.MasterVolume).NotEmpty();
        RuleFor(x => x.BassSynth).NotEmpty();
        RuleFor(x => x.MelodicSynth).NotEmpty();
        RuleFor(x => x.MelodicPattern).NotEmpty();
        RuleFor(x => x.KitPattern).NotEmpty();
        RuleFor(x => x.Distortion).NotEmpty();
        RuleFor(x => x.Reverb).NotEmpty();
        RuleFor(x => x.Delay).NotEmpty();
    }


    private async Task<bool> BeUniqueSongName(string songName, CancellationToken cancellationToken)
    {
        var songResult =
            await _context.Songs.FirstOrDefaultAsync(s => s.SongName == songName, cancellationToken: cancellationToken);
        return songResult is null;
    }
}