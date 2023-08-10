import { ReactComponent as BassSynthSvg } from '../../../../assets/icons/BassSynth.svg';
import { useAppSelector } from '../../../../store/hooks/useAppSelector.ts';
import { Fragment, useState } from 'react';
import FolderButton from '../../../Ui/Buttons/FolderButton.tsx';
import CollectionItem from './CollectionItem.tsx';
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

export default function Synths() {
  const { bassSynths, melodicSynths } = useAppSelector(
    (store) => store.preset.currentPresets.synths
  );
  const [isSynthsOpen, setIsSynthsOpen] = useState(false);
  const [isMelodicSynthsOpen, setIsMelodicSynthsOpen] = useState(false);
  const [isBassSynthsOpen, setIsBassSynthsOpen] = useState(false);
  const dispatch = useAppDispatch();

  return (
    <div>
      <FolderButton
        name={'Synths'}
        isOpen={isSynthsOpen}
        setIsOpen={setIsSynthsOpen}
      />
      <div className={`${isSynthsOpen && 'ml-8 mt-4 flex flex-col gap-4'}`}>
        {isSynthsOpen && (
          <>
            <FolderButton
              name={'Melodic'}
              isOpen={isMelodicSynthsOpen}
              setIsOpen={setIsMelodicSynthsOpen}
            />
            {isMelodicSynthsOpen && melodicSynths && (
              <div className="ml-8 flex flex-col gap-4">
                {melodicSynths.map((synth) => {
                  const loadPresetHandler = () => {
                    dispatch(setPresetToLoad(synth.id));
                    dispatch(setPresetToLoadModalOpen(true));
                    dispatch(setPresetToLoadType('Melodic Synth'));
                    dispatch(
                      setPresetToLoadDispatchType(
                        PRESET_ACTIONS.LOAD_MELODIC_SYNTH_ASYNC
                      )
                    );
                  };
                  const loadDeletePresetFormHandler = () => {
                    dispatch(setPresetToDelete(synth));
                    dispatch(setPresetDeleteModalOpen(true));
                    dispatch(setPresetDeleteType('Melodic Synth'));
                    dispatch(
                      setPresetDeleteDispatchType(
                        PRESET_ACTIONS.DELETE_MELODIC_SYNTH_ASYNC
                      )
                    );
                  };
                  return (
                    <Fragment key={synth.presetName}>
                      <CollectionItem
                        mainOnClick={loadPresetHandler}
                        deleteOnClick={loadDeletePresetFormHandler}
                        name={synth.presetName!}
                        Icon={BassSynthSvg}
                        additionalStyles={
                          'h-4 w-4 fill-white mb-1 stroke-2 stroke-white'
                        }
                      />
                    </Fragment>
                  );
                })}
              </div>
            )}
            <FolderButton
              name={'Bass'}
              isOpen={isBassSynthsOpen}
              setIsOpen={setIsBassSynthsOpen}
            />
            {isBassSynthsOpen && bassSynths && (
              <div className="ml-8 flex flex-col gap-4">
                {bassSynths.map((synth) => {
                  const loadPresetHandler = () => {
                    dispatch(setPresetToLoad(synth.id));
                    dispatch(setPresetToLoadModalOpen(true));
                    dispatch(setPresetToLoadType('Bass Synth'));
                    dispatch(
                      setPresetToLoadDispatchType(
                        PRESET_ACTIONS.LOAD_BASS_SYNTH_ASYNC
                      )
                    );
                  };
                  const loadDeletePresetFormHandler = () => {
                    dispatch(setPresetToDelete(synth));
                    dispatch(setPresetDeleteModalOpen(true));
                    dispatch(setPresetDeleteType('Bass Synth'));
                    dispatch(
                      setPresetDeleteDispatchType(
                        PRESET_ACTIONS.DELETE_BASS_SYNTH_ASYNC
                      )
                    );
                  };
                  return (
                    <Fragment key={synth.presetName}>
                      <CollectionItem
                        mainOnClick={loadPresetHandler}
                        deleteOnClick={loadDeletePresetFormHandler}
                        name={synth.presetName!}
                        Icon={BassSynthSvg}
                        additionalStyles={
                          'h-4 w-4 fill-white mb-1 stroke-2 stroke-white'
                        }
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
