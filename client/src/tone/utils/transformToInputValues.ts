import { SimpleWaveType, WaveType } from '../../models/types/waveTypes.ts';
import { FilterType } from '../../models/types/filterType.ts';
import { NoteType } from '../../models/types/noteType.ts';

export const toneWaveFormToInput = (toneWaveform: WaveType): number => {
  switch (toneWaveform) {
    case 'fatsine1':
      return 0;
    case 'fattriangle':
      return 0.25;
    case 'fatsawtooth':
      return 0.5;
    case 'fatsquare':
      return 0.75;
    default:
      return 0;
  }
};

export const simpleToneWaveFormToInput = (
  simpleToneWaveform: SimpleWaveType
): number => {
  switch (simpleToneWaveform) {
    case 'sine2':
      return 0;
    case 'triangle2':
      return 0.25;
    case 'sawtooth2':
      return 0.5;
    case 'square2':
      return 0.75;
    default:
      return 0;
  }
};

export const filterTypeToInput = (filterType: FilterType): number => {
  switch (filterType) {
    case 'lowpass':
      return 0;
    case 'highpass':
      return 0.2;
    case 'bandpass':
      return 0.4;
    case 'peaking':
      return 0.6;
    case 'notch':
      return 0.8;
  }
};

export const noteTypeToInput = (noteType: NoteType): number => {
  const step = 1 / 12;
  let acc = 0;
  const steps: number[] = [];
  for (let i = 0; i < 12; i++) {
    steps.push(acc);
    acc += step;
  }
  steps.push(1);

  switch (noteType) {
    case '1n':
      return steps[0];
    case '2n':
      return steps[1];
    case '4n':
      return steps[2];
    case '4t':
      return steps[3];
    case '8n':
      return steps[4];
    case '8t':
      return steps[5];
    case '16n':
      return steps[6];
    case '16t':
      return steps[7];
    case '32n':
      return steps[8];
    case '32t':
      return steps[9];
    case '64n':
      return steps[10];
    case '64t':
      return steps[11];
    default:
      return 0;
  }
};
