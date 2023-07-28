import { SiMusicbrainz } from 'react-icons/si';
import DarkListBox from '../../Ui/Listboxes/DarkListBox.tsx';
import { useState } from 'react';
import { MusicalKey } from '../../../models/types/musicalKey.ts';
import { MusicalScale } from '../../../models/types/musicalScale.ts';

export default function MelodicPattern() {
  type MusicalKeyArr = { id: number; name: string; value: MusicalKey }[];
  const musicalKeys: MusicalKeyArr = [
    { id: 1, name: 'C', value: 'C' },
    { id: 2, name: 'C#', value: 'C#' },
    { id: 3, name: 'D', value: 'D' },
    { id: 4, name: 'D#', value: 'D#' },
    { id: 5, name: 'E', value: 'E' },
    { id: 6, name: 'F', value: 'F' },
    { id: 7, name: 'F#', value: 'F#' },
    { id: 8, name: 'G', value: 'G' },
    { id: 9, name: 'G#', value: 'G#' },
    { id: 10, name: 'A', value: 'A' },
    { id: 11, name: 'Bb', value: 'Bb' },
    { id: 12, name: 'B', value: 'B' },
  ];
  const [key, setKey] = useState<MusicalKey>('C');
  const [scale, setScale] = useState<MusicalScale>('major');

  return (
    <div className="p-8">
      <h2 className="text-2xl font-caps flex gap-2">
        <SiMusicbrainz /> Melodic Pattern
      </h2>
      {/* Generate parameters */}
      <div className="mt-4">
        <div className="flex-col gap-2 justify-center items-center">
          <div className="font-caps">Key</div>
          <DarkListBox setSelectedValue={setKey} items={musicalKeys} />
        </div>
      </div>
    </div>
  );
}
