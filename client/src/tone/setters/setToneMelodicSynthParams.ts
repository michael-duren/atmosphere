import { melodicSynth } from '../singleton.ts';
import { NoteType } from '../../models/types/noteType.ts';
import {
  inputToSimpleToneWaveform,
  inputToToneWaveform,
} from '../utils/transformToToneValues.ts';
import { KnobWaveType } from '../../models/types/waveTypes.ts';

/*
 * Envelope Params
 */
export const setToneMelodicSynthAttack = (attack: number) => {
  melodicSynth.synth.envelope.attack = attack;
};

export const setToneMelodicSynthDecay = (decay: number) => {
  melodicSynth.synth.envelope.decay = decay;
};

export const setToneMelodicSynthSustain = (sustain: number) => {
  melodicSynth.synth.envelope.sustain = sustain;
};

export const setToneMelodicSynthRelease = (release: number) => {
  melodicSynth.synth.envelope.release = release;
};

/*
 * rest of params
 */

export const setToneMelodicSynthWaveform = (waveform: KnobWaveType) => {
  melodicSynth.synth.oscillator.type = inputToToneWaveform(waveform);
};

export const setToneMelodicSynthChorus = (chorus: number) => {
  melodicSynth.chorus.wet.value = chorus;
};

export const setToneMelodicSynthFilterFrequency = (freq: number) => {
  melodicSynth.filter.frequency.value = freq;
  melodicSynth.filterTwo.frequency.value = freq;
};

export const setToneMelodicSynthFilterType = (type: BiquadFilterType) => {
  melodicSynth.filter.type = type;
  melodicSynth.filterTwo.type = type;
};

export const setToneMelodicSynthMetal = (metal: number) => {
  melodicSynth.synth.modulationIndex.value = metal * 6;
};

/*
 * LFO Params
 */
export const setToneMelodicSynthLfoFreq = (freq: NoteType) => {
  melodicSynth.lfoFilter.frequency.value = freq;
};

export const setToneMelodicSynthFilterMod = (mod: number) => {
  melodicSynth.lfoFilter.min = mod;
};

export const setToneMelodicSynthLfoWaveform = (waveform: KnobWaveType) => {
  melodicSynth.lfoFilter.type = inputToSimpleToneWaveform(waveform);
};

/*
 * Would be nice to add
 */

export const setToneMelodicSynthPortamento = (portamento: number) => {
  melodicSynth.synth.portamento = portamento;
};
