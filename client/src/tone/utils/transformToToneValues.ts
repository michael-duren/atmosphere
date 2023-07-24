import {
  KnobWaveType,
  SimpleWaveType,
  WaveType,
} from '../../models/types/waveTypes.ts';
import { FilterType } from '../../models/types/filterType.ts';
import { NoteType } from '../../models/types/noteType.ts';

// convert from 0-1 to 0-22000
export const toFrequency = (num: number) => Math.round(num * 22000);

export const inputToToneWaveform = (input: KnobWaveType): WaveType => {
  switch (input) {
    case 'sine':
      return 'fatsine1';
    case 'triangle':
      return 'fattriangle';
    case 'sawtooth':
      return 'fatsawtooth';
    case 'square':
      return 'fatsquare';
    default:
      return 'fatsine1';
  }
};

export const inputToSimpleToneWaveform = (
  input: KnobWaveType
): SimpleWaveType => {
  switch (input) {
    case 'sine':
      return 'sine2';
    case 'triangle':
      return 'triangle2';
    case 'sawtooth':
      return 'sawtooth2';
    case 'square':
      return 'square2';
    default:
      return 'sine2';
  }
};

export const inputToFilterType = (input: number): FilterType => {
  if (input <= 0 && input > 0.2) return 'lowpass';

  if (input >= 0.2 && input < 0.4) return 'highpass';

  if (input >= 0.4 && input < 0.6) return 'bandpass';

  if (input >= 0.6 && input < 0.8) return 'peaking';

  if (input >= 0.8 && input < 1) return 'notch';

  return 'lowpass';
};

export const inputToNoteType = (input: number): NoteType => {
  const step = 1 / 12;
  let acc = 0;
  const steps: number[] = [];
  for (let i = 0; i < 12; i++) {
    steps.push(acc);
    acc += step;
  }
  steps.push(1);

  if (input >= steps[0] && input < steps[1]) return '1n';
  if (input >= steps[1] && input < steps[2]) return '2n';
  if (input >= steps[2] && input < steps[3]) return '4n';
  if (input >= steps[3] && input < steps[4]) return '4t';
  if (input >= steps[4] && input < steps[5]) return '8n';
  if (input >= steps[5] && input < steps[6]) return '8t';
  if (input >= steps[6] && input < steps[7]) return '16n';
  if (input >= steps[7] && input < steps[8]) return '16t';
  if (input >= steps[8] && input < steps[9]) return '32n';
  if (input >= steps[9] && input < steps[10]) return '32t';
  if (input >= steps[10] && input < steps[11]) return '64n';
  if (input >= steps[11] && input <= steps[12]) return '64t';

  return '4n';
};
