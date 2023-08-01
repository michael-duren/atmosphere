import { useAppSelector } from '../../../../store/hooks/useAppSelector.ts';
import ColorButton from '../../../Ui/Buttons/ColorButton.tsx';
import { useAppDispatch } from '../../../../store/hooks/useAppDispatch.ts';
import {
  setDeleteSongModalOpen,
  setLoadSongModalOpen,
} from '../../../../store/slices/commonSlice.ts';
import { SONG_ACTIONS } from '../../../../store/actions/songActions.ts';

export default function DeleteSongWarning() {
  const songToDelete = useAppSelector((store) => store.common.songToDelete);
  const { isPlaying } = useAppSelector((store) => store.transport);
  const dispatch = useAppDispatch();
  const closeModal = () => dispatch(setDeleteSongModalOpen(false));
  const deleteSong = () => {
    dispatch({
      type: SONG_ACTIONS.DELETE_SONG_ASYNC,
      payload: songToDelete,
    });
    dispatch(setLoadSongModalOpen(false));
  };

  return (
    <div className="text-white flex flex-col items-center justify-center gap-4">
      <h2 className="text-2xl">
        Are you sure you want to permanently delete{' '}
        <i>{songToDelete!.songName}</i>?
      </h2>
      <div className="flex w-full">
        <p>This song will not be recoverable</p>
      </div>
      {isPlaying && (
        <div className="text-red-500 text-xs font-semibold shadow-xl">
          Cannot Load Song while App is playing
        </div>
      )}
      <div className="flex w-full justify-around mt-8">
        <ColorButton
          color="red"
          type="button"
          title="Yes"
          disabled={isPlaying}
          onClick={deleteSong}
        />
        <ColorButton
          color="green"
          type="button"
          title="No"
          onClick={closeModal}
        />
      </div>
    </div>
  );
}
