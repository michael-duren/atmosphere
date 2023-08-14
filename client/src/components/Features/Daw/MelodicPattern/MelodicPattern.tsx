import { SiMusicbrainz } from 'react-icons/si';
import MelodicPatternGenerator from './MelodicPatternGenerator.tsx';
import Oscilloscopes from './Oscilloscopes.tsx';
import SaveButton from '../../../Ui/Buttons/SaveButton.tsx';
import useSavePresetHandlers from '../../../../hooks/useSavePresetHandlers.ts';
import { useAppSelector } from '../../../../store/hooks/useAppSelector.ts';

export default function MelodicPattern() {
  const { saveMelodicPatternHandler } = useSavePresetHandlers();
  const melodicPattern = useAppSelector(
    (store) => store.song.currentSong.melodicPattern
  );

  return (
    <div className="p-4 flex-1">
      <div className="flex justify-between">
        <h2 className="text-2xl font-caps flex gap-2">
          <SiMusicbrainz /> Melodic Pattern
        </h2>
        <SaveButton
          size={18}
          onClick={() => saveMelodicPatternHandler(melodicPattern)}
        />
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
