import { useAppDispatch } from '../../../store/hooks/useAppDispatch.ts';
import { toggleDrumStep } from '../../../store/slices/songSlice.ts';
import { Drum } from '../../../models/song.ts';

interface Props {
  instrument: Drum;
  drumPattern: boolean[];
  drumRef: React.RefObject<HTMLInputElement[]>;
}

export default function Track({ instrument, drumPattern, drumRef }: Props) {
  const dispatch = useAppDispatch();

  return (
    <div className="flex gap-4 items-center">
      <div className="w-10">{instrument.name}</div>
      <div className="flex gap-x-4">
        {
          // drumPattern is a boolean array of the tracks steps
          drumPattern.map((step, index) => {
            const isDivisibleByFour = (index + 1) % 4 === 0;
            return (
              <label
                className={`relative max-w-[2.5rem] ${
                  isDivisibleByFour && 'mr-4'
                } `}
                key={index}
              >
                <input
                  className="opacity-0 absolute top-0 left-0 cursor-pointer h-10 w-10 peer"
                  ref={(elm) => {
                    if (!elm) return;
                    drumRef.current![index] = elm;
                  }}
                  type="checkbox"
                  checked={step}
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
                       peer-checked:bg-blue-500 peer-checked:bg-opacity-70 w-10 h-10"
                />
              </label>
            );
          })
        }
      </div>
    </div>
  );
}
