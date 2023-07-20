import * as Tone from 'tone';
import MelodicSynth from './classes/MelodicSynth.ts';

const distortion = new Tone.Distortion(0);
const distortionGain = new Tone.Gain(1);

const reverb = new Tone.Reverb(0.5);

const delay = new Tone.FeedbackDelay(0.5);

const volume = new Tone.Volume(Tone.dbToGain(1));

const melodySynth = new MelodicSynth();
melodySynth.filterTwo.chain(
  distortion,
  distortionGain,
  reverb,
  delay,
  volume,
  Tone.Destination
);

export { distortion, distortionGain, reverb, delay, volume };
