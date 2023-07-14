using Domain;
using FluentValidation;

namespace Application.Songs.Validators;

public class SongValidator : AbstractValidator<Song>
{
    public SongValidator()
    {
        RuleFor(x => x.SongName).NotEmpty();
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
}