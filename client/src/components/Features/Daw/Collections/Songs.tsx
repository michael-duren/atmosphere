import FolderButton from '../../../Ui/Buttons/FolderButton.tsx';
import {
  setDeleteSongModalOpen,
  setLoadSongModalOpen,
  setSongToDelete,
  setSongToLoad,
} from '../../../../store/slices/commonSlice.ts';
import { BsFileEarmarkMusic } from 'react-icons/bs';
import { useAppSelector } from '../../../../store/hooks/useAppSelector.ts';
import { selectSong } from '../../../../store/slices/songSlice.ts';
import { useAppDispatch } from '../../../../store/hooks/useAppDispatch.ts';
import { SongListItem } from '../../../../models/songList.ts';
import { Fragment, useState } from 'react';
import CollectionItem from './CollectionItem.tsx';

export default function Songs() {
  const { songList } = useAppSelector(selectSong);
  const dispatch = useAppDispatch();
  const setLoadSongModalOpenHandler = (songToDelete: SongListItem) => {
    dispatch(setSongToDelete(songToDelete));
    dispatch(setDeleteSongModalOpen(true));
  };
  const [isSongsOpen, setIsSongsOpen] = useState(false);
  return (
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
              <Fragment key={song.id}>
                <CollectionItem
                  mainOnClick={loadSongModalOpenHandler}
                  deleteOnClick={() => setLoadSongModalOpenHandler(song)}
                  name={song.songName}
                  Icon={BsFileEarmarkMusic}
                  iconSize={14}
                />
              </Fragment>
            );
          })}
        </div>
      )}
    </div>
  );
}
