import { useAppDispatch } from '../../../../store/hooks/useAppDispatch.ts';
import {
  selectSong,
  toggleDrumStep,
} from '../../../../store/slices/songSlice.ts';
import { Drum } from '../../../../models/song.ts';
import { useAppSelector } from '../../../../store/hooks/useAppSelector.ts';

interface Props {
  instrument: Drum;
  drumPattern: boolean[];
  drumRef: React.RefObject<HTMLInputElement[]>;
}

export default function Track({ instrument, drumPattern, drumRef }: Props) {
  const dispatch = useAppDispatch();
  const { currentSong } = useAppSelector(selectSong);
  const {
    kitPattern: { patternLength },
  } = currentSong;

  return (
    <div className="flex flex-col sm-lg:flex-row gap-4 items-center">
      <div className="w-10">{instrument.name}</div>
      <div className="flex flex-col sm-lg:flex-row gap-y-2 sm-lg:gap-y-0 sm-lg:gap-x-4">
        {
          // the length of the array is defined by the patternLength which is set by the user
          // and lives in the songSlice > currentSong > kitPattern > patternLength
          Array.from({ length: patternLength }, (_, index) => {
            const isDivisibleByFour = (index + 1) % 4 === 0;
            return (
              <label
                className={`relative max-w-[2.5rem] ${
                  isDivisibleByFour && 'sm-lg:mr-4 sm-lg:mb-0 mb-4'
                } `}
                key={index}
              >
                <input
                  className="opacity-0 absolute top-0 left-0 cursor-pointer lg:h-8 lg:w-8 h-6 w-6 2xl:h-10 2xl:w-10 peer"
                  ref={(elm) => {
                    if (!elm) return;
                    drumRef.current![index] = elm;
                  }}
                  type="checkbox"
                  checked={drumPattern[index]}
                  onChange={() =>
                    dispatch(
                      toggleDrumStep({
                        drumName: instrument.drumTrackSteps,
                        step: index,
                      })
                    )
                  }
                />
                <div
                  className="peer-hover:bg-opacity-60 rounded-md  0 hover:bg-opacity-90 bg-gray-transparent
                peer-checked:peer-hover:bg-opacity-100
                       peer-checked:bg-blue-500 peer-checked:bg-opacity-70 lg:w-8 lg:h-8 h-6 w-6 2xl:w-10 2xl:h-10"
                />
              </label>
            );
          })
        }
      </div>
    </div>
  );
}
