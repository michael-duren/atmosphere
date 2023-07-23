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
} from '../../../../tone/setters/setToneMelodicSynthParams.ts';
import { useMelodicSynthChange } from '../../../../hooks/useMelodicSynthChange.ts';
import MainKnob from '../../../Ui/Knobs/MainKnob.tsx';
import FrequencyKnob from '../../../Ui/Knobs/FrequencyKnob.tsx';

interface MelodicSynthCardProps {
  setToneMelodicSynthDecay: (num: number) => void;
}

export default function MelodicSynthCard({
  setToneMelodicSynthDecay,
}: MelodicSynthCardProps) {
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
    <div className="flex items-center rounded-2xl justify-center  p-10">
      <div className="grid grid-cols-4 grid-rows-3 gap-x-4  gap-y-4">
        {/*  Row One */}
        <div className="flex flex-col items-center gap-2">
          <div className="text-xs font-caps">Waveform</div>
          <WaveformKnob
            color={'#7C3AED'}
            level={toneWaveFormToInput(currentSong.melodicSynth.waveform)}
            storeSetter={setStoreMelodicSynthWaveformChange}
            toneSetter={setToneMelodicSynthWaveform}
          />
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="text-xs font-caps">Chorus</div>
          <MainKnob
            color={'#7C3AED'}
            level={currentSong.melodicSynth.chorus}
            storeSetter={setStoreMelodicSynthChorusChange}
            toneSetter={setToneMelodicSynthChorus}
          />
        </div>

        <div className="flex flex-col items-center gap-2">
          <div className="text-xs font-caps">Filter Freq</div>
          <FrequencyKnob
            color={'#7C3AED'}
            level={currentSong.melodicSynth.filterFrequency}
            storeSetter={setStoreMelodicSynthFilterFrequencyChange}
            toneSetter={setToneMelodicSynthFilterFrequency}
          />
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="text-xs font-caps">Filter Shape</div>
          <MainKnob
            color={'#7C3AED'}
            level={currentSong.melodicSynth.filterType}
            storeSetter={setStoreMelodicSynthFilterTypeChange}
            toneSetter={setToneMelodicSynthFilterType}
          />
        </div>
        {/*  Row 2 */}
        <div className="flex flex-col items-center gap-2">
          <div className="text-xs font-caps">Filter Mod</div>
          <MainKnob
            color={'#7C3AED'}
            level={currentSong.melodicSynth.filterMod}
            storeSetter={setStoreMelodicSynthFilterModChange}
            toneSetter={setToneMelodicSynthFilterMod}
          />
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="text-xs font-caps">Metal</div>
          <MainKnob
            color={'#7C3AED'}
            level={currentSong.melodicSynth.metal}
            storeSetter={setStoreMelodicSynthMetalChange}
            toneSetter={setToneMelodicSynthMetal}
          />
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="text-xs font-caps">Lfo Freq</div>
          <MainKnob
            color={'#7C3AED'}
            level={currentSong.melodicSynth.lfoFrequency}
            storeSetter={setStoreMelodicSynthLfoFreqChange}
            toneSetter={setToneMelodicSynthLfoFreq}
          />
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="text-xs font-caps">Lfo Shape</div>
          <WaveformKnob
            color={'#7C3AED'}
            level={simpleToneWaveFormToInput(currentSong.melodicSynth.lfoShape)}
            storeSetter={setStoreMelodicSynthLfoWaveformChange}
            toneSetter={setToneMelodicSynthLfoWaveform}
          />
        </div>

        {/* Row 3 */}
        <div className="flex flex-col items-center gap-2">
          <div className="text-xs font-caps">Attack</div>
          <MainKnob
            color={'#4F46E5'}
            level={currentSong.melodicSynth.attack}
            storeSetter={setStoreMelodicSynthAttackChange}
            toneSetter={setToneMelodicSynthAttack}
          />
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="text-xs font-caps">Decay</div>
          <MainKnob
            color={'#4F46E5'}
            level={currentSong.melodicSynth.decay}
            storeSetter={setStoreMelodicSynthDecayChange}
            toneSetter={setToneMelodicSynthDecay}
          />
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="text-xs font-caps">Sustain</div>
          <MainKnob
            color={'#4F46E5'}
            level={currentSong.melodicSynth.sustain}
            storeSetter={setStoreMelodicSynthSustainChange}
            toneSetter={setToneMelodicSynthSustain}
          />
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="text-xs font-caps">Release</div>
          <MainKnob
            color={'#4F46E5'}
            level={currentSong.melodicSynth.release}
            storeSetter={setStoreMelodicSynthReleaseChange}
            toneSetter={setToneMelodicSynthRelease}
          />
        </div>
      </div>
    </div>
  );
}
