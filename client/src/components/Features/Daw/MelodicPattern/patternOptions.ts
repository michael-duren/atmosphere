import { MusicalKey } from '../../../../models/types/musicalKey.ts';
import { PatternName } from 'tone/build/esm/event/PatternGenerator';
import { MusicalScale } from '../../../../models/types/musicalScale.ts';
import { NoteType } from '../../../../models/types/noteType.ts';

export const musicalKeyOptions: MusicalKey[] = [
  'C',
  'C#',
  'Db',
  'D',
  'D#',
  'Eb',
  'E',
  'F',
  'F#',
  'Gb',
  'G',
  'G#',
  'Ab',
  'A',
  'A#',
  'Bb',
  'B',
];

export const musicalScaleOptions: MusicalScale[] = [
  'major',
  'minor',
  'dorian',
  'phrygian',
  'lydian',
  'mixolydian',
  'locrian',
  'harmonic minor',
  'melodic minor',
  'major pentatonic',
  'minor pentatonic',
  'blues',
  'whole tone',
  'augmented',
  'diminished',
  'chromatic',
];

export const transposeOptions = [-36, -24, -12, 0, 12, 24, 36];

export const patternTypeOptions: PatternName[] = [
  'up',
  'down',
  'upDown',
  'downUp',
  'alternateUp',
  'alternateDown',
  'random',
  'randomOnce',
  'randomWalk',
];

export const timeIntervalOptions: NoteType[] = [
  '1n',
  '2n',
  '4n',
  '4t',
  '8n',
  '8t',
  '16n',
  '16t',
  '32n',
  '32t',
  '64n',
  '64t',
];

export const durationIntervalOptions: NoteType[] = [
  '1n',
  '2n',
  '4n',
  '4t',
  '8n',
  '8t',
  '16n',
  '16t',
  '32n',
  '32t',
  '64n',
  '64t',
];

export const lengthOptions = [1, 2, 3, 4, 8, 16, 32, 64];
