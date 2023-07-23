import { useAppSelector } from '../../../../store/hooks/useAppSelector.ts';
import { selectSong } from '../../../../store/slices/songSlice.ts';
import EffectCard from './EffectCard.tsx';
import { GiAbstract053, GiAbstract098 } from 'react-icons/gi';
import { IconType } from 'react-icons';
import useMixChange from '../../../../hooks/useMixChange.ts';

interface EffectListCardProps {
  GiAbstract024: IconType;
}

export default function EffectListCard({ GiAbstract024 }: EffectListCardProps) {
  const { currentSong } = useAppSelector(selectSong);
  const {
    handleDistortionMixChange,
    handleDistortionAmountChange,
    handleDistortionFilterChange,
  } = useMixChange();

  return (
    <div>
      <EffectCard
        state={[
          {
            level: currentSong.distortion.mix,
            name: 'mix',
            setter: handleDistortionMixChange,
          },
          {
            level: currentSong.distortion.amount,
            name: 'amount',
            setter: handleDistortionAmountChange,
          },
          {
            level: currentSong.distortion.filter,
            name: 'filter',
            setter: handleDistortionFilterChange,
          },
        ]}
        color="#DC2626"
        title="Distortion"
        EffectIcon={GiAbstract098}
      />
      <EffectCard
        state={[
          {
            level: currentSong.distortion.mix,
            name: 'mix',
            setter: handleDistortionMixChange,
          },
          {
            level: currentSong.distortion.amount,
            name: 'amount',
            setter: handleDistortionAmountChange,
          },
          {
            level: currentSong.distortion.filter,
            name: 'filter',
            setter: handleDistortionFilterChange,
          },
        ]}
        color="#16A34A"
        title="Reverb"
        EffectIcon={GiAbstract024}
      />
      <EffectCard
        state={[
          {
            level: currentSong.distortion.mix,
            name: 'mix',
            setter: handleDistortionMixChange,
          },
          {
            level: currentSong.distortion.amount,
            name: 'amount',
            setter: handleDistortionAmountChange,
          },
          {
            level: currentSong.distortion.filter,
            name: 'filter',
            setter: handleDistortionFilterChange,
          },
        ]}
        color="#2563EB"
        title="Delay"
        EffectIcon={GiAbstract053}
      />
    </div>
  );
}
