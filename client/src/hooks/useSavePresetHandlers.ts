import { useAppDispatch } from '../store/hooks/useAppDispatch.ts';
import {
  setPresetModalData,
  setPresetModalDispatchType,
  setPresetModalOpen,
  setPresetModalType,
} from '../store/slices/commonSlice.ts';
import { PRESET_ACTIONS } from '../store/actions/presetActions.ts';
import {
  BassSynth,
  KitPattern,
  MelodicPattern,
  MelodicSynth,
  Distortion,
  Reverb,
  Delay,
} from '../models/song.ts';

const useSavePresetHandlers = () => {
  const dispatch = useAppDispatch();

  // melodic synth
  const saveMelodicSynthHandler = (melodicSynth: MelodicSynth) => {
    dispatch(setPresetModalData(melodicSynth));
    dispatch(setPresetModalType('Melodic Synth'));
    if (melodicSynth.presetName || melodicSynth.id) {
      dispatch(
        setPresetModalDispatchType(PRESET_ACTIONS.UPDATE_MELODIC_SYNTH_ASYNC)
      );
    } else {
      dispatch(
        setPresetModalDispatchType(PRESET_ACTIONS.CREATE_MELODIC_SYNTH_ASYNC)
      );
    }

    dispatch(setPresetModalOpen(true));
  };

  // bass synth
  const saveBassSynthHandler = (bassSynth: BassSynth) => {
    dispatch(setPresetModalData(bassSynth));
    dispatch(setPresetModalType('Bass Synth'));
    if (bassSynth.presetName || bassSynth.id) {
      dispatch(
        setPresetModalDispatchType(PRESET_ACTIONS.UPDATE_BASS_SYNTH_ASYNC)
      );
    } else {
      dispatch(
        setPresetModalDispatchType(PRESET_ACTIONS.CREATE_BASS_SYNTH_ASYNC)
      );
    }

    dispatch(setPresetModalOpen(true));
  };

  // melodic pattern
  const saveMelodicPatternHandler = (melodicPattern: MelodicPattern) => {
    dispatch(setPresetModalData(melodicPattern));
    dispatch(setPresetModalType('Melodic Pattern'));
    if (melodicPattern.presetName || melodicPattern.id) {
      dispatch(
        setPresetModalDispatchType(PRESET_ACTIONS.UPDATE_MELODIC_PATTERN_ASYNC)
      );
    } else {
      dispatch(
        setPresetModalDispatchType(PRESET_ACTIONS.CREATE_MELODIC_PATTERN_ASYNC)
      );
    }

    dispatch(setPresetModalOpen(true));
  };

  // kit pattern
  const saveKitPatternHandler = (kitPattern: KitPattern) => {
    dispatch(setPresetModalData(kitPattern));
    dispatch(setPresetModalType('Kit Pattern'));
    if (kitPattern.presetName || kitPattern.id) {
      dispatch(
        setPresetModalDispatchType(PRESET_ACTIONS.UPDATE_KIT_PATTERN_ASYNC)
      );
    } else {
      dispatch(
        setPresetModalDispatchType(PRESET_ACTIONS.CREATE_KIT_PATTERN_ASYNC)
      );
    }

    dispatch(setPresetModalOpen(true));
  };

  // effects

  // distortion
  const saveDistortionHandler = (distortion: Distortion) => {
    dispatch(setPresetModalData(distortion));
    dispatch(setPresetModalType('Distortion'));
    if (distortion.presetName || distortion.id) {
      dispatch(
        setPresetModalDispatchType(
          PRESET_ACTIONS.UPDATE_DISTORTION_EFFECT_ASYNC
        )
      );
    } else {
      dispatch(
        setPresetModalDispatchType(
          PRESET_ACTIONS.CREATE_DISTORTION_EFFECT_ASYNC
        )
      );
    }

    dispatch(setPresetModalOpen(true));
  };

  // reverb
  const saveReverbHandler = (reverb: Reverb) => {
    dispatch(setPresetModalData(reverb));
    dispatch(setPresetModalType('Reverb'));
    if (reverb.presetName || reverb.id) {
      dispatch(
        setPresetModalDispatchType(PRESET_ACTIONS.UPDATE_REVERB_EFFECT_ASYNC)
      );
    } else {
      dispatch(
        setPresetModalDispatchType(PRESET_ACTIONS.CREATE_REVERB_EFFECT_ASYNC)
      );
    }

    dispatch(setPresetModalOpen(true));
  };

  // delay
  const saveDelayHandler = (delay: Delay) => {
    dispatch(setPresetModalData(delay));
    dispatch(setPresetModalType('Delay'));
    if (delay.presetName || delay.id) {
      dispatch(
        setPresetModalDispatchType(PRESET_ACTIONS.UPDATE_DELAY_EFFECT_ASYNC)
      );
    } else {
      dispatch(
        setPresetModalDispatchType(PRESET_ACTIONS.CREATE_DELAY_EFFECT_ASYNC)
      );
    }

    dispatch(setPresetModalOpen(true));
  };

  return {
    saveKitPatternHandler,
    saveMelodicPatternHandler,
    saveMelodicSynthHandler,
    saveBassSynthHandler,
    saveDistortionHandler,
    saveReverbHandler,
    saveDelayHandler,
  };
};

export default useSavePresetHandlers;
