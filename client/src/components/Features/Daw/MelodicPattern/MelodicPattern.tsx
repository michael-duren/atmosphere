import { SiMusicbrainz } from 'react-icons/si';
import MelodicPatternGenerator from './MelodicPatternGenerator.tsx';

export default function MelodicPattern() {
  return (
    <div className="p-8 ">
      <h2 className="text-2xl font-caps flex gap-2">
        <SiMusicbrainz /> Melodic Pattern
      </h2>
      <div className="flex">
        <MelodicPatternGenerator />
        {/* GRAPH AND OSCILLOSCOPE */}
        <div className="flex-1">OSCILLOSCOPE</div>
      </div>
    </div>
  );
}
