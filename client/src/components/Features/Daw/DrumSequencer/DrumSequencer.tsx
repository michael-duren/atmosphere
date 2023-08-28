import { useEffect, useRef } from 'react';
import * as Tone from 'tone';
import { useAppSelector } from '../../../../store/hooks/useAppSelector.ts';
import { selectSong } from '../../../../store/slices/songSlice.ts';
import { drumKit } from '../../../../tone/singleton.ts';
import { GiAbstract016 } from 'react-icons/gi';
import Transport from './Transport.tsx';
import DrumTrack from './DrumTrack.tsx';

export default function DrumSequencer() {
  const { currentSong } = useAppSelector(selectSong);
  const lampRefs = useRef<HTMLInputElement[]>([]);
  const seqRef = useRef<Tone.Sequence | null>(null);
  const stepIds = [...Array(currentSong.kitPattern.patternLength).keys()];
  const bdRef = useRef<HTMLInputElement[]>([]);
  const sdRef = useRef<HTMLInputElement[]>([]);
  const clRef = useRef<HTMLInputElement[]>([]);
  const chRef = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    seqRef.current = new Tone.Sequence(
      (time, step) => {
        if (bdRef.current![step].checked) {
          drumKit.bd.sampler.triggerAttackRelease(drumKit.note, '8n', time);
        }
        if (sdRef.current![step].checked) {
          drumKit.sd.sampler.triggerAttackRelease(drumKit.note, '8n', time);
        }
        if (clRef.current![step].checked) {
          drumKit.cl.sampler.triggerAttackRelease(drumKit.note, '8n', time);
        }
        if (chRef.current![step].checked) {
          drumKit.ch.sampler.triggerAttackRelease(drumKit.note, '8n', time);
        }
        lampRefs.current[step].checked = true;
      },
      [...stepIds],
      '16n'
    ).start(0);

    return () => {
      seqRef.current?.dispose();
    };
  }, [stepIds]);

  return (
    <div className="flex w-full  items-center flex-col rounded-xl px-8    gap-4 justify-center">
      <div className="flex w-full justify-between">
        <Transport />
        <h2 className="font-caps flex gap-4 items-center text-2xl">
          SEQUENCER{' '}
          <span>
            <GiAbstract016 />
          </span>
        </h2>
      </div>
      <div className="grid grid-rows-4 gap-5">
        <div className="flex gap-x-4">
          <div className="w-10"></div>
          {stepIds.map((step) => {
            const isDivisibleByFour = (step + 1) % 4 === 0 || step + 1 === 16;
            return (
              <label
                className={`flex max-w-[2.5rem] lg:h-8 lg:w-8 h-6 w-6  2xl:w-10 2xl:h-10 items-center ${
                  isDivisibleByFour && 'mr-4'
                } justify-center`}
                key={step}
              >
                <input
                  type="radio"
                  name="lamp"
                  id={`lamp-${step}`}
                  disabled
                  ref={(elm) => {
                    if (!elm) return;
                    lampRefs.current[step] = elm;
                  }}
                  className={`whitespace-nowrap peer p-0 m-[-1px] h-[1px] w-[1px] absolute `}
                />
                <div className="2xl:w-6 lg:w-4 w-3 my-0 mx-2 peer-checked:bg-blue-500  2xl:h-6 lg:h-4 h-3 bg-gray-transparent peer-checked:bg-opacity-70  rounded-full"></div>
              </label>
            );
          })}
        </div>
        <DrumTrack
          drumRef={chRef}
          instrument={{ ...drumKit.ch, drumTrackSteps: 'chSteps' }}
          drumPattern={currentSong.kitPattern.chSteps}
        />
        <DrumTrack
          drumRef={clRef}
          instrument={{ ...drumKit.cl, drumTrackSteps: 'clSteps' }}
          drumPattern={currentSong.kitPattern.clSteps}
        />
        <DrumTrack
          drumRef={sdRef}
          instrument={{ ...drumKit.sd, drumTrackSteps: 'sdSteps' }}
          drumPattern={currentSong.kitPattern.sdSteps}
        />
        <DrumTrack
          drumRef={bdRef}
          instrument={{ ...drumKit.bd, drumTrackSteps: 'bdSteps' }}
          drumPattern={currentSong.kitPattern.bdSteps}
        />
      </div>
    </div>
  );
}
