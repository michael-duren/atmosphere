import { ReactComponent as BassSynthSvg } from '../../../../assets/icons/BassSynth.svg';
import WaveformKnob from '../../../Ui/Knobs/WaveformKnob.tsx';
import { useAppSelector } from '../../../../store/hooks/useAppSelector.ts';
import { selectSong } from '../../../../store/slices/songSlice.ts';
import {
  setToneBassFilterFrequency,
  setToneBassSynthAttack,
  setToneBassSynthDecay,
  setToneBassSynthWaveform,
} from '../../../../tone/setters/setToneBassSynthParams.ts';
import { toneWaveFormToInput } from '../../../../tone/utils/transformToInputValues.ts';
import useBassSynthStoreChange from '../../../../hooks/useBassSynthStoreChange.ts';
import FrequencyKnob from '../../../Ui/Knobs/FrequencyKnob.tsx';
import Knob from '../../../Ui/Knobs/Knob.tsx';
import MainKnob from '../../../Ui/Knobs/MainKnob.tsx';

export default function BassSynthCard() {
  const { currentSong } = useAppSelector(selectSong);
  const {
    setStoreBassSynthWaveform,
    setStoreBassSynthFilterFrequency,
    setStoreBassSynthAttackChange,
    setStoreBassSynthDecayChange,
  } = useBassSynthStoreChange();

  return (
    <div className="flex flex-col items-center rounded-2xl ">
      <div className="text-xl font-caps flex mb-4 gap-2 items-end w-full">
        <BassSynthSvg className="h-8 w-8 fill-white stroke-2 stroke-white" />
        <h2>Bass Synth</h2>
      </div>
      <div className="grid grid-cols-2 grid-rows-3 gap-x-4 gap-y-8">
        {/* Row One */}
        <Knob title={'Waveform'}>
          <WaveformKnob
            color={'#F59E0B'}
            level={toneWaveFormToInput(currentSong.bassSynth.waveform)}
            storeSetter={setStoreBassSynthWaveform}
            toneSetter={setToneBassSynthWaveform}
          />
        </Knob>
        <Knob title={'Filter Frequency'}>
          <FrequencyKnob
            color={'#F59E0B'}
            level={currentSong.bassSynth.filterFrequency}
            storeSetter={setStoreBassSynthFilterFrequency}
            toneSetter={setToneBassFilterFrequency}
          />
        </Knob>
        {/* Row Two */}
        <Knob title={'Attack'}>
          <MainKnob
            color={'#F59E0B'}
            level={currentSong.bassSynth.attack}
            storeSetter={setStoreBassSynthAttackChange}
            toneSetter={setToneBassSynthAttack}
          />
        </Knob>
        <Knob title={'Decay'}>
          <MainKnob
            level={currentSong.bassSynth.decay}
            color={'#F59E0B'}
            storeSetter={setStoreBassSynthDecayChange}
            toneSetter={setToneBassSynthDecay}
          />
        </Knob>
      </div>
    </div>
  );
}
