import { GiAbstract051 } from 'react-icons/gi';
import MelodicSynthCard from './MelodicSynthCard.tsx';
import BassSynthCard from './BassSynthCard.tsx';
import EffectListCard from './EffectListCard.tsx';
import FadersCard from './FadersCard.tsx';

export default function Mixer() {
  return (
    <div className=" min-w-[50vw] w-full  items-end flex flex-col">
      <h2 className="uppercase flex gap-4 items-center font-caps text-2xl">
        MIX{' '}
        <span>
          <GiAbstract051 />
        </span>
      </h2>

      <div className="flex w-full px-8 gap-x-8 items-center justify-between">
        <MelodicSynthCard />
        <BassSynthCard />
        <EffectListCard />
        <FadersCard />
      </div>
    </div>
  );
}
