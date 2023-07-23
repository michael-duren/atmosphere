import { splitCamelCase, toTitleCase } from '../../../../utils/string.ts';
import MainKnob from '../../../Ui/Knobs/MainKnob.tsx';
import { IconType } from 'react-icons';
import FrequencyKnob from '../../../Ui/Knobs/FrequencyKnob.tsx';

interface Parameter {
  level: number;
  name: string;
  storeSetter: (num: number) => void;
  toneSetter: (num: number) => void;
  type: string;
}

interface Props {
  state: Parameter[];
  color: string;
  title: string;
  EffectIcon?: IconType;
  size?: string;
}

export default function EffectCard({
  state,
  color,
  size = 'text-2xl',
  EffectIcon,
}: Props) {
  return (
    <div
      className="p-2 justify-evenly flex flex-col
  items-center rounded-xl "
    >
      <h3 className={`${size} flex mb-2 flex-col items-center font-caps`}>
        {/* {title} */}
        {EffectIcon && <EffectIcon size={16} />}
      </h3>
      <div className="flex w-full items-center  gap-8">
        {state.map((param) => {
          const title = toTitleCase(splitCamelCase(param.name));
          return (
            <div key={param.name} className="flex  flex-col items-center gap-2">
              <div className="text-xs font-caps">{title}</div>
              <div className="relative">
                {param.type === 'main' ? (
                  <MainKnob
                    level={param.level}
                    storeSetter={param.storeSetter}
                    toneSetter={param.toneSetter}
                    color={color}
                  />
                ) : param.type === 'freq' ? (
                  <FrequencyKnob
                    level={param.level}
                    storeSetter={param.storeSetter}
                    toneSetter={param.toneSetter}
                    color={color}
                  />
                ) : (
                  <MainKnob
                    level={param.level}
                    storeSetter={param.storeSetter}
                    toneSetter={param.toneSetter}
                    color={color}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
