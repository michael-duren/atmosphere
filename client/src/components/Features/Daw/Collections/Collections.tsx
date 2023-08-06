import { FiHardDrive } from 'react-icons/fi';
import FolderButton from '../../../Ui/Buttons/FolderButton.tsx';
import { useState } from 'react';
import Songs from './Songs.tsx';
import Patterns from './Patterns.tsx';

export default function Collections() {
  const [isEffectsOpen, setIsEffectsOpen] = useState(false);

  return (
    <div className="flex flex-grow p-4 flex-col gap-4">
      <h2 className="text-2xl flex gap-2 font-caps">
        <FiHardDrive />
        Collections
      </h2>
      {/* FOLDER LIST */}
      <div className="ml-4 flex flex-col gap-4">
        <Songs />
        {/*  PATTERNS */}
        <Patterns />
        {/*  EFFECTS */}
        <div>
          <FolderButton
            name={'Effects'}
            isOpen={isEffectsOpen}
            setIsOpen={setIsEffectsOpen}
          />
        </div>
      </div>
    </div>
  );
}
