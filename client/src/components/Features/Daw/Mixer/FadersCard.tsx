import MainFader from '../../../Ui/Faders/MainFader.tsx';
import { useAppSelector } from '../../../../store/hooks/useAppSelector.ts';
import {
  selectSong,
  setBassVolume,
  setDrumVolume,
  setMasterVolume,
  setMelodicVolume,
} from '../../../../store/slices/songSlice.ts';
import {
  setToneBassVolume,
  setToneDrumVolume,
  setToneMasterVolume,
  setToneMelodyVolume,
} from '../../../../tone/setters/setToneMixParams.ts';

export default function FadersCard() {
  const { currentSong } = useAppSelector(selectSong);

  return (
    <div className=" flex justify-between gap-8 border-red-600">
      {/*Drum Volume*/}
      <MainFader
        volume={currentSong.drumVolume}
        backgroundColor="bg-blue-500"
        setTone={setToneDrumVolume}
        setStore={setDrumVolume}
        title={'Drums'}
        shadowColor={'shadow-blue-500'}
      />
      {/*Bass Volume*/}
      <MainFader
        volume={currentSong.bassVolume}
        backgroundColor="bg-green-500"
        setTone={setToneBassVolume}
        setStore={setBassVolume}
        title={'Bass'}
        shadowColor={'shadow-green-500'}
      />
      {/*Melodic Volume*/}
      <MainFader
        volume={currentSong.melodicVolume}
        backgroundColor="bg-violet-500"
        setTone={setToneMelodyVolume}
        setStore={setMelodicVolume}
        title={'Melody'}
        shadowColor={'shadow-violet-500'}
      />
      {/*Master Volume*/}
      <MainFader
        volume={currentSong.masterVolume}
        backgroundColor="bg-red-500"
        setTone={setToneMasterVolume}
        setStore={setMasterVolume}
        title={'Master'}
        shadowColor={'shadow-red-500'}
      />
    </div>
  );
}
