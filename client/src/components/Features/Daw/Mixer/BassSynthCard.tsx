import { ReactComponent as BassSynthSvg } from '../../../../assets/icons/BassSynth.svg';
import WaveformKnob from '../../../Ui/Knobs/WaveformKnob.tsx';
import { useAppSelector } from '../../../../store/hooks/useAppSelector.ts';
import {
  setToneBassFilterFrequency,
  setToneBassSynthAttack,
  setToneBassSynthDecay,
  setToneBassSynthRelease,
  setToneBassSynthSustain,
  setToneBassSynthWaveform,
} from '../../../../tone/setters/setToneBassSynthParams.ts';
import { toneWaveFormToInput } from '../../../../tone/utils/transformToInputValues.ts';
import useBassSynthStoreChange from '../../../../hooks/useBassSynthStoreChange.ts';
import FrequencyKnob from '../../../Ui/Knobs/FrequencyKnob.tsx';
import Knob from '../../../Ui/Knobs/Knob.tsx';
import MainKnob from '../../../Ui/Knobs/MainKnob.tsx';
import SaveButton from '../../../Ui/Buttons/SaveButton.tsx';
import useSavePresetHandlers from '../../../../hooks/useSavePresetHandlers.ts';

export default function BassSynthCard() {
  const bassSynth = useAppSelector((store) => store.song.currentSong.bassSynth);
  const {
    setStoreBassSynthWaveform,
    setStoreBassSynthFilterFrequency,
    setStoreBassSynthAttackChange,
    setStoreBassSynthDecayChange,
    setStoreBassSynthSustainChange,
    setStoreBassSynthReleaseChange,
  } = useBassSynthStoreChange();
  const { saveBassSynthHandler } = useSavePresetHandlers();

  return (
    <div className="flex flex-col items-center rounded-2xl ">
      <div className="flex items-center justify-between gap-4 2xl:w-full">
        <div className="2xl:text-xl  font-caps flex mb-4 gap-2 w-full">
          <BassSynthSvg className="2xl:h-6 2xl:w-6 w-4 h-4 fill-white mt-1 2xl:mb-1 stroke-2 stroke-white" />
          <h2>Bass Synth</h2>
        </div>
        <SaveButton onClick={() => saveBassSynthHandler(bassSynth)} />
      </div>
      <div className="grid grid-cols-2 grid-rows-3 2xl:gap-x-4 gap-y-8">
        {/* Row One */}
        <Knob title={'Waveform'}>
          <WaveformKnob
            color={'#F59E0B'}
            level={toneWaveFormToInput(bassSynth.waveform)}
            storeSetter={setStoreBassSynthWaveform}
            toneSetter={setToneBassSynthWaveform}
          />
        </Knob>
        <Knob title={'Filter Frequency'}>
          <FrequencyKnob
            color={'#F59E0B'}
            level={bassSynth.filterFrequency}
            storeSetter={setStoreBassSynthFilterFrequency}
            toneSetter={setToneBassFilterFrequency}
          />
        </Knob>
        {/* Row Two */}
        <Knob title={'Attack'}>
          <MainKnob
            color={'#F59E0B'}
            level={bassSynth.attack}
            storeSetter={setStoreBassSynthAttackChange}
            toneSetter={setToneBassSynthAttack}
          />
        </Knob>
        <Knob title={'Decay'}>
          <MainKnob
            level={bassSynth.decay}
            color={'#F59E0B'}
            storeSetter={setStoreBassSynthDecayChange}
            toneSetter={setToneBassSynthDecay}
          />
        </Knob>
        <Knob title="Sustain">
          <MainKnob
            color={'#F59E0B'}
            level={bassSynth.sustain}
            storeSetter={setStoreBassSynthSustainChange}
            toneSetter={setToneBassSynthSustain}
          />
        </Knob>
        <Knob title="Release">
          <MainKnob
            color={'#F59E0B'}
            level={bassSynth.release}
            storeSetter={setStoreBassSynthReleaseChange}
            toneSetter={setToneBassSynthRelease}
          />
        </Knob>
      </div>
    </div>
  );
}
