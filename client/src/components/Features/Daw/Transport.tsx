import * as Tone from 'tone';
import { useAppSelector } from '../../../store/hooks/useAppSelector.ts';
import { useAppDispatch } from '../../../store/hooks/useAppDispatch.ts';
import {
  selectTransport,
  setIsPlaying,
} from '../../../store/slices/transportSlice.ts';
import { BsFillPlayFill, BsPauseFill } from 'react-icons/bs';
import { selectSong } from '../../../store/slices/songSlice.ts';
import { useRef, useState } from 'react';
import { CURRENT_SONG_ACTIONS } from '../../../store/actions/currentSongActions.ts';
import { darkInput } from '../../Ui/Styles/input.ts';

export default function Transport() {
  const { isPlaying } = useAppSelector(selectTransport);
  const {
    currentSong: { bpm },
  } = useAppSelector(selectSong);
  const bpmRef = useRef<HTMLInputElement | null>(null);
  const [inputBpm, setInputBpm] = useState(bpm);

  const dispatch = useAppDispatch();

  /*
   * starting transport cannot be defined in a saga
   * because the audio context must be started by a user gesture
   */
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
  const handleBpm = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && inputBpm > 20 && inputBpm <= 400) {
      dispatch({
        type: CURRENT_SONG_ACTIONS.SET_SONG_BPM_ASYNC,
        payload: inputBpm,
      });
      bpmRef.current!.blur();
    }
  };
  const handleInputBpm = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputBpm(+event.target.value);
  };

  return (
    <div>
      <div className="flex items-center gap-2">
        <button className="mt-2" onClick={() => togglePlay()}>
          {isPlaying ? <BsPauseFill size={40} /> : <BsFillPlayFill size={40} />}{' '}
        </button>
        <div className="flex flex-col">
          <label className="text-[0.6rem]">BPM</label>
          <input
            ref={bpmRef}
            type="number"
            max={400}
            min={20}
            value={inputBpm}
            onChange={handleInputBpm}
            onKeyDown={handleBpm}
            className={darkInput}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-[0.6rem]">STEPS</label>
          <input
            type="number"
            max={64}
            min={1}
            value={16}
            className={darkInput}
          />
        </div>
      </div>
    </div>
  );
}
