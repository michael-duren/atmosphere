import { useAppSelector } from '../../../../store/hooks/useAppSelector.ts';
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
import useSavePresetHandlers from '../../../../hooks/useSavePresetHandlers.ts';

export default function EffectListCard() {
  const { distortion, reverb, delay } = useAppSelector(
    (store) => store.song.currentSong
  );
  const { saveDistortionHandler, saveReverbHandler, saveDelayHandler } =
    useSavePresetHandlers();
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
        effectToSave={distortion}
        saveDispatch={saveDistortionHandler}
        state={[
          {
            level: distortion.mix,
            name: 'mix',
            storeSetter: handleDistortionMixChange,
            toneSetter: setToneDistortionMix,
            type: 'main',
          },
          {
            level: distortion.amount,
            name: 'amount',
            storeSetter: handleDistortionAmountChange,
            toneSetter: setToneDistortionAmount,
            type: 'main',
          },
          {
            level: distortion.filterFrequency,
            name: 'filter',
            storeSetter: handleDistortionFilterChange,
            toneSetter: setToneDistortionFilter,
            type: 'freq',
          },
        ]}
        color="#DC2626"
        title="Distortion"
        EffectIcon={GiAbstract098}
      />
      <EffectCard
        effectToSave={reverb}
        saveDispatch={saveReverbHandler}
        state={[
          {
            level: reverb.mix,
            name: 'mix',
            storeSetter: handleReverbMixChange,
            toneSetter: setToneReverbMix,
            type: 'main',
          },
          {
            level: reverb.decay,
            name: 'decay',
            storeSetter: handleReverbDecayChange,
            toneSetter: setToneReverbDecay,
            type: 'main',
          },
          {
            level: reverb.preDelay,
            name: 'pre delay',
            storeSetter: handleReverbPreDelayChange,
            toneSetter: setToneReverbPreDelay,
            type: 'main',
          },
        ]}
        color="#16A34A"
        title="Reverb"
        EffectIcon={GiAbstract024}
      />
      <EffectCard
        effectToSave={delay}
        saveDispatch={saveDelayHandler}
        state={[
          {
            level: delay.mix,
            name: 'mix',
            storeSetter: handleDelayMixChange,
            toneSetter: setToneDelayMix,
            type: 'main',
          },
          {
            level: delay.time,
            name: 'time',
            storeSetter: handleDelayTimeChange,
            toneSetter: setToneDelayTime,
            type: 'main',
          },
          {
            level: delay.feedback,
            name: 'feedback',
            storeSetter: handleDelayFeedbackChange,
            toneSetter: setToneDelayFeedback,
            type: 'main',
          },
        ]}
        color="#2563EB"
        title="Delay"
        EffectIcon={GiAbstract053}
      />
    </div>
  );
}
