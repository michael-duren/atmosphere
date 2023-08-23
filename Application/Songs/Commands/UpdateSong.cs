using Application.Core;
using Application.Interfaces;
using AutoMapper;
using DataAccess;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Application.Songs.Commands;

public class UpdateSong
{
    public class Command : IRequest<Result<Unit>>
    {
        public int Id { get; set; }
        public Song Song { get; set; } = null!;
    }

    public class Handler : IRequestHandler<Command, Result<Unit>>
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;
        private readonly IUserAccessor _userAccessor;
        private readonly UserManager<AppUser> _userManager;

        public Handler(AppDbContext context, IMapper mapper, IUserAccessor userAccessor,
            UserManager<AppUser> userManager)
        {
            _context = context;
            _mapper = mapper;
            _userAccessor = userAccessor;
            _userManager = userManager;
        }

        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = _userManager.Users.FirstOrDefault(u =>
                u.UserName == _userAccessor.GetUsername()); // get user who is making request

            if (user is null) // if user is somehow null, return error
                return Result<Unit>.Failure(new ErrorMessage(new List<string>
                    { "You must be signed in to make this request" }));

            if (request.Song.MelodicSynth is null || request.Song.BassSynth is null ||
                request.Song.Distortion is null || request.Song.Reverb is null || request.Song.Delay is null ||
                request.Song.MelodicPattern is null || request.Song.KitPattern is null)
                return Result<Unit>.Failure(new ErrorMessage(new List<string>
                    { "Song is missing required fields" }));

            var song = await _context.Songs
                .Include(s => s.BassSynth)
                .Include(s => s.MelodicSynth)
                .Include(s => s.MelodicPattern)
                .Include(s => s.KitPattern)
                .Include(s => s.Distortion)
                .Include(s => s.Reverb)
                .Include(s => s.Delay)
                .FirstOrDefaultAsync(s => s.Id == request.Id, cancellationToken: cancellationToken); // find song by id

            if (song is null) // if song is null, return error
                return Result<Unit>.Failure(new ErrorMessage(new List<string>
                    { "Song not found" }));

            if (song.AppUserId !=
                user.Id) // if song's user id does not match the user's id who is making the request, return error
                return Result<Unit>.Failure(new ErrorMessage(new List<string>
                    { "The song does not exist or you are not allowed to edit it" }));

            /*
             * Update the song
             */
            song.MasterVolume = request.Song.MasterVolume;
            song.DrumVolume = request.Song.DrumVolume;
            song.BassVolume = request.Song.BassVolume;
            song.MelodicVolume = request.Song.MelodicVolume;
            song.Bpm = request.Song.Bpm;

            // Effects
            song.Distortion.Amount = request.Song.Distortion.Amount;
            song.Distortion.Mix = request.Song.Distortion.Mix;
            song.Distortion.FilterFrequency = request.Song.Distortion.FilterFrequency;

            song.Reverb.Mix = request.Song.Reverb.Mix;
            song.Reverb.Decay = request.Song.Reverb.Decay;
            song.Reverb.PreDelay = request.Song.Reverb.PreDelay;

            song.Delay.Mix = request.Song.Delay.Mix;
            song.Delay.Feedback = request.Song.Delay.Feedback;
            song.Delay.Time = request.Song.Delay.Time;

            // Bass Synth
            song.BassSynth.Attack = request.Song.BassSynth.Attack;
            song.BassSynth.Decay = request.Song.BassSynth.Decay;
            song.BassSynth.Sustain = request.Song.BassSynth.Sustain;
            song.BassSynth.Release = request.Song.BassSynth.Release;
            song.BassSynth.FilterFrequency = request.Song.BassSynth.FilterFrequency;
            song.BassSynth.Waveform = request.Song.BassSynth.Waveform;

            // Melodic Synth
            song.MelodicSynth.Attack = request.Song.MelodicSynth.Attack;
            song.MelodicSynth.Decay = request.Song.MelodicSynth.Decay;
            song.MelodicSynth.Sustain = request.Song.MelodicSynth.Sustain;
            song.MelodicSynth.Release = request.Song.MelodicSynth.Release;
            song.MelodicSynth.FilterFrequency = request.Song.MelodicSynth.FilterFrequency;
            song.MelodicSynth.Waveform = request.Song.MelodicSynth.Waveform;
            song.MelodicSynth.FilterMod = request.Song.MelodicSynth.FilterMod;
            song.MelodicSynth.FilterType = request.Song.MelodicSynth.FilterType;
            song.MelodicSynth.Metal = request.Song.MelodicSynth.Metal;
            song.MelodicSynth.Chorus = request.Song.MelodicSynth.Chorus;
            song.MelodicSynth.LfoFrequency = request.Song.MelodicSynth.LfoFrequency;
            song.MelodicSynth.LfoShape = request.Song.MelodicSynth.LfoShape;

            // Patterns             
            song.MelodicPattern.Key = request.Song.MelodicPattern.Key;
            song.MelodicPattern.Scale = request.Song.MelodicPattern.Scale;
            song.MelodicPattern.Sequence = request.Song.MelodicPattern.Sequence;
            song.MelodicPattern.PatternType = request.Song.MelodicPattern.PatternType;
            song.MelodicPattern.Transpose = request.Song.MelodicPattern.Transpose;
            song.MelodicPattern.TimeInterval = request.Song.MelodicPattern.TimeInterval;
            song.MelodicPattern.NoteDuration = request.Song.MelodicPattern.NoteDuration;
            song.MelodicPattern.Length = request.Song.MelodicPattern.Length;

            song.KitPattern.PatternLength = request.Song.KitPattern.PatternLength;
            song.KitPattern.BdSteps = request.Song.KitPattern.BdSteps;
            song.KitPattern.SdSteps = request.Song.KitPattern.SdSteps;
            song.KitPattern.ClSteps = request.Song.KitPattern.ClSteps;
            song.KitPattern.ChSteps = request.Song.KitPattern.ChSteps;


            bool result = await _context.SaveChangesAsync(cancellationToken) > 0; // save changes to db

            return result
                ? Result<Unit>.Success(Unit.Value)
                : Result<Unit>.Failure(new ErrorMessage(new List<string> { "Failed to update song" }));
        }
    }
}