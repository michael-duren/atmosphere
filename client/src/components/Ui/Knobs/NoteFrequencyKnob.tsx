import { animated, Spring, SpringValue } from '@react-spring/web';
import {
  CircularInput,
  CircularProgress,
  CircularThumb,
  CircularTrack,
} from 'react-circular-input';
import { useEffect, useState } from 'react';
import { NoteType } from '../../../models/types/noteType.ts';
import { noteTypeToInput } from '../../../tone/utils/transformToInputValues.ts';
import { inputToNoteType } from '../../../tone/utils/transformToToneValues.ts';
import { getKnobWidth } from './knobWidth.ts';

interface Props {
  color: string;
  level: NoteType;
  storeSetter: (waveType: NoteType) => void;
  toneSetter: (knobWave: NoteType) => void;
  display?: string;
  displaySize?: string;
}

const AnimatedCircleInput = animated(CircularInput);

export default function NoteFrequencyKnob({
  color,
  level,
  storeSetter,
  toneSetter,
}: Props) {
  const [localLevel, setLocalLevel] = useState<number>(noteTypeToInput(level));
  const [noteFrequency, setNoteFrequency] = useState<NoteType>(level);

  const [knobWidth, setKnobWidth] = useState<number>(
    getKnobWidth(window.innerWidth)
  );

  useEffect(() => {
    const setKnobState = () => setKnobWidth(getKnobWidth(window.innerWidth));
    // Attach the handler
    window.addEventListener('resize', setKnobState);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener('resize', setKnobState);
  }, []);
  const stepValue = (val: number) => Math.round(val * 12) / 12;

  useEffect(() => {
    setLocalLevel(noteTypeToInput(level));
  }, [level]);

  useEffect(() => {
    setNoteFrequency(inputToNoteType(localLevel));
  }, [localLevel]);

  const setStoreLevel = () => {
    storeSetter(noteFrequency);
  };

  const setLocalAndToneLevel = (v: number) => {
    setLocalLevel(stepValue(v));
    toneSetter(noteFrequency);
  };

  return (
    <div className="relative">
      <Spring to={{ localLevel }}>
        {(props: { localLevel: SpringValue<number> }) => (
          <AnimatedCircleInput
            radius={knobWidth}
            value={props.localLevel}
            onChange={setLocalAndToneLevel}
            onMouseUp={setStoreLevel}
          >
            <CircularTrack stroke={`${color}50`} strokeWidth={'10px'} />
            <CircularProgress stroke={`${color}AA`} strokeWidth={'11px'} />
            <CircularThumb
              fill={`${color}EE`}
              className="stroke-[#FFFFFFEE]"
              r={6}
            />
          </AnimatedCircleInput>
        )}
      </Spring>
      <div className="absolute stroke-white top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 text-[0.6rem]">
        {noteFrequency}
      </div>
    </div>
  );
}
