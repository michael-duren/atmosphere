import * as Tone from 'tone';
import MelodicSynth from './classes/MelodicSynth.ts';
import DrumKit from './classes/DrumKit.ts';
import BassSynth from './classes/BassSynth.ts';
import MelodicPattern from './classes/MelodicPattern.ts';

/*
 * Effects & Volume
 */
const distortion = new Tone.Distortion(0);
const distortionFilter = new Tone.Filter(20_000, 'lowpass');

const reverb = new Tone.Reverb(0.5);

const delay = new Tone.FeedbackDelay(0.5);

const volume = new Tone.Volume(Tone.dbToGain(1));

/*
 * Instruments
 */

const bassSynth = new BassSynth();
bassSynth.modFilter.chain(distortion, distortionFilter, reverb, volume);

const melodicSynth = new MelodicSynth();
melodicSynth.synth.chain(distortion, distortionFilter, reverb, delay, volume);

const drumKit = new DrumKit();
drumKit.output.chain(distortion, distortionFilter, reverb, delay, volume);

/*
 * Patterns
 */

const melodicPattern = new MelodicPattern(melodicSynth);
melodicPattern.pattern.start(0);

volume.toDestination();

export {
  distortion,
  distortionFilter,
  reverb,
  delay,
  volume,
  bassSynth,
  melodicSynth,
  drumKit,
  melodicPattern,
};
