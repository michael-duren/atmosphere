import { useAppSelector } from '../../../../store/hooks/useAppSelector.ts';
import { Fragment, useState } from 'react';
import FolderButton from '../../../Ui/Buttons/FolderButton.tsx';
import CollectionItem from './CollectionItem.tsx';
import { GiAbstract024, GiAbstract053, GiAbstract098 } from 'react-icons/gi';
import {
  setPresetDeleteDispatchType,
  setPresetDeleteModalOpen,
  setPresetDeleteType,
  setPresetToDelete,
  setPresetToLoad,
  setPresetToLoadDispatchType,
  setPresetToLoadModalOpen,
  setPresetToLoadType,
} from '../../../../store/slices/commonSlice.ts';
import { PRESET_ACTIONS } from '../../../../store/actions/presetActions.ts';
import { useAppDispatch } from '../../../../store/hooks/useAppDispatch.ts';

export default function Effects() {
  const { distortionPresets, reverbPresets, delayPresets } = useAppSelector(
    (store) => store.preset.currentPresets.effects
  );
  const dispatch = useAppDispatch();
  const [isEffectsOpen, setIsEffectsOpen] = useState(false);
  const [isDistortionsOpen, setIsDistortionsOpen] = useState(false);
  const [isReverbsOpen, setIsReverbsOpen] = useState(false);
  const [isDelaysOpen, setIsDelaysOpen] = useState(false);

  return (
    <div>
      <FolderButton
        name={'Effects'}
        isOpen={isEffectsOpen}
        setIsOpen={setIsEffectsOpen}
      />
      <div className={`${isEffectsOpen && 'ml-8 mt-4 flex flex-col gap-4'}`}>
        {isEffectsOpen && (
          <>
            <FolderButton
              name={'Distortion'}
              isOpen={isDistortionsOpen}
              setIsOpen={setIsDistortionsOpen}
            />
            {isDistortionsOpen && distortionPresets && (
              <div className="ml-8 flex flex-col gap-4">
                {distortionPresets.map((distortion) => {
                  const loadPresetHandler = () => {
                    dispatch(setPresetToLoad(distortion.id));
                    dispatch(setPresetToLoadModalOpen(true));
                    dispatch(setPresetToLoadType('Distortion'));
                    dispatch(
                      setPresetToLoadDispatchType(
                        PRESET_ACTIONS.LOAD_DISTORTION_EFFECT_ASYNC
                      )
                    );
                  };
                  const loadDeletePresetFormHandler = () => {
                    dispatch(setPresetToDelete(distortion));
                    dispatch(setPresetDeleteModalOpen(true));
                    dispatch(setPresetDeleteType('Distortion'));
                    dispatch(
                      setPresetDeleteDispatchType(
                        PRESET_ACTIONS.DELETE_DISTORTION_EFFECT_ASYNC
                      )
                    );
                  };
                  return (
                    <Fragment key={distortion.id}>
                      <CollectionItem
                        mainOnClick={loadPresetHandler}
                        deleteOnClick={loadDeletePresetFormHandler}
                        name={distortion.presetName!}
                        Icon={GiAbstract098}
                        iconSize={14}
                      />
                    </Fragment>
                  );
                })}
              </div>
            )}

            <FolderButton
              name={'Reverb'}
              isOpen={isReverbsOpen}
              setIsOpen={setIsReverbsOpen}
            />

            {isReverbsOpen && reverbPresets && (
              <div className="ml-8 flex flex-col gap-4">
                {reverbPresets.map((reverb) => {
                  const loadPresetHandler = () => {
                    dispatch(setPresetToLoad(reverb.id));
                    dispatch(setPresetToLoadModalOpen(true));
                    dispatch(setPresetToLoadType('Reverb'));
                    dispatch(
                      setPresetToLoadDispatchType(
                        PRESET_ACTIONS.LOAD_REVERB_EFFECT_ASYNC
                      )
                    );
                  };
                  const loadDeletePresetFormHandler = () => {
                    dispatch(setPresetToDelete(reverb));
                    dispatch(setPresetDeleteModalOpen(true));
                    dispatch(setPresetDeleteType('Reverb'));
                    dispatch(
                      setPresetDeleteDispatchType(
                        PRESET_ACTIONS.DELETE_REVERB_EFFECT_ASYNC
                      )
                    );
                  };
                  return (
                    <Fragment key={reverb.id}>
                      <CollectionItem
                        mainOnClick={loadPresetHandler}
                        deleteOnClick={loadDeletePresetFormHandler}
                        name={reverb.presetName!}
                        Icon={GiAbstract024}
                        iconSize={14}
                      />
                    </Fragment>
                  );
                })}
              </div>
            )}
            <FolderButton
              name={'Delay'}
              isOpen={isDelaysOpen}
              setIsOpen={setIsDelaysOpen}
            />
            {isDelaysOpen && delayPresets && (
              <div className="ml-8 flex flex-col gap-4">
                {delayPresets.map((delay) => {
                  const loadPresetHandler = () => {
                    dispatch(setPresetToLoad(delay.id));
                    dispatch(setPresetToLoadModalOpen(true));
                    dispatch(setPresetToLoadType('Delay'));
                    dispatch(
                      setPresetToLoadDispatchType(
                        PRESET_ACTIONS.LOAD_DELAY_EFFECT_ASYNC
                      )
                    );
                  };
                  const loadDeletePresetFormHandler = () => {
                    dispatch(setPresetToDelete(delay));
                    dispatch(setPresetDeleteModalOpen(true));
                    dispatch(setPresetDeleteType('Delay'));
                    dispatch(
                      setPresetDeleteDispatchType(
                        PRESET_ACTIONS.DELETE_DELAY_EFFECT_ASYNC
                      )
                    );
                  };
                  return (
                    <Fragment key={delay.id}>
                      <CollectionItem
                        mainOnClick={loadPresetHandler}
                        deleteOnClick={loadDeletePresetFormHandler}
                        name={delay.presetName!}
                        Icon={GiAbstract053}
                        iconSize={14}
                      />
                    </Fragment>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
