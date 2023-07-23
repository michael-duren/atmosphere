import WaveformKnob from '../../../Ui/Knobs/WaveformKnob.tsx';
import { useAppSelector } from '../../../../store/hooks/useAppSelector.ts';
import { selectSong } from '../../../../store/slices/songSlice.ts';
import { toneWaveFormToInput } from '../../../../tone/utils/transformToInputValues.ts';
import { setToneMelodicSynthWaveform } from '../../../../tone/setters/setToneMelodicSynthParams.ts';
import { useMelodicSynthChange } from '../../../../hooks/useMelodicSynthChange.ts';

export default function MelodicSynthCard() {
  const { currentSong } = useAppSelector(selectSong);
  const { handleMelodicSynthWaveformChange } = useMelodicSynthChange();

  return (
    <div className="flex items-center rounded-2xl justify-center  p-10">
      <div className="grid grid-cols-3 grid-rows-4 gap-x-8 gap-y-12">
        {/*  Row One */}
        <WaveformKnob
          color={'#7C3AED'}
          level={toneWaveFormToInput(currentSong.melodicSynth.waveform)}
          storeSetter={handleMelodicSynthWaveformChange}
          toneSetter={setToneMelodicSynthWaveform}
        />
      </div>
    </div>
  );
}
