import { FiHardDrive } from 'react-icons/fi';
import FolderButton from '../../Ui/Buttons/FolderButton.tsx';
import { useState } from 'react';
import { useAppSelector } from '../../../store/hooks/useAppSelector.ts';
import { selectSong } from '../../../store/slices/songSlice.ts';
import { BsFileEarmarkMusic } from 'react-icons/bs';

export default function Collections() {
  const { songList } = useAppSelector(selectSong);

  const [isSongsOpen, setIsSongsOpen] = useState(false);
  const [isPatternsOpen, setIsPatternsOpen] = useState(false);
  const [isEffectsOpen, setIsEffectsOpen] = useState(false);

  return (
    <div className="flex flex-grow p-8 flex-col gap-4">
      <h2 className="text-2xl flex gap-2 font-caps">
        <FiHardDrive />
        Collections
      </h2>
      {/* FOLDER LIST */}
      <div className="ml-4 flex flex-col gap-4">
        {/* SONGS */}
        <div>
          <FolderButton
            name={'Songs'}
            isOpen={isSongsOpen}
            setIsOpen={setIsSongsOpen}
          />
          {isSongsOpen && (
            <div className="ml-8 mt-4 flex flex-col gap-4">
              {songList.map((song) => {
                return (
                  <button
                    className="flex group transition-all duration-300 hover:text-violet-300  items-center"
                    key={song.id}
                  >
                    <span className="mr-2">
                      <BsFileEarmarkMusic
                        className="group-active:scale-110"
                        size={14}
                      />
                    </span>
                    <span className="group-active:scale-105 text-sm">
                      {song.songName}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
        {/*  PATTERNS */}
        <div>
          <FolderButton
            name={'Patterns'}
            isOpen={isPatternsOpen}
            setIsOpen={setIsPatternsOpen}
          />
        </div>
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
