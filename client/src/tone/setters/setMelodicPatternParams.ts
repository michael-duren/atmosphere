import { MelodicPattern } from '../../models/song.ts';
import { melodicPattern } from '../singleton.ts';

const setMelodicPattern = (pattern: MelodicPattern) => {
  melodicPattern.loadPattern(pattern);
};

export default setMelodicPattern;
