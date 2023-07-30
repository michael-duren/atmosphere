import * as Tone from 'tone';
import { Song } from '../../models/song.ts';
import {
  bassSynth,
  delay,
  distortion,
  distortionFilter,
  drumKit,
  melodicPattern,
  melodicSynth,
  reverb,
  volume,
} from '../singleton.ts';

export const setToneParamsOnLoad = async (songToLoad: Song) => {
  // await toneCleanup(toneState);
  //
  // const {
  //   distortion,
  //   distortionFilter,
  //   reverb,
  //   delay,
  //   volume,
  //   bassSynth,
  //   melodicSynth,
  //   drumKit,
  //   melodicPattern,
  // } = instantiateTone();

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
  distortionFilter.frequency.value = songToLoad.distortion.filterFrequency;

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
  bassSynth.synth.oscillator.type = songToLoad.bassSynth.waveform;
  bassSynth.filter.frequency.value = songToLoad.bassSynth.filterFrequency;

  /*
   * Pattern Params
   */
  // melodic pattern
  melodicPattern.timeInterval = songToLoad.melodicPattern.timeInterval;
  melodicPattern.noteDuration = songToLoad.melodicPattern.noteDuration;
  melodicPattern.patternType = songToLoad.melodicPattern.patternType;
  melodicPattern.transpose = songToLoad.melodicPattern.transpose;
  melodicPattern.key = songToLoad.melodicPattern.key;
  melodicPattern.scale = songToLoad.melodicPattern.scale;
  melodicPattern.length = songToLoad.melodicPattern.length;
  melodicPattern.sequence = songToLoad.melodicPattern.sequence;
  melodicPattern.updatePattern();

  await Tone.start();
  console.log(volume);
};
