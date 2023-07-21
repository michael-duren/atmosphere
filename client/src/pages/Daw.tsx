import DawLayout from '../components/Layouts/DawLayout.tsx';
import AbstractSpinner from '../components/Ui/Spinners/AbstractSpinner.tsx';
import { useAppSelector } from '../store/hooks/useAppSelector.ts';
import { selectUser } from '../store/slices/userSlice.ts';
import Collections from '../components/Features/Daw/Collections.tsx';
import { useEffect } from 'react';
import { useAppDispatch } from '../store/hooks/useAppDispatch.ts';
import { SONG_ACTIONS } from '../store/actions/songActions.ts';
import { selectSong } from '../store/slices/songSlice.ts';

export default function Daw() {
  const user = useAppSelector(selectUser);
  const { songList } = useAppSelector(selectSong);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch({ type: SONG_ACTIONS.GET_SONG_LIST_ASYNC });
    console.log(songList);
  }, []);

  if (!user || user.isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <AbstractSpinner />
      </div>
    );
  }

  return (
    <DawLayout>
      <aside className="col-span-4 grid grid-rows-2 h-full rounded-xl bg-dark-transparent">
        <div className="flex p-8 flex-col  gap-4">
          <Collections />
        </div>
      </aside>
      <div className="col-span-8">Main</div>
    </DawLayout>
  );
}
