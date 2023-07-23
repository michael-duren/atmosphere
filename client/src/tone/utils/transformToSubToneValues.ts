import { KnobWaveType } from '../../models/types/waveTypes.ts';

export const getWaveFromNumber = (val: number): KnobWaveType => {
  switch (val) {
    case 0:
    case 1:
      return 'sine';
    case 0.25:
      return 'triangle';
    case 0.5:
      return 'sawtooth';
    case 0.75:
      return 'square';
    default:
      return 'sine';
  }
};
