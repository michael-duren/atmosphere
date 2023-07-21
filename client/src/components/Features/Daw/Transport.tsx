import * as Tone from 'tone';
import { useAppSelector } from '../../../store/hooks/useAppSelector.ts';
import { useAppDispatch } from '../../../store/hooks/useAppDispatch.ts';
import {
  selectTransport,
  setIsPlaying,
} from '../../../store/slices/transportSlice.ts';

export default function Transport() {
  const { isPlaying } = useAppSelector(selectTransport);
  const dispatch = useAppDispatch();

  const togglePlay = async () => {
    if (Tone.Transport.state === 'started') {
      await Tone.Transport.stop();
      dispatch(setIsPlaying(false));
    } else {
      Tone.start().then(() => {
        Tone.Transport.start();
        dispatch(setIsPlaying(true));
      });
    }
  };

  return (
    <div>
      <h2>Transport</h2>
      <div>
        <button onClick={() => togglePlay()}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <button>Steps</button>
      </div>
    </div>
  );
}
