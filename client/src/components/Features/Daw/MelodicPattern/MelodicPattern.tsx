import { SiMusicbrainz } from 'react-icons/si';
import MelodicPatternGenerator from './MelodicPatternGenerator.tsx';
import Oscilloscopes from './Oscilloscopes.tsx';

export default function MelodicPattern() {
  return (
    <div className="p-4 flex-1">
      <h2 className="text-2xl font-caps flex gap-2">
        <SiMusicbrainz /> Melodic Pattern
      </h2>
      <div className="flex">
        <MelodicPatternGenerator />
        <div className="flex-1">
          <Oscilloscopes />
        </div>
      </div>
    </div>
  );
}
