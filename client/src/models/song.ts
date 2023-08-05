import { PatternName } from 'tone/build/esm/event/PatternGenerator';
import { Sampler } from 'tone';
import { SimpleWaveType, WaveType } from './types/waveTypes.ts';
import { NoteType } from './types/noteType.ts';
import { FilterType } from './types/filterType.ts';
import { MusicalKey } from './types/musicalKey.ts';
import { MusicalScale } from './types/musicalScale.ts';

export interface Song {
  id?: number;
  songName?: string;
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
  presetName?: string;
  mix: number;
  amount: number;
  filterFrequency: number;
  songId?: number;
}

export interface Reverb {
  id?: number;
  presetName?: string;
  mix: number;
  decay: number;
  preDelay: number;
  songId?: number;
}

export interface Delay {
  id?: number;
  presetName?: string;
  mix: number;
  time: number;
  feedback: number;
  songId?: number;
}

export interface BassSynth {
  id?: number;
  presetName?: string;
  attack: number;
  decay: number;
  sustain: number;
  release: number;
  waveform: WaveType;
  filterFrequency: number;
  songId?: number;
}

export interface MelodicSynth {
  id?: number;
  presetName?: string;
  waveform: WaveType;
  attack: number;
  decay: number;
  sustain: number;
  release: number;
  filterFrequency: number;
  filterMod: number;
  filterType: FilterType;
  metal: number;
  chorus: number;
  lfoFrequency: NoteType;
  lfoShape: SimpleWaveType;
  songId?: number;
}

export interface MelodicPattern {
  id?: number;
  presetName?: string;
  key: MusicalKey;
  scale: MusicalScale;
  sequence: number[];
  patternType: PatternName;
  transpose: number;
  songId?: number;
  timeInterval: NoteType;
  noteDuration: NoteType;
  length: number;
}

export interface KitPattern {
  id?: number;
  presetName?: string;
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
