import { splitCamelCase, toTitleCase } from '../../../../utils/string.ts';
import MainKnob from '../../../Ui/Knobs/MainKnob.tsx';
import { IconType } from 'react-icons';
import FrequencyKnob from '../../../Ui/Knobs/FrequencyKnob.tsx';
import Knob from '../../../Ui/Knobs/Knob.tsx';
import SaveButton from '../../../Ui/Buttons/SaveButton.tsx';

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
  saveDispatch: (preset: any) => void;
  effectToSave: any;
}

export default function EffectCard({
  state,
  color,
  size = 'text-lg',
  EffectIcon,
  title,
  saveDispatch,
  effectToSave,
}: Props) {
  return (
    <div
      className="p-2 justify-evenly flex flex-col
  items-center rounded-xl "
    >
      <div className="flex items-center justify-between w-full">
        <h3
          className={`${size} w-full items-center gap-1 flex mb-2  font-caps`}
        >
          {EffectIcon && <EffectIcon size={16} />}
          <span>{toTitleCase(splitCamelCase(title))}</span>
        </h3>
        <SaveButton size={14} onClick={() => saveDispatch(effectToSave)} />
      </div>
      <div className="flex w-full items-center gap-8">
        {state.map((param) => {
          const paramTitle = toTitleCase(splitCamelCase(param.name));
          return (
            <div key={param.name} className="flex flex-col items-center gap-2">
              <Knob title={paramTitle}>
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
              </Knob>
            </div>
          );
        })}
      </div>
    </div>
  );
}
