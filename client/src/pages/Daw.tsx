import DawLayout from '../components/Layouts/DawLayout.tsx';
import * as Tone from 'tone';
import AbstractSpinner from '../components/Ui/Spinners/AbstractSpinner.tsx';
import { useAppSelector } from '../store/hooks/useAppSelector.ts';
import { selectUser } from '../store/slices/userSlice.ts';
import Collections from '../components/Features/Daw/Collections.tsx';
import { useEffect } from 'react';
import { useAppDispatch } from '../store/hooks/useAppDispatch.ts';
import { SONG_ACTIONS } from '../store/actions/songActions.ts';
import { selectSong } from '../store/slices/songSlice.ts';
import MelodicPattern from '../components/Features/Daw/MelodicPattern.tsx';
import Mixer from '../components/Features/Daw/Mixer/Mixer.tsx';
import DrumSequencer from '../components/Features/Daw/DrumSequencer/DrumSequencer.tsx';
import {
  selectTransport,
  setIsToneLoaded,
} from '../store/slices/transportSlice.ts';
import { setToneParamsOnLoad } from '../components/Features/Daw/utils/setToneParamsOnLoad.ts';

export default function Daw() {
  const user = useAppSelector(selectUser);
  const { songList, currentSong } = useAppSelector(selectSong);
  const { isToneLoaded } = useAppSelector(selectTransport);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch({ type: SONG_ACTIONS.GET_SONG_LIST_ASYNC });
    console.log(songList);
  }, []);

  useEffect(() => {
    Tone.loaded().then(() => {
      dispatch(setIsToneLoaded(true));
      setToneParamsOnLoad(currentSong);
    });
  }, []);

  if (!user || user.isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <AbstractSpinner />
      </div>
    );
  }
  if (!isToneLoaded) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <AbstractSpinner />
        <div className="animate-pulse">Loading Instruments...</div>
      </div>
    );
  }

  return (
    <DawLayout>
      <aside className="col-span-4 grid grid-rows-2 rounded-xl bg-dark-transparent">
        <Collections />
        <MelodicPattern />
      </aside>
      <main className="grid grid-rows-2 rounded-xl bg-dark-transparent col-span-8 ">
        <Mixer />
        <DrumSequencer />
      </main>
    </DawLayout>
  );
}
