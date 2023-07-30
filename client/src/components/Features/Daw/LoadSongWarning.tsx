import { useAppSelector } from '../../../store/hooks/useAppSelector.ts';
import ColorButton from '../../Ui/Buttons/ColorButton.tsx';
import { useAppDispatch } from '../../../store/hooks/useAppDispatch.ts';
import { setLoadSongModalOpen } from '../../../store/slices/commonSlice.ts';
import { CURRENT_SONG_ACTIONS } from '../../../store/actions/currentSongActions.ts';

export default function LoadSongWarning() {
  const { songToLoad } = useAppSelector((store) => store.common);
  const dispatch = useAppDispatch();
  const closeModal = () => dispatch(setLoadSongModalOpen(false));
  const loadSong = () => {
    dispatch({
      type: CURRENT_SONG_ACTIONS.LOAD_SONG_TO_CURRENT,
      payload: songToLoad,
    });
  };

  return (
    <div className="text-white flex flex-col items-center justify-center gap-4">
      <h2 className="text-2xl">
        Are you sure you want to load <i>{songToLoad!.songName}</i>?
      </h2>
      <div className="flex w-full">
        <p>Any unsaved changes will be lost</p>
      </div>
      <div className="flex w-full justify-around mt-8">
        <ColorButton color="red" type="button" title="Yes" onClick={loadSong} />
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
