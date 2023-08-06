import { ReactComponent as BassSynthSvg } from '../../../../assets/icons/BassSynth.svg';
import { useAppSelector } from '../../../../store/hooks/useAppSelector.ts';
import { Fragment, useState } from 'react';
import FolderButton from '../../../Ui/Buttons/FolderButton.tsx';
import CollectionItem from './CollectionItem.tsx';

export default function Synths() {
  const { bassSynths, melodicSynths } = useAppSelector(
    (store) => store.preset.currentPresets.synths
  );
  const [isSynthsOpen, setIsSynthsOpen] = useState(false);
  const [isMelodicSynthsOpen, setIsMelodicSynthsOpen] = useState(false);
  const [isBassSynthsOpen, setIsBassSynthsOpen] = useState(false);

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
                  return (
                    <Fragment key={synth.presetName}>
                      <CollectionItem
                        mainOnClick={() => console.log('YOU GOT ME')}
                        deleteOnClick={() => console.log('YOU GOT ME')}
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
                  return (
                    <Fragment key={synth.presetName}>
                      <CollectionItem
                        mainOnClick={() => console.log('YOU GOT ME')}
                        deleteOnClick={() => console.log('YOU GOT ME')}
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
