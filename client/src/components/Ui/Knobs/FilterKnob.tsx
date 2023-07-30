import { ReactComponent as LowPass } from '../../../assets/icons/LowPass.svg';
import { ReactComponent as HighPass } from '../../../assets/icons/HighPass.svg';
import { ReactComponent as Bandpass } from '../../../assets/icons/BandPass.svg';
import { ReactComponent as Notch } from '../../../assets/icons/Notch.svg';
import { ReactComponent as Peaking } from '../../../assets/icons/Peaking.svg';
import { animated, Spring, SpringValue } from '@react-spring/web';
import {
  CircularInput,
  CircularProgress,
  CircularThumb,
  CircularTrack,
} from 'react-circular-input';
import { useEffect, useState } from 'react';
import { FilterType } from '../../../models/types/filterType.ts';
import { inputToFilterType } from '../../../tone/utils/transformToToneValues.ts';
import { filterTypeToInput } from '../../../tone/utils/transformToInputValues.ts';

interface Props {
  color: string;
  level: FilterType;
  storeSetter: (waveType: FilterType) => void;
  toneSetter: (knobWave: FilterType) => void;
  display?: string;
  displaySize?: string;
}

const AnimatedCircleInput = animated(CircularInput);

export default function FilterKnob({
  color,
  level,
  storeSetter,
  toneSetter,
}: Props) {
  const [localLevel, setLocalLevel] = useState<number>(
    filterTypeToInput(level)
  );
  const [filter, setFilter] = useState<FilterType>(level);
  const stepValue = (val: number) => Math.round(val * 5) / 5;

  useEffect(() => {
    setFilter(inputToFilterType(localLevel)); // convert the number to a filterFrequency type
  }, [localLevel]);

  useEffect(() => {
    setLocalLevel(filterTypeToInput(level)); // update the local level when a song is loaded
  }, [level]);

  const setStoreLevel = () => {
    storeSetter(filter); // set to run on mouse up
  };

  const setLocalAndToneLevel = (v: number) => {
    setLocalLevel(stepValue(v)); // set the local level to the step value
    toneSetter(filter); // set the tone level to the filterFrequency type
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
        {filter === 'lowpass' ? (
          <LowPass />
        ) : filter === 'highpass' ? (
          <HighPass />
        ) : filter === 'bandpass' ? (
          <Bandpass />
        ) : filter === 'notch' ? (
          <Notch />
        ) : filter === 'peaking' ? (
          <Peaking />
        ) : (
          <LowPass />
        )}
      </div>
    </div>
  );
}
