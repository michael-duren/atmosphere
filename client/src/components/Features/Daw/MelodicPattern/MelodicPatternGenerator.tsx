import DarkListBox, { Item } from '../../../Ui/Listboxes/DarkListBox.tsx';
import { MusicalKey } from '../../../../models/types/musicalKey.ts';
import {
  durationIntervalOptions,
  lengthOptions,
  musicalKeyOptions,
  musicalScaleOptions,
  patternTypeOptions,
  timeIntervalOptions,
  transposeOptions,
} from './patternOptions.ts';
import { MusicalScale } from '../../../../models/types/musicalScale.ts';
import { PatternName } from 'tone/build/esm/event/PatternGenerator';
import { NoteType } from '../../../../models/types/noteType.ts';
import UseMelodicPatternStoreChange from '../../../../hooks/useMelodicPatternStoreChange.ts';
import { useAppSelector } from '../../../../store/hooks/useAppSelector.ts';
import { melodicPattern } from '../../../../tone/singleton.ts';
import toast from 'react-hot-toast';
import { useState } from 'react';

export default function MelodicPatternGenerator() {
  const isPlaying = useAppSelector((store) => store.transport.isPlaying);
  const [currentNote, setCurrentNote] = useState<MusicalKey | null>(null);
  const noteChangeHandler = (note: MusicalKey) => setCurrentNote(note);
  melodicPattern.noteChangeHandler = noteChangeHandler;
  const key = useAppSelector(
    (store) => store.song.currentSong.melodicPattern.key
  );
  const scale = useAppSelector(
    (store) => store.song.currentSong.melodicPattern.scale
  );
  const transpose = useAppSelector(
    (store) => store.song.currentSong.melodicPattern.transpose
  );
  const patternType = useAppSelector(
    (store) => store.song.currentSong.melodicPattern.patternType
  );
  const timeInterval = useAppSelector(
    (store) => store.song.currentSong.melodicPattern.timeInterval
  );
  const noteDuration = useAppSelector(
    (store) => store.song.currentSong.melodicPattern.noteDuration
  );
  const patternLength = useAppSelector(
    (store) => store.song.currentSong.melodicPattern.length
  );

  const {
    setStoreMelodicPatternKeyChange,
    setStoreMelodicPatternScaleChange,
    setStoreMelodicPatternLengthChange,
    setStoreMelodicPatternTimeIntervalChange,
    setStoreMelodicPatternNoteDurationChange,
    setStoreMelodicPatternTypeChange,
    setStoreMelodicPatternTransposeChange,
  } = UseMelodicPatternStoreChange();

  const updatePattern = () => {
    melodicPattern.updatePattern();
    toast.success('Melodic Pattern Updated', {
      position: 'top-left',
    });
  };

  const generatePattern = () => {
    melodicPattern.generateNewPattern();
    toast.success('New Pattern Generated', {
      position: 'top-left',
    });
  };

  return (
    <div className="mt-4 grid grid-cols-2 flex-1 gap-4">
      {/* KEY */}
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
      {/* SCALE */}
      <div
        className="flex-col gap-2 justify-center items-center z-auto"
        style={{ zIndex: 50 }}
      >
        <div className="font-caps">Scale</div>
        <DarkListBox
          currentItem={scale}
          setCurrentItem={(item: Item) =>
            setStoreMelodicPatternScaleChange(item as MusicalScale)
          }
          items={musicalScaleOptions}
        />
      </div>
      {/* TRANSPOSE */}
      <div
        className="flex-col gap-2 justify-center items-center z-auto"
        style={{ zIndex: 49 }}
      >
        <div className="font-caps">Transpose</div>
        <DarkListBox
          currentItem={transpose}
          setCurrentItem={(item: Item) =>
            setStoreMelodicPatternTransposeChange(item as number)
          }
          items={transposeOptions}
        />
      </div>
      {/* PATTERN TYPE */}
      <div
        className="flex-col gap-2 justify-center items-center z-auto"
        style={{ zIndex: 49 }}
      >
        <div className="font-caps">Pattern Type</div>
        <DarkListBox
          currentItem={patternType}
          setCurrentItem={(item: Item) =>
            setStoreMelodicPatternTypeChange(item as PatternName)
          }
          items={patternTypeOptions}
        />
      </div>
      {/* TIME INTERVAL */}
      <div
        className="flex-col gap-2 justify-center items-center z-auto"
        style={{ zIndex: 48 }}
      >
        <div className="font-caps">Time Interval</div>
        <DarkListBox
          currentItem={timeInterval}
          setCurrentItem={(item: Item) =>
            setStoreMelodicPatternTimeIntervalChange(item as NoteType)
          }
          items={timeIntervalOptions}
        />
      </div>
      {/* NOTE DURATION */}
      <div
        className="flex-col gap-2 justify-center items-center z-auto"
        style={{ zIndex: 48 }}
      >
        <div className="font-caps">Note Duration</div>
        <DarkListBox
          currentItem={noteDuration}
          setCurrentItem={(item: Item) =>
            setStoreMelodicPatternNoteDurationChange(item as NoteType)
          }
          items={durationIntervalOptions}
        />
      </div>
      {/* PATTERN LENGTH */}
      <div
        className="flex-col gap-2 justify-center items-center z-auto"
        style={{ zIndex: 47 }}
      >
        <div className="font-caps">Pattern Length</div>
        <DarkListBox
          currentItem={patternLength}
          setCurrentItem={(item: Item) =>
            setStoreMelodicPatternLengthChange(item as number)
          }
          items={lengthOptions}
        />
      </div>
      <div
        className="flex-col gap-2 justify-center items-center "
        style={{ zIndex: 47 }}
      >
        <div className="font-caps">Playing</div>
        <div className={`${isPlaying ? 'animate-pulse' : ''} text-center`}>
          <span className="block rounded-xl  p-1 shadow-md shadow-blue-600 w-10">
            {currentNote}
          </span>
        </div>
      </div>

      <div className="flex items-center ">
        <button
          onClick={updatePattern}
          className="inline-flex mt-4 w-24 justify-center opacity-90 shadow-md shadow-blue-950 rounded-xl border border-transparent bg-blue-900 px-4 py-2 text-sm font-medium text-blue-100 
            hover:bg-blue-800 focus:outline-none focus-visible:ring-2 active:scale-105 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
          Update
        </button>
      </div>

      <div className="flex items-center ">
        <button
          onClick={generatePattern}
          className="inline-flex mt-4 justify-center opacity-90 shadow-md shadow-amber-950 rounded-xl border border-transparent bg-amber-900 px-4 py-2 text-sm font-medium text-amber-100 
            hover:bg-amber-800 focus:outline-none focus-visible:ring-2 active:scale-105 focus-visible:ring-amber-500 focus-visible:ring-offset-2"
        >
          Generate
        </button>
      </div>
    </div>
  );
}
