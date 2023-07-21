import { useEffect, useRef, useState } from 'react';
import * as Tone from 'tone';
import { useAppSelector } from '../../../store/hooks/useAppSelector.ts';
import { selectSong } from '../../../store/slices/songSlice.ts';
import { drumKit } from '../../../tone/singleton.ts';

type Track = {
  id: number;
  sampler: Tone.Sampler;
};

export default function DrumSequencer() {
  const { patternLength } = useAppSelector(selectSong).currentSong.kitPattern;
  const [isPlaying, setIsPlaying] = useState(false);

  const trackRefs = useRef<Track[]>([]);
  const stepRefs = useRef<HTMLInputElement[][]>([[]]);
  const lampRefs = useRef<HTMLInputElement[]>([]);
  const seqRef = useRef<Tone.Sequence | null>(null);
  const stepIds = [...Array(patternLength).keys()];

  useEffect(() => {
    seqRef.current = new Tone.Sequence(
      (time, step) => {
        if (stepRef.current[drumKit.bd.id].step.checked) {
          drumKit.bd.sampler.triggerAttackRelease(drumKit.note, '8n', time);
        }
        if (stepRef.current[drumKit.bd.id].step.checked) {
          drumKit.sd.sampler.triggerAttackRelease(drumKit.note, '8n', time);
        }
        if (stepRef.current[drumKit.bd.id].step.checked) {
          drumKit.cl.sampler.triggerAttackRelease(drumKit.note, '8n', time);
        }
        if (stepRef.current[drumKit.bd.id].step.checked) {
          drumKit.ch.sampler.triggerAttackRelease(drumKit.note, '8n', time);
        }
        lampRefs.current[step].checked = true;
      },
      [...stepIds],
      '16n'
    ).start(0);
  }, [patternLength]);

  return (
    <div>
      <h2>Drum Sequencer</h2>
    </div>
  );
}
