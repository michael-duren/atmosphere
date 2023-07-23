import { animated, Spring, SpringValue } from '@react-spring/web';
import {
  CircularInput,
  CircularProgress,
  CircularThumb,
  CircularTrack,
} from 'react-circular-input';
import { useState } from 'react';

interface Props {
  color: string;
  level: number;
  setter: (num: number) => void;
  display?: string;
  displaySize?: string;
}

const AnimatedCircleInput = animated(CircularInput);

export default function AnimatedKnob({ color, level, setter }: Props) {
  const [localLevel, setLocalLevel] = useState<number>(level);

  const setStoreLevel = () => {
    setter(+localLevel.toFixed(2));
  };

  return (
    <div className="relative">
      <Spring to={{ localLevel }}>
        {(props: { localLevel: SpringValue<number> }) => (
          <AnimatedCircleInput
            radius={24}
            value={props.localLevel}
            onChange={(v) => {
              setLocalLevel(v);
            }}
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
      <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 text-xs">
        {Math.round(localLevel * 100)}
      </div>
    </div>
  );
}
