import * as Tone from 'tone';
import { Song } from '../../models/song.ts';
import {
  bassSynth,
  delay,
  distortion,
  distortionFilter,
  drumKit,
  melodicSynth,
  reverb,
  volume,
} from '../singleton.ts';

export const setToneParamsOnLoad = (songToLoad: Song) => {
  /*
   * Top Level Params
   */
  Tone.Transport.bpm.value = songToLoad.bpm;

  volume.volume.value = songToLoad.masterVolume; // master volume

  // drum volume
  drumKit.bd.sampler.volume.value = songToLoad.drumVolume;
  drumKit.sd.sampler.volume.value = songToLoad.drumVolume;
  drumKit.cl.sampler.volume.value = songToLoad.drumVolume;
  drumKit.ch.sampler.volume.value = songToLoad.drumVolume;

  bassSynth.synth.volume.value = songToLoad.bassVolume; // bass volume
  melodicSynth.synth.volume.value = songToLoad.melodicVolume; // melodic volume

  /*
   * Effects
   */
  distortion.wet.value = songToLoad.distortion.mix;
  distortion.distortion = songToLoad.distortion.amount;
  distortionFilter.frequency.value = songToLoad.distortion.filter;

  reverb.wet.value = songToLoad.reverb.mix;
  reverb.decay = songToLoad.reverb.decay;
  reverb.preDelay = songToLoad.reverb.preDelay;

  delay.wet.value = songToLoad.delay.mix;
  delay.delayTime.value = songToLoad.delay.time;
  delay.feedback.value = songToLoad.delay.feedback;

  /*
   * Melodic Synth Params
   */
  melodicSynth.synth.envelope.attack = songToLoad.melodicSynth.attack;
  melodicSynth.synth.envelope.decay = songToLoad.melodicSynth.decay;
  melodicSynth.synth.envelope.sustain = songToLoad.melodicSynth.sustain;
  melodicSynth.synth.envelope.release = songToLoad.melodicSynth.release;
  melodicSynth.synth.oscillator.type = songToLoad.melodicSynth.waveform;
  melodicSynth.chorus.wet.value = songToLoad.melodicSynth.chorus;
  melodicSynth.filter.frequency.value = songToLoad.melodicSynth.filterFrequency;
  melodicSynth.filter.type = songToLoad.melodicSynth.filterType;
  melodicSynth.synth.modulationIndex.value = songToLoad.melodicSynth.metal;
  melodicSynth.lfoFilter.frequency.value = songToLoad.melodicSynth.lfoFrequency;
  melodicSynth.lfoFilter.type = songToLoad.melodicSynth.lfoShape;
  melodicSynth.lfoFilter.min = songToLoad.melodicSynth.filterMod;

  /*
   * Bass Synth Params
   */
  bassSynth.synth.envelope.attack = songToLoad.bassSynth.attack;
  bassSynth.synth.envelope.decay = songToLoad.bassSynth.decay;
  bassSynth.synth.oscillator.type = 'fatsine2';
  bassSynth.filter.frequency.value = songToLoad.bassSynth.filterFrequency;
};
