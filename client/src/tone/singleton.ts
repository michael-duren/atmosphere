import * as Tone from 'tone';
import MelodicSynth from './classes/MelodicSynth.ts';
import DrumKit from './classes/DrumKit.ts';
import BassSynth from './classes/BassSynth.ts';
import MelodicPattern from './classes/MelodicPattern.ts';

interface AppToneContext {
  distortion: Tone.Distortion;
  distortionFilter: Tone.Filter;
  reverb: Tone.Reverb;
  delay: Tone.FeedbackDelay;
  volume: Tone.Volume;
  bassSynth: BassSynth;
  melodicSynth: MelodicSynth;
  drumKit: DrumKit;
  melodicPattern: MelodicPattern;
}

export const toneCleanup = async ({
  distortion,
  distortionFilter,
  reverb,
  delay,
  volume,
  bassSynth,
  melodicSynth,
  drumKit,
  melodicPattern,
}: AppToneContext) => {
  await Tone.Transport.cancel();
  await Tone.Transport.stop();

  await distortion.dispose();
  await distortionFilter.dispose();
  await reverb.dispose();
  await delay.dispose();
  await volume.dispose();
  await bassSynth.synth.dispose();
  await bassSynth.filter.dispose();
  await bassSynth.modFilter.dispose();
  await melodicSynth.synth.dispose();
  await melodicSynth.filterTwo.dispose();
  await melodicSynth.chorus.dispose();
  await melodicSynth.lfoFilter.dispose();
  await melodicPattern.melodyPattern.dispose();
  await melodicPattern.bassPattern.dispose();
  await drumKit.bd.sampler.dispose();
  await drumKit.sd.sampler.dispose();
  await drumKit.cl.sampler.dispose();
  await drumKit.ch.sampler.dispose();
};

export const instantiateTone = () => {
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
  bassSynth.synth.envelope.sustain = 0.5;
  bassSynth.modFilter.chain(distortion, distortionFilter, reverb, volume);

  const melodicSynth = new MelodicSynth();
  melodicSynth.filterTwo.chain(
    distortion,
    distortionFilter,
    reverb,
    delay,
    volume
  );
  melodicSynth.lfoFilter.start(0);

  const drumKit = new DrumKit();
  drumKit.output.chain(distortion, distortionFilter, reverb, delay, volume);

  /*
   * Patterns
   */

  const melodicPattern = new MelodicPattern(melodicSynth, bassSynth);
  melodicPattern.melodyPattern.start(0);
  melodicPattern.bassPattern.start(0);

  volume.toDestination();

  return {
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
};

const {
  distortion,
  distortionFilter,
  reverb,
  delay,
  volume,
  bassSynth,
  melodicSynth,
  drumKit,
  melodicPattern,
} = instantiateTone();

export const toneState = {
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
