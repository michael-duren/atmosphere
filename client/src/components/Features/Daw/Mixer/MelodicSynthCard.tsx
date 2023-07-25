// MelodicSynthCard.tsx
import { ReactComponent as MelodicSynthSvg } from '../../../../assets/icons/MelodicSynth.svg';
import Knob from '../../../Ui/Knobs/Knob.tsx';
import WaveformKnob from '../../../Ui/Knobs/WaveformKnob.tsx';
import { useAppSelector } from '../../../../store/hooks/useAppSelector.ts';
import { selectSong } from '../../../../store/slices/songSlice.ts';
import {
  simpleToneWaveFormToInput,
  toneWaveFormToInput,
} from '../../../../tone/utils/transformToInputValues.ts';
import {
  setToneMelodicSynthAttack,
  setToneMelodicSynthChorus,
  setToneMelodicSynthFilterFrequency,
  setToneMelodicSynthFilterMod,
  setToneMelodicSynthFilterType,
  setToneMelodicSynthLfoFreq,
  setToneMelodicSynthLfoWaveform,
  setToneMelodicSynthMetal,
  setToneMelodicSynthRelease,
  setToneMelodicSynthSustain,
  setToneMelodicSynthWaveform,
  setToneMelodicSynthDecay,
} from '../../../../tone/setters/setToneMelodicSynthParams.ts';
import { useMelodicSynthChange } from '../../../../hooks/useMelodicSynthChange.ts';
import MainKnob from '../../../Ui/Knobs/MainKnob.tsx';
import FrequencyKnob from '../../../Ui/Knobs/FrequencyKnob.tsx';
import FilterKnob from '../../../Ui/Knobs/FilterKnob.tsx';
import NoteFrequencyKnob from '../../../Ui/Knobs/NoteFrequencyKnob.tsx';

const MelodicSynthCard: React.FC = () => {
  const { currentSong } = useAppSelector(selectSong);
  const {
    setStoreMelodicSynthWaveformChange,
    setStoreMelodicSynthChorusChange,
    setStoreMelodicSynthAttackChange,
    setStoreMelodicSynthDecayChange,
    setStoreMelodicSynthSustainChange,
    setStoreMelodicSynthReleaseChange,
    setStoreMelodicSynthLfoWaveformChange,
    setStoreMelodicSynthMetalChange,
    setStoreMelodicSynthFilterFrequencyChange,
    setStoreMelodicSynthFilterTypeChange,
    setStoreMelodicSynthLfoFreqChange,
    setStoreMelodicSynthFilterModChange,
  } = useMelodicSynthChange();

  return (
    <div className="flex flex-col items-center rounded-2xl justify-center pl-4">
      <div className="w-full items-end gap-2 font-caps flex mb-4">
        <MelodicSynthSvg className="h-8 w-8  fill-white stroke-2 stroke-white" />
        <h2 className="text-xl">Melodic Synth</h2>
      </div>
      <div className="grid grid-cols-4 grid-rows-3 gap-x-4 gap-y-8">
        {/* Row One */}
        <Knob title="Waveform">
          <WaveformKnob
            color="#7C3AED"
            level={toneWaveFormToInput(currentSong.melodicSynth.waveform)}
            storeSetter={setStoreMelodicSynthWaveformChange}
            toneSetter={setToneMelodicSynthWaveform}
          />
        </Knob>
        <Knob title="Chorus">
          <MainKnob
            color="#7C3AED"
            level={currentSong.melodicSynth.chorus}
            storeSetter={setStoreMelodicSynthChorusChange}
            toneSetter={setToneMelodicSynthChorus}
          />
        </Knob>
        <Knob title="Filter Freq">
          <FrequencyKnob
            color="#7C3AED"
            level={currentSong.melodicSynth.filterFrequency}
            storeSetter={setStoreMelodicSynthFilterFrequencyChange}
            toneSetter={setToneMelodicSynthFilterFrequency}
          />
        </Knob>
        <Knob title="Filter Shape">
          <FilterKnob
            color="#7C3AED"
            level={currentSong.melodicSynth.filterType}
            storeSetter={setStoreMelodicSynthFilterTypeChange}
            toneSetter={setToneMelodicSynthFilterType}
          />
        </Knob>
        {/* Row Two */}
        <Knob title="Filter Mod">
          <MainKnob
            color="#7C3AED"
            level={currentSong.melodicSynth.filterMod}
            storeSetter={setStoreMelodicSynthFilterModChange}
            toneSetter={setToneMelodicSynthFilterMod}
          />
        </Knob>
        <Knob title="Metal">
          <MainKnob
            color="#7C3AED"
            level={currentSong.melodicSynth.metal}
            storeSetter={setStoreMelodicSynthMetalChange}
            toneSetter={setToneMelodicSynthMetal}
          />
        </Knob>
        <Knob title="Lfo Freq">
          <NoteFrequencyKnob
            color="#7C3AED"
            level={currentSong.melodicSynth.lfoFrequency}
            storeSetter={setStoreMelodicSynthLfoFreqChange}
            toneSetter={setToneMelodicSynthLfoFreq}
          />
        </Knob>
        <Knob title="Lfo Shape">
          <WaveformKnob
            color="#7C3AED"
            level={simpleToneWaveFormToInput(currentSong.melodicSynth.lfoShape)}
            storeSetter={setStoreMelodicSynthLfoWaveformChange}
            toneSetter={setToneMelodicSynthLfoWaveform}
          />
        </Knob>
        {/* Row Three */}
        <Knob title="Attack">
          <MainKnob
            color="#4F46E5"
            level={currentSong.melodicSynth.attack}
            storeSetter={setStoreMelodicSynthAttackChange}
            toneSetter={setToneMelodicSynthAttack}
          />
        </Knob>
        <Knob title="Decay">
          <MainKnob
            color="#4F46E5"
            level={currentSong.melodicSynth.decay}
            storeSetter={setStoreMelodicSynthDecayChange}
            toneSetter={setToneMelodicSynthDecay}
          />
        </Knob>
        <Knob title="Sustain">
          <MainKnob
            color="#4F46E5"
            level={currentSong.melodicSynth.sustain}
            storeSetter={setStoreMelodicSynthSustainChange}
            toneSetter={setToneMelodicSynthSustain}
          />
        </Knob>
        <Knob title="Release">
          <MainKnob
            color="#4F46E5"
            level={currentSong.melodicSynth.release}
            storeSetter={setStoreMelodicSynthReleaseChange}
            toneSetter={setToneMelodicSynthRelease}
          />
        </Knob>
      </div>
    </div>
  );
};

export default MelodicSynthCard;
