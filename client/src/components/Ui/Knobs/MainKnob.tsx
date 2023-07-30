import { animated, Spring, SpringValue } from '@react-spring/web';
import {
  CircularInput,
  CircularProgress,
  CircularThumb,
  CircularTrack,
} from 'react-circular-input';
import { useEffect, useState } from 'react';

interface Props {
  color: string;
  level: number;
  storeSetter: (num: number) => void;
  toneSetter: (num: number) => void;
  display?: string;
  displaySize?: string;
}

const AnimatedCircleInput = animated(CircularInput);

export default function MainKnob({
  color,
  level,
  storeSetter,
  toneSetter,
}: Props) {
  const [localLevel, setLocalLevel] = useState<number>(level);

  useEffect(() => {
    setLocalLevel(level);
  }, [level]);

  const setStoreLevel = () => {
    storeSetter(+localLevel.toFixed(2));
  };

  const setLocalAndToneLevel = (v: number) => {
    setLocalLevel(v);
    toneSetter(+v.toFixed(2));
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
      <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 text-xs">
        {Math.round(localLevel * 100)}
      </div>
    </div>
  );
}
