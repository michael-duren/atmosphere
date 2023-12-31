import DawLayout from '../components/Layouts/DawLayout.tsx';
import * as Tone from 'tone';
import AbstractSpinner from '../components/Ui/Spinners/AbstractSpinner.tsx';
import { useAppSelector } from '../store/hooks/useAppSelector.ts';
import { selectUser } from '../store/slices/userSlice.ts';
import Collections from '../components/Features/Daw/Collections/Collections.tsx';
import { useEffect } from 'react';
import { useAppDispatch } from '../store/hooks/useAppDispatch.ts';
import { SONG_ACTIONS } from '../store/actions/songActions.ts';
import { selectSong } from '../store/slices/songSlice.ts';
import MelodicPattern from '../components/Features/Daw/MelodicPattern/MelodicPattern.tsx';
import Mixer from '../components/Features/Daw/Mixer/Mixer.tsx';
import DrumSequencer from '../components/Features/Daw/DrumSequencer/DrumSequencer.tsx';
import {
  selectTransport,
  setIsToneLoaded,
} from '../store/slices/transportSlice.ts';
import { setToneParamsOnLoad } from '../tone/setters/setToneParamsOnLoad.ts';
import { toneCleanup, toneState } from '../tone/singleton.ts';
import toast from 'react-hot-toast';
import ModalContent from '../components/Features/Daw/Common/ModalContent.tsx';
import { PRESET_ACTIONS } from '../store/actions/presetActions.ts';

export default function Daw() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const { currentSong } = useAppSelector(selectSong);
  const { isToneLoaded } = useAppSelector(selectTransport);

  useEffect(() => {
    dispatch({ type: SONG_ACTIONS.GET_SONG_LIST_ASYNC });
    dispatch({ type: PRESET_ACTIONS.GET_ALL_PRESETS_ASYNC });
  }, []);

  useEffect(() => {
    Tone.loaded().then(() => {
      dispatch(setIsToneLoaded(true));
      setToneParamsOnLoad(currentSong)
        .then()
        .catch((err) => {
          toast.error('Error initializing instruments');
          console.error(err);
        });
    });

    // Dispose of the tone service and the Tone context when the app unmounts
    return () => {
      toneCleanup(toneState).then(() => Tone.context.dispose());
    };
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
    <>
      <DawLayout>
        <aside className="col-span-4  flex flex-col rounded-xl bg-dark-transparent">
          <MelodicPattern />
          <Collections />
        </aside>
        <main className="flex-col mb-8 md:mb-0 flex gap-y-16 md:grid md:grid-rows-2 rounded-xl bg-dark-transparent col-span-8 ">
          <Mixer />
          <DrumSequencer />
        </main>
      </DawLayout>
      <ModalContent />
    </>
  );
}
