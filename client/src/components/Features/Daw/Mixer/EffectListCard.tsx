import { useAppSelector } from '../../../../store/hooks/useAppSelector.ts';
import { selectSong } from '../../../../store/slices/songSlice.ts';
import EffectCard from './EffectCard.tsx';
import { GiAbstract053, GiAbstract098, GiAbstract024 } from 'react-icons/gi';
import useMixChange from '../../../../hooks/useMixChange.ts';
import {
  setToneDelayFeedback,
  setToneDelayMix,
  setToneDelayTime,
  setToneDistortionAmount,
  setToneDistortionFilter,
  setToneDistortionMix,
  setToneReverbDecay,
  setToneReverbMix,
  setToneReverbPreDelay,
} from '../../../../tone/setters/setToneMixParams.ts';

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
            storeSetter: handleDistortionMixChange,
            toneSetter: setToneDistortionMix,
          },
          {
            level: currentSong.distortion.amount,
            name: 'amount',
            storeSetter: handleDistortionAmountChange,
            toneSetter: setToneDistortionAmount,
          },
          {
            level: currentSong.distortion.filter,
            name: 'filter',
            storeSetter: handleDistortionFilterChange,
            toneSetter: setToneDistortionFilter,
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
            storeSetter: handleReverbMixChange,
            toneSetter: setToneReverbMix,
          },
          {
            level: currentSong.reverb.decay,
            name: 'decay',
            storeSetter: handleReverbDecayChange,
            toneSetter: setToneReverbDecay,
          },
          {
            level: currentSong.reverb.preDelay,
            name: 'pre delay',
            storeSetter: handleReverbPreDelayChange,
            toneSetter: setToneReverbPreDelay,
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
            storeSetter: handleDelayMixChange,
            toneSetter: setToneDelayMix,
          },
          {
            level: currentSong.delay.time,
            name: 'time',
            storeSetter: handleDelayTimeChange,
            toneSetter: setToneDelayTime,
          },
          {
            level: currentSong.delay.feedback,
            name: 'feedback',
            storeSetter: handleDelayFeedbackChange,
            toneSetter: setToneDelayFeedback,
          },
        ]}
        color="#2563EB"
        title="Delay"
        EffectIcon={GiAbstract053}
      />
    </div>
  );
}
