import { melodicSynth } from '../singleton.ts';
import { KnobWaveType } from '../../models/types/knobWaveType.ts';
import { NoteType } from '../../models/types/noteType.ts';

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
  switch (waveform) {
    case 'sine':
      melodicSynth.synth.oscillator.type = 'fatsine1';
      return;
    case 'triangle':
      melodicSynth.synth.oscillator.type = 'fattriangle';
      return;
    case 'sawtooth':
      melodicSynth.synth.oscillator.type = 'fatsawtooth';
      return;
    case 'square':
      melodicSynth.synth.oscillator.type = 'fatsquare';
      return;
    default:
      melodicSynth.synth.oscillator.type = 'fatsine1';
  }
};

export const setToneMelodicSynthChorus = (chorus: number) => {
  melodicSynth.chorus.wet.value = chorus;
};

export const setToneMelodicSynthFilterFrequency = (freq: number) => {
  melodicSynth.filter.frequency.value = freq;
};

export const setToneMelodicSynthFilterType = (type: BiquadFilterType) => {
  melodicSynth.filter.type = type;
  melodicSynth.filterTwo.type = type;
};

export const setToneMelodicSynthFilterMod = (mod: number) => {
  melodicSynth.lfoFilter.min = mod;
};

export const setToneMelodicSynthFilterModFreq = (freq: KnobWaveType) => {
  switch (freq) {
    case 'sine':
      melodicSynth.lfoFilter.type = 'sine2';
      return;
    case 'triangle':
      melodicSynth.lfoFilter.type = 'triangle2';
      return;
    case 'sawtooth':
      melodicSynth.lfoFilter.type = 'sawtooth2';
      return;
    case 'square':
      melodicSynth.lfoFilter.type = 'square2';
      return;
    default:
      melodicSynth.lfoFilter.type = 'sine';
  }
};

export const setToneMelodicSynthMetal = (metal: number) => {
  melodicSynth.synth.modulationIndex.value = metal * 6;
};

export const setToneMelodicSynthLfoFreq = (freq: NoteType) => {
  melodicSynth.lfoFilter.frequency.value = freq;
};

export const setToneMelodicSynthLfoWaveform = (waveform: KnobWaveType) => {
  switch (waveform) {
    case 'sine':
      melodicSynth.lfoFilter.type = 'sine1';
      return;
    case 'triangle':
      melodicSynth.lfoFilter.type = 'triangle1';
      return;
    case 'sawtooth':
      melodicSynth.lfoFilter.type = 'sawtooth1';
      return;
    case 'square':
      melodicSynth.lfoFilter.type = 'square1';
      return;
    default:
      melodicSynth.synth.oscillator.type = 'fatsine1';
  }
};

export const setToneMelodicSynthPortamento = (portamento: number) => {
  melodicSynth.synth.portamento = portamento;
};
