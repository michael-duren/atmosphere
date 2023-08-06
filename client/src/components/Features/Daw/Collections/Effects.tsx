import { useAppSelector } from '../../../../store/hooks/useAppSelector.ts';
import { Fragment, useState } from 'react';
import FolderButton from '../../../Ui/Buttons/FolderButton.tsx';
import CollectionItem from './CollectionItem.tsx';
import { GiAbstract024, GiAbstract053, GiAbstract098 } from 'react-icons/gi';

export default function Effects() {
  const { distortionPresets, reverbPresets, delayPresets } = useAppSelector(
    (store) => store.preset.currentPresets.effects
  );
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
                  return (
                    <Fragment key={distortion.id}>
                      <CollectionItem
                        mainOnClick={() => console.log('YOU GOT ME')}
                        deleteOnClick={() => console.log('YOU GOT ME')}
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
                  return (
                    <Fragment key={reverb.id}>
                      <CollectionItem
                        mainOnClick={() => console.log('YOU GOT ME')}
                        deleteOnClick={() => console.log('YOU GOT ME')}
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
                  return (
                    <Fragment key={delay.id}>
                      <CollectionItem
                        mainOnClick={() => console.log('YOU GOT ME')}
                        deleteOnClick={() => console.log('YOU GOT ME')}
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
