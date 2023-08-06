import FolderButton from '../../../Ui/Buttons/FolderButton.tsx';
import { Fragment, useState } from 'react';
import { useAppSelector } from '../../../../store/hooks/useAppSelector.ts';
import CollectionItem from './CollectionItem.tsx';
import { SiMusicbrainz } from 'react-icons/si';
import { GiAbstract016 } from 'react-icons/gi';

export default function Patterns() {
  const { melodicPatterns, kitPatterns } = useAppSelector(
    (store) => store.preset.currentPresets.patterns
  );
  const [isPatternOpen, setIsPatternOpen] = useState(false);
  const [isMelodicPatternOpen, setIsMelodicPatternOpen] = useState(false);
  const [isKitPatternOpen, setIsKitPatternOpen] = useState(false);

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
                  return (
                    <Fragment key={pattern.presetName}>
                      <CollectionItem
                        mainOnClick={() => console.log('YOU GOT ME')}
                        deleteOnClick={() => console.log('YOU GOT ME')}
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
                  return (
                    <Fragment key={pattern.presetName}>
                      <CollectionItem
                        mainOnClick={() => console.log('YOU GOT ME')}
                        deleteOnClick={() => console.log('YOU GOT ME')}
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
