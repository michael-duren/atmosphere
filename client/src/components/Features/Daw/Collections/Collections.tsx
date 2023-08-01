import { FiDelete, FiHardDrive } from 'react-icons/fi';
import FolderButton from '../../../Ui/Buttons/FolderButton.tsx';
import { useState } from 'react';
import { useAppSelector } from '../../../../store/hooks/useAppSelector.ts';
import { selectSong } from '../../../../store/slices/songSlice.ts';
import { BsFileEarmarkMusic } from 'react-icons/bs';
import {
  setDeleteSongModalOpen,
  setLoadSongModalOpen,
  setSongToDelete,
  setSongToLoad,
} from '../../../../store/slices/commonSlice.ts';
import { useAppDispatch } from '../../../../store/hooks/useAppDispatch.ts';
import { SongListItem } from '../../../../models/songList.ts';

export default function Collections() {
  const { songList } = useAppSelector(selectSong);
  const dispatch = useAppDispatch();
  const setLoadSongModalOpenHandler = (songToDelete: SongListItem) => {
    dispatch(setSongToDelete(songToDelete));
    dispatch(setDeleteSongModalOpen(true));
  };
  const [isSongsOpen, setIsSongsOpen] = useState(false);
  const [isPatternsOpen, setIsPatternsOpen] = useState(false);
  const [isEffectsOpen, setIsEffectsOpen] = useState(false);

  return (
    <div className="flex flex-grow p-4 flex-col gap-4">
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
                const loadSongModalOpenHandler = () => {
                  dispatch(setLoadSongModalOpen(true));
                  dispatch(setSongToLoad(song));
                };
                return (
                  <div className="flex gap-8 items-center">
                    <button
                      className="flex group transition-all duration-300 hover:text-violet-300  items-center"
                      key={song.id}
                      onClick={loadSongModalOpenHandler}
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
                    <button
                      onClick={() => setLoadSongModalOpenHandler(song)}
                      className="transition-all duration-300 hover:text-red-400"
                    >
                      <FiDelete size={14} />
                    </button>
                  </div>
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
