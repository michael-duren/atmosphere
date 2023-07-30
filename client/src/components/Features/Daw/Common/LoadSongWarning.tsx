import { useAppSelector } from '../../../../store/hooks/useAppSelector.ts';
import ColorButton from '../../../Ui/Buttons/ColorButton.tsx';
import { useAppDispatch } from '../../../../store/hooks/useAppDispatch.ts';
import { setLoadSongModalOpen } from '../../../../store/slices/commonSlice.ts';
import { SONG_ACTIONS } from '../../../../store/actions/songActions.ts';

export default function LoadSongWarning() {
  const { songToLoad } = useAppSelector((store) => store.common);
  const { isPlaying } = useAppSelector((store) => store.transport);
  const dispatch = useAppDispatch();
  const closeModal = () => dispatch(setLoadSongModalOpen(false));
  const loadSong = () => {
    dispatch({
      type: SONG_ACTIONS.LOAD_SONG_TO_CURRENT,
      payload: songToLoad,
    });
    dispatch(setLoadSongModalOpen(false));
  };

  return (
    <div className="text-white flex flex-col items-center justify-center gap-4">
      <h2 className="text-2xl">
        Are you sure you want to load <i>{songToLoad!.songName}</i>?
      </h2>
      <div className="flex w-full">
        <p>Any unsaved changes will be lost</p>
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
          onClick={loadSong}
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
