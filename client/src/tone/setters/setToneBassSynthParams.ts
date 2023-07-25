import { KnobWaveType } from '../../models/types/waveTypes.ts';
import { bassSynth } from '../singleton.ts';
import { inputToToneWaveform } from '../utils/transformToToneValues.ts';

export const setToneBassSynthWaveform = (waveForm: KnobWaveType) =>
  (bassSynth.synth.oscillator.type = inputToToneWaveform(waveForm));

export const setToneBassFilterFrequency = (frequency: number) =>
  (bassSynth.filter.frequency.value = frequency);

export const setToneBassSynthAttack = (attack: number) =>
  (bassSynth.synth.envelope.attack = attack);

export const setToneBassSynthDecay = (decay: number) =>
  (bassSynth.synth.envelope.decay = decay);

export const setToneBassSynthSustain = (sustain: number) =>
  (bassSynth.synth.envelope.sustain = sustain);

export const setToneBassSynthRelease = (release: number) =>
  (bassSynth.synth.envelope.release = release);
