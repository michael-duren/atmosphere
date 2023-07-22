import { OmniOscillatorType } from 'tone/build/esm/source/oscillator/OscillatorInterface';
import { PatternName } from 'tone/build/esm/event/PatternGenerator';
import { Sampler } from 'tone';

export interface Song {
  id?: number;
  songName: string;
  masterVolume: number;
  drumVolume: number;
  bassVolume: number;
  melodicVolume: number;
  bpm: number;
  distortion: Distortion;
  reverb: Reverb;
  delay: Delay;
  bassSynth: BassSynth;
  melodicSynth: MelodicSynth;
  melodicPattern: MelodicPattern;
  kitPattern: KitPattern;
}

export interface Distortion {
  id?: number;
  mix: number;
  amount: number;
  filter: number;
  songId?: number;
}

export interface Reverb {
  id?: number;
  mix: number;
  decay: number;
  preDelay: number;
  songId?: number;
}

export interface Delay {
  id?: number;
  mix: number;
  time: number;
  feedback: number;
  songId?: number;
}

export interface BassSynth {
  id?: number;
  attack: number;
  decay: number;
  waveform: OmniOscillatorType;
  filter: number;
  songId?: number;
}

export interface MelodicSynth {
  id?: number;
  waveform: string;
  attack: number;
  decay: number;
  sustain: number;
  release: number;
  filterFrequency: number;
  filterMod: number;
  filterType: BiquadFilterType;
  metal: number;
  chorus: number;
  lfoFrequency: number;
  lfoShape: string;
  songId?: number;
}

export interface MelodicPattern {
  id?: number;
  scale: string;
  sequence: number[];
  patternType: PatternName;
  songId?: number;
}

export interface KitPattern {
  id?: number;
  patternLength: number;
  bdSteps: boolean[];
  sdSteps: boolean[];
  clSteps: boolean[];
  chSteps: boolean[];
  songId?: number;
}

export interface Drum {
  name: DrumNames;
  drumTrackSteps: DrumTrackSteps;
  id: number;
  sampler: Sampler;
}

export type DrumNames = 'BD' | 'SD' | 'CL' | 'CH';

export type DrumTrackSteps = 'bdSteps' | 'sdSteps' | 'clSteps' | 'chSteps';
