import * as Tone from 'tone';
import { useAppSelector } from '../../../../store/hooks/useAppSelector.ts';
import { useAppDispatch } from '../../../../store/hooks/useAppDispatch.ts';
import {
  selectTransport,
  setIsPlaying,
} from '../../../../store/slices/transportSlice.ts';
import { BsFillPlayFill, BsPauseFill } from 'react-icons/bs';
import {
  selectSong,
  setKitPatternLength,
} from '../../../../store/slices/songSlice.ts';
import { useEffect, useRef, useState } from 'react';
import { SONG_ACTIONS } from '../../../../store/actions/songActions.ts';
import { darkInput } from '../../../Ui/Styles/input.ts';
import { melodicPattern } from '../../../../tone/singleton.ts';
import SaveButton from '../../../Ui/Buttons/SaveButton.tsx';
import {
  setPresetModalData,
  setPresetModalDispatchType,
  setPresetModalOpen,
  setPresetModalType,
} from '../../../../store/slices/commonSlice.ts';
import { PRESET_ACTIONS } from '../../../../store/actions/presetActions.ts';

export default function Transport() {
  const { isPlaying } = useAppSelector(selectTransport);
  const {
    currentSong: { bpm },
  } = useAppSelector(selectSong);
  const patternLength = useAppSelector(
    (store) => store.song.currentSong.kitPattern.patternLength
  );
  const bpmRef = useRef<HTMLInputElement | null>(null);
  const [inputBpm, setInputBpm] = useState(bpm);
  const stepsRef = useRef<HTMLInputElement | null>(null);
  const [inputSteps, setInputSteps] = useState(16);
  const kitPattern = useAppSelector(
    (store) => store.song.currentSong.kitPattern
  );

  useEffect(() => {
    setInputSteps(patternLength);
  }, [patternLength]);

  const dispatch = useAppDispatch();

  /*
   * starting transport cannot be defined in a saga
   * because the audio context must be started by a user gesture
   */
  const togglePlay = async () => {
    if (Tone.Transport.state === 'started') {
      melodicPattern.melodyPattern.stop();
      melodicPattern.bassPattern.stop();
      await Tone.Transport.stop();
      Tone.Transport.position = 0;
      dispatch(setIsPlaying(false));
    } else {
      await Tone.start();
      Tone.Transport.position = 0;
      melodicPattern.melodyPattern.start(0);
      melodicPattern.bassPattern.start(0);
      await Tone.Transport.start();
      dispatch(setIsPlaying(true));
    }
  };

  /*
   * bpm min and max values are controlled by the handlers
   */
  const handleBpm = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && inputBpm > 20 && inputBpm <= 400) {
      dispatch({
        type: SONG_ACTIONS.SET_SONG_BPM_ASYNC,
        payload: inputBpm,
      });
      bpmRef.current!.blur();
    }
  };
  const handleInputBpm = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputBpm(+event.target.value);
  };

  const handleSteps = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && inputSteps > 0 && inputSteps <= 16) {
      dispatch(setKitPatternLength(inputSteps));
      stepsRef.current!.blur();
    }
  };
  const handleStepsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputSteps(+event.target.value);
  };

  /*
   * Saving Kit Pattern
   */
  const saveKitPatternHandler = () => {
    dispatch(setPresetModalData(kitPattern));
    dispatch(setPresetModalType('Kit Pattern'));
    if (kitPattern.presetName) {
      dispatch(
        setPresetModalDispatchType(PRESET_ACTIONS.UPDATE_KIT_PATTERN_ASYNC)
      );
    } else {
      dispatch(
        setPresetModalDispatchType(PRESET_ACTIONS.CREATE_KIT_PATTERN_ASYNC)
      );
    }

    dispatch(setPresetModalOpen(true));
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
            ref={stepsRef}
            type="number"
            max={16}
            min={1}
            value={inputSteps}
            onChange={handleStepsChange}
            onKeyDown={handleSteps}
            className={darkInput}
          />
        </div>
        <div className="ml-2 -mb-6">
          <SaveButton onClick={saveKitPatternHandler} size={20} />
        </div>
      </div>
    </div>
  );
}
