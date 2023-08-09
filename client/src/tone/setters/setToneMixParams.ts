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
import * as Tone from 'tone';
import { bottomRange } from '../../utils/number.ts';
import { Delay, Distortion, Reverb } from '../../models/song.ts';

/*
 * Effects
 */

export const setToneDistortion = (val: Distortion) => {
  distortion.wet.value = val.mix;
  distortion.distortion = val.amount;
  distortionFilter.frequency.value = val.filterFrequency;
};

export const setToneDistortionMix = (val: number) => {
  distortion.wet.value = val;
};

export const setToneDistortionAmount = (val: number) => {
  distortion.distortion = val;
};

export const setToneDistortionFilter = (val: number) => {
  distortionFilter.frequency.value = val;
};

export const setToneReverb = (val: Reverb) => {
  reverb.wet.value = val.mix;
  reverb.decay = val.decay;
  reverb.preDelay = val.preDelay;
};

export const setToneReverbMix = (val: number) => {
  reverb.wet.value = val;
};

export const setToneReverbDecay = (val: number) => {
  reverb.decay = val;
};

export const setToneDelay = (val: Delay) => {
  delay.wet.value = val.mix;
  delay.delayTime.value = val.time;
  delay.feedback.value = val.feedback;
};

export const setToneReverbPreDelay = (val: number) => {
  reverb.preDelay = val;
};

export const setToneDelayMix = (val: number) => {
  delay.wet.value = val;
};

export const setToneDelayTime = (val: number) => {
  delay.delayTime.value = val;
};

export const setToneDelayFeedback = (val: number) => {
  delay.feedback.value = val;
};

/*
 * Volume
 */

export const setToneMasterVolume = (num: number) => {
  volume.volume.value = Tone.gainToDb(bottomRange(num));
};
export const setToneDrumVolume = (num: number) => {
  drumKit.bd.sampler.volume.value = Tone.gainToDb(bottomRange(num));
  drumKit.sd.sampler.volume.value = Tone.gainToDb(bottomRange(num));
  drumKit.cl.sampler.volume.value = Tone.gainToDb(bottomRange(num));
  drumKit.ch.sampler.volume.value = Tone.gainToDb(bottomRange(num));
};
export const setToneBassVolume = (num: number) => {
  bassSynth.synth.volume.value = Tone.gainToDb(bottomRange(num));
};

export const setToneMelodyVolume = (num: number) => {
  melodicSynth.synth.volume.value = Tone.gainToDb(bottomRange(num));
};
