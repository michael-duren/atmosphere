import MainFader from '../../../Ui/Faders/MainFader.tsx';
import { useAppSelector } from '../../../../store/hooks/useAppSelector.ts';
import {
  selectSong,
  setBassVolume,
  setDrumVolume,
  setMasterVolume,
  setMelodicVolume,
} from '../../../../store/slices/songSlice.ts';
import * as Tone from 'tone';
import {
  volume,
  bassSynth,
  melodicSynth,
  drumKit,
} from '../../../../tone/singleton.ts';
import { bottomRange } from '../../../../utils/number.ts';

export default function FadersCard() {
  const { currentSong } = useAppSelector(selectSong);

  const handleMasterVolume = (num: number) => {
    volume.volume.value = Tone.gainToDb(bottomRange(num));
  };
  const handleDrumVolume = (num: number) => {
    drumKit.bd.sampler.volume.value = Tone.gainToDb(bottomRange(num));
    drumKit.sd.sampler.volume.value = Tone.gainToDb(bottomRange(num));
    drumKit.cl.sampler.volume.value = Tone.gainToDb(bottomRange(num));
    drumKit.ch.sampler.volume.value = Tone.gainToDb(bottomRange(num));
  };
  const handleBassVolume = (num: number) => {
    bassSynth.synth.volume.value = Tone.gainToDb(bottomRange(num));
  };

  const handleMelodicVolume = (num: number) => {
    melodicSynth.synth.volume.value = Tone.gainToDb(bottomRange(num));
  };

  return (
    <div className=" flex justify-between gap-8 border-red-600">
      {/*Drum Volume*/}
      <div className="flex flex-col items-center">
        <MainFader
          volume={currentSong.drumVolume}
          backgroundColor="bg-blue-500"
          setTone={handleDrumVolume}
          setStore={setDrumVolume}
        />
        <div className="text-xs font-caps">DRUMS</div>
      </div>
      {/*Bass Volume*/}
      <div className="flex flex-col items-center">
        <MainFader
          volume={currentSong.bassVolume}
          backgroundColor="bg-green-500"
          setTone={handleBassVolume}
          setStore={setBassVolume}
        />
        <div className="text-xs font-caps">BASS</div>
      </div>
      {/*Melodic Volume*/}
      <div className="flex flex-col items-center">
        <MainFader
          volume={currentSong.melodicVolume}
          backgroundColor="bg-violet-500"
          setTone={handleMelodicVolume}
          setStore={setMelodicVolume}
        />
        <div className="text-xs font-caps">MELODY</div>
      </div>
      {/*Master Volume*/}
      <div className="flex flex-col items-center">
        <MainFader
          volume={currentSong.masterVolume}
          backgroundColor="bg-red-500"
          setTone={handleMasterVolume}
          setStore={setMasterVolume}
        />
        <div className="text-xs font-caps">MAIN</div>
      </div>
    </div>
  );
}
