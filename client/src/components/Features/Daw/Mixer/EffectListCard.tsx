import { useAppSelector } from '../../../../store/hooks/useAppSelector.ts';
import { selectSong } from '../../../../store/slices/songSlice.ts';
import EffectCard from './EffectCard.tsx';
import { GiAbstract053, GiAbstract098, GiAbstract024 } from 'react-icons/gi';
import useMixChange from '../../../../hooks/useMixChange.ts';

export default function EffectListCard() {
  const { currentSong } = useAppSelector(selectSong);
  const {
    handleDistortionMixChange,
    handleDistortionAmountChange,
    handleDistortionFilterChange,
    handleReverbMixChange,
    handleReverbDecayChange,
    handleReverbPreDelayChange,
    handleDelayMixChange,
    handleDelayTimeChange,
    handleDelayFeedbackChange,
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
            level: currentSong.reverb.mix,
            name: 'mix',
            setter: handleReverbMixChange,
          },
          {
            level: currentSong.reverb.decay,
            name: 'decay',
            setter: handleReverbDecayChange,
          },
          {
            level: currentSong.reverb.preDelay,
            name: 'pre delay',
            setter: handleReverbPreDelayChange,
          },
        ]}
        color="#16A34A"
        title="Reverb"
        EffectIcon={GiAbstract024}
      />
      <EffectCard
        state={[
          {
            level: currentSong.delay.mix,
            name: 'mix',
            setter: handleDelayMixChange,
          },
          {
            level: currentSong.delay.time,
            name: 'time',
            setter: handleDelayTimeChange,
          },
          {
            level: currentSong.delay.feedback,
            name: 'feedback',
            setter: handleDelayFeedbackChange,
          },
        ]}
        color="#2563EB"
        title="Delay"
        EffectIcon={GiAbstract053}
      />
    </div>
  );
}
