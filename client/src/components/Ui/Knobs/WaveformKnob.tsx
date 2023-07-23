import { ReactComponent as Sin } from '../../../assets/icons/Sin.svg';
import { ReactComponent as Triangle } from '../../../assets/icons/Triangle.svg';
import { ReactComponent as SawTooth } from '../../../assets/icons/SawTooth.svg';
import { ReactComponent as Square } from '../../../assets/icons/Square.svg';
import { animated, Spring, SpringValue } from '@react-spring/web';
import {
  CircularInput,
  CircularProgress,
  CircularThumb,
  CircularTrack,
} from 'react-circular-input';
import { useEffect, useState } from 'react';
import { getWaveFromNumber } from '../../../tone/utils/transformToSubToneValues.ts';
import { KnobWaveType } from '../../../models/types/waveTypes.ts';

interface Props {
  color: string;
  level: number;
  storeSetter: (waveType: KnobWaveType) => void;
  toneSetter: (knobWave: KnobWaveType) => void;
  display?: string;
  displaySize?: string;
}

const AnimatedCircleInput = animated(CircularInput);

export default function WaveformKnob({
  color,
  level,
  storeSetter,
  toneSetter,
}: Props) {
  const [localLevel, setLocalLevel] = useState<number>(level);
  const [wave, setWave] = useState<KnobWaveType>(getWaveFromNumber(level));
  const stepValue = (val: number) => Math.round(val * 4) / 4;

  useEffect(() => {
    setWave(getWaveFromNumber(localLevel));
  }, [localLevel]);

  const setStoreLevel = () => {
    storeSetter(wave);
  };

  const setLocalAndToneLevel = (v: number) => {
    setLocalLevel(stepValue(v));
    toneSetter(wave);
  };

  return (
    <div className="relative">
      <Spring to={{ localLevel }}>
        {(props: { localLevel: SpringValue<number> }) => (
          <AnimatedCircleInput
            radius={24}
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
        {wave === 'sine' ? (
          <Sin />
        ) : wave === 'triangle' ? (
          <Triangle />
        ) : wave === 'sawtooth' ? (
          <SawTooth />
        ) : (
          <Square />
        )}
      </div>
    </div>
  );
}
