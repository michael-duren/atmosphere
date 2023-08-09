import { SiMusicbrainz } from 'react-icons/si';
import MelodicPatternGenerator from './MelodicPatternGenerator.tsx';
import Oscilloscopes from './Oscilloscopes.tsx';
import SaveButton from '../../../Ui/Buttons/SaveButton.tsx';
import { useAppDispatch } from '../../../../store/hooks/useAppDispatch.ts';
import {
  setPresetModalData,
  setPresetModalDispatchType,
  setPresetModalOpen,
  setPresetModalType,
} from '../../../../store/slices/commonSlice.ts';
import { useAppSelector } from '../../../../store/hooks/useAppSelector.ts';
import { PRESET_ACTIONS } from '../../../../store/actions/presetActions.ts';

export default function MelodicPattern() {
  const dispatch = useAppDispatch();
  const melodicPattern = useAppSelector(
    (state) => state.song.currentSong.melodicPattern
  );
  const saveMelodicPatternHandler = () => {
    dispatch(setPresetModalData(melodicPattern));
    dispatch(setPresetModalType('Melodic Pattern'));
    if (melodicPattern.presetName) {
      dispatch(
        setPresetModalDispatchType(PRESET_ACTIONS.UPDATE_MELODIC_PATTERN_ASYNC)
      );
    } else {
      dispatch(
        setPresetModalDispatchType(PRESET_ACTIONS.CREATE_MELODIC_PATTERN_ASYNC)
      );
    }

    dispatch(setPresetModalOpen(true));
  };

  return (
    <div className="p-4 flex-1">
      <div className="flex justify-between">
        <h2 className="text-2xl font-caps flex gap-2">
          <SiMusicbrainz /> Melodic Pattern
        </h2>
        <SaveButton size={18} onClick={saveMelodicPatternHandler} />
      </div>
      <div className="flex">
        <MelodicPatternGenerator />
        <div className="flex-1">
          <Oscilloscopes />
        </div>
      </div>
    </div>
  );
}
