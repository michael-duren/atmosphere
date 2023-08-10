import FolderButton from '../../../Ui/Buttons/FolderButton.tsx';
import { Fragment, useState } from 'react';
import { useAppSelector } from '../../../../store/hooks/useAppSelector.ts';
import CollectionItem from './CollectionItem.tsx';
import { SiMusicbrainz } from 'react-icons/si';
import { GiAbstract016 } from 'react-icons/gi';
import { useAppDispatch } from '../../../../store/hooks/useAppDispatch.ts';
import { PRESET_ACTIONS } from '../../../../store/actions/presetActions.ts';
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

export default function Patterns() {
  const { melodicPatterns, kitPatterns } = useAppSelector(
    (store) => store.preset.currentPresets.patterns
  );
  const [isPatternOpen, setIsPatternOpen] = useState(false);
  const [isMelodicPatternOpen, setIsMelodicPatternOpen] = useState(false);
  const [isKitPatternOpen, setIsKitPatternOpen] = useState(false);
  const dispatch = useAppDispatch();

  return (
    <div>
      <FolderButton
        name={'Patterns'}
        isOpen={isPatternOpen}
        setIsOpen={setIsPatternOpen}
      />
      <div className={`${isPatternOpen && 'ml-8 mt-4 flex flex-col gap-4'}`}>
        {isPatternOpen && (
          <>
            <FolderButton
              name={'Melodies'}
              isOpen={isMelodicPatternOpen}
              setIsOpen={setIsMelodicPatternOpen}
            />
            {isMelodicPatternOpen && melodicPatterns && (
              <div className="ml-8 flex flex-col gap-4">
                {melodicPatterns.map((pattern) => {
                  const loadPresetHandler = () => {
                    dispatch(setPresetToLoad(pattern.id));
                    dispatch(setPresetToLoadModalOpen(true));
                    dispatch(setPresetToLoadType('Melodic Pattern'));
                    dispatch(
                      setPresetToLoadDispatchType(
                        PRESET_ACTIONS.LOAD_MELODIC_PATTERN_ASYNC
                      )
                    );
                  };
                  const loadDeletePresetFormHandler = () => {
                    dispatch(setPresetToDelete(pattern));
                    dispatch(setPresetDeleteModalOpen(true));
                    dispatch(setPresetDeleteType('Melodic Pattern'));
                    dispatch(
                      setPresetDeleteDispatchType(
                        PRESET_ACTIONS.DELETE_MELODIC_PATTERN_ASYNC
                      )
                    );
                  };
                  return (
                    <Fragment key={pattern.presetName}>
                      <CollectionItem
                        mainOnClick={loadPresetHandler}
                        deleteOnClick={loadDeletePresetFormHandler}
                        name={pattern.presetName!}
                        Icon={SiMusicbrainz}
                        iconSize={14}
                      />
                    </Fragment>
                  );
                })}
              </div>
            )}
            <FolderButton
              name={'Drums'}
              isOpen={isKitPatternOpen}
              setIsOpen={setIsKitPatternOpen}
            />
            {isKitPatternOpen && kitPatterns && (
              <div className="ml-8 flex flex-col gap-4">
                {kitPatterns.map((pattern) => {
                  const loadDeletePresetFormHandler = () => {
                    dispatch(setPresetToDelete(pattern));
                    dispatch(setPresetDeleteModalOpen(true));
                    dispatch(setPresetDeleteType('Kit Pattern'));
                    dispatch(
                      setPresetDeleteDispatchType(
                        PRESET_ACTIONS.DELETE_KIT_PATTERN_ASYNC
                      )
                    );
                  };
                  const loadPresetHandler = () => {
                    dispatch(setPresetToLoad(pattern.id));
                    dispatch(setPresetToLoadModalOpen(true));
                    dispatch(setPresetToLoadType('Kit Pattern'));
                    dispatch(
                      setPresetToLoadDispatchType(
                        PRESET_ACTIONS.LOAD_KIT_PATTERN_ASYNC
                      )
                    );
                  };
                  return (
                    <Fragment key={pattern.presetName}>
                      <CollectionItem
                        mainOnClick={loadPresetHandler}
                        deleteOnClick={loadDeletePresetFormHandler}
                        name={pattern.presetName!}
                        Icon={GiAbstract016}
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
