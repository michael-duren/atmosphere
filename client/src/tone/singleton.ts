import * as Tone from 'tone';
import MelodicSynth from './classes/MelodicSynth.ts';
import DrumKit from './classes/DrumKit.ts';
import BassSynth from './classes/BassSynth.ts';

const distortion = new Tone.Distortion(0);
const distortionGain = new Tone.Gain(1);

const reverb = new Tone.Reverb(0.5);

const delay = new Tone.FeedbackDelay(0.5);

const volume = new Tone.Volume(Tone.dbToGain(1));

const bassSynth = new BassSynth();
bassSynth.modFilter.chain(
  distortion,
  distortionGain,
  reverb,
  volume,
  Tone.Destination
);

const melodicSynth = new MelodicSynth();
melodicSynth.filterTwo.chain(
  distortion,
  distortionGain,
  reverb,
  delay,
  volume,
  Tone.Destination
);

const drumKit = new DrumKit();
drumKit.output.chain(
  distortion,
  distortionGain,
  reverb,
  delay,
  volume,
  Tone.Destination
);

export {
  distortion,
  distortionGain,
  reverb,
  delay,
  volume,
  bassSynth,
  melodicSynth,
  drumKit,
};
