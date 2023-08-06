import { FiHardDrive } from 'react-icons/fi';
import Songs from './Songs.tsx';
import Patterns from './Patterns.tsx';
import Effects from './Effects.tsx';
import Synths from './Synths.tsx';

export default function Collections() {
  return (
    <div className="flex-1  flex p-4 flex-col gap-4">
      <h2 className="text-2xl flex gap-2 font-caps">
        <FiHardDrive />
        Collections
      </h2>
      {/* FOLDER LIST */}
      <div className="ml-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-thumb-rounded-full scrollbar-track-transparent h-[18rem] flex flex-col gap-4">
        <Songs />
        <Patterns />
        <Synths />
        <Effects />
      </div>
    </div>
  );
}
