import { delay, distortion, distortionFilter, reverb } from '../singleton.ts';

export const setToneDistortionMix = (val: number) => {
  distortion.wet.value = val;
};

export const setToneDistortionAmount = (val: number) => {
  distortion.distortion = val;
};

export const setToneDistortionFilter = (val: number) => {
  distortionFilter.frequency.value = val;
};

export const setToneReverbMix = (val: number) => {
  reverb.wet.value = val;
};

export const setToneReverbDecay = (val: number) => {
  reverb.decay = val;
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
