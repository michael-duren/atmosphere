import { SiMusicbrainz } from 'react-icons/si';
import DarkListBox, { Item } from '../../../Ui/Listboxes/DarkListBox.tsx';
import { MusicalKey } from '../../../../models/types/musicalKey.ts';
import { MusicalScale } from '../../../../models/types/musicalScale.ts';
import { musicalKeyOptions, musicalScaleOptions } from './patternOptions.ts';
import { useAppSelector } from '../../../../store/hooks/useAppSelector.ts';
import UseMelodicPatternStoreChange from '../../../../hooks/useMelodicPatternStoreChange.ts';

export default function MelodicPattern() {
  const key = useAppSelector(
    (state) => state.song.currentSong.melodicPattern.key
  );

  const { setStoreMelodicPatternKeyChange } = UseMelodicPatternStoreChange();

  return (
    <div className="p-8">
      <h2 className="text-2xl font-caps flex gap-2">
        <SiMusicbrainz /> Melodic Pattern
      </h2>
      {/* Generate parameters */}
      <div className="mt-4 flex-col flex gap-4">
        <div
          style={{ zIndex: 50 }}
          className="flex-col  gap-2 justify-center items-center"
        >
          <div className="font-caps">Key</div>
          <DarkListBox
            currentItem={key}
            setCurrentItem={(item: Item) =>
              setStoreMelodicPatternKeyChange(item as MusicalKey)
            }
            items={musicalKeyOptions}
          />
        </div>
        <div className="flex-col gap-2 justify-center items-center z-auto">
          <div className="font-caps">Scale</div>
          {/*<DarkListBox*/}
          {/*  currentItem={scale}*/}
          {/*  setCurrentItem={setScale}*/}
          {/*  items={musicalScaleOptions}*/}
          {/*/>*/}
        </div>
      </div>
    </div>
  );
}
