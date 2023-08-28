import { animated, Spring, SpringValue } from '@react-spring/web';
import {
  CircularInput,
  CircularProgress,
  CircularThumb,
  CircularTrack,
} from 'react-circular-input';
import { useEffect, useState } from 'react';
import { formatFrequency } from '../../../utils/tone.ts';
import {
  toFrequency,
  toFrequencyInverted,
} from '../../../tone/utils/transformToToneValues.ts';
import {
  frequencyInvertedToInput,
  frequencyToInput,
} from '../../../tone/utils/transformToInputValues.ts';
import { getKnobWidth } from './knobWidth.ts';

interface Props {
  color: string;
  level: number;
  storeSetter: (num: number) => void;
  toneSetter: (num: number) => void;
  display?: string;
  displaySize?: string;
  inverted?: boolean;
}

const AnimatedCircleInput = animated(CircularInput);

export default function FrequencyKnob({
  color,
  level,
  storeSetter,
  toneSetter,
  inverted,
}: Props) {
  const initialValue = inverted
    ? frequencyInvertedToInput(level)
    : frequencyToInput(level);
  const [localLevel, setLocalLevel] = useState<number>(initialValue);
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

  useEffect(() => {
    if (inverted) {
      setLocalLevel(frequencyInvertedToInput(level));
      return;
    }

    setLocalLevel(frequencyToInput(level));
  }, [level]);

  const setStoreLevel = (): void => {
    if (inverted) {
      storeSetter(toFrequencyInverted(localLevel));
      return;
    }
    storeSetter(toFrequency(localLevel));
  };

  const setLocalAndToneLevel = (v: number) => {
    setLocalLevel(v);
    if (inverted) {
      toneSetter(toFrequencyInverted(v));
      return;
    }
    toneSetter(toFrequency(v));
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
      <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 text-[0.6rem]">
        {!inverted ? (
          formatFrequency(toFrequency(localLevel))
        ) : (
          <span>{Math.round(localLevel * 100)}%</span>
        )}
      </div>
    </div>
  );
}
