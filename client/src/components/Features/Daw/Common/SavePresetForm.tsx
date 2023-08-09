import { darkInput } from '../../../Ui/Styles/input.ts';
import { Fragment, useState } from 'react';
import FormWarning from '../../../Ui/Warnings/FormWarning.tsx';
import { useAppSelector } from '../../../../store/hooks/useAppSelector.ts';
import { useAppDispatch } from '../../../../store/hooks/useAppDispatch.ts';

interface GeneralPreset {
  presetName?: string;
}
interface Props<T extends GeneralPreset> {
  dispatchType: string;
  currentPreset: T;
  presetType: string;
  closeModal: () => void;
}

export default function SavePresetForm<T extends GeneralPreset>({
  dispatchType,
  currentPreset,
  presetType,
  closeModal,
}: Props<T>) {
  const { isPlaying } = useAppSelector((store) => store.transport);
  const error = useAppSelector((store) => store.preset.error);
  const dispatch = useAppDispatch();
  const isNewPreset = !currentPreset.presetName; // if currentPreset.presetName is undefined, it's a new preset
  const presetToSaveName = currentPreset.presetName ?? 'Untitled';
  const [presetToSaveNameInput, setPresetToSaveNameInput] =
    useState(presetToSaveName);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const presetToSave = { ...currentPreset };
    closeModal();
    if (isNewPreset) {
      presetToSave.presetName = presetToSaveNameInput;
      dispatch({ type: dispatchType, payload: presetToSave });
      return;
    } else {
      dispatch({ type: dispatchType, payload: presetToSave });
    }
  };

  return (
    <div className="text-white flex items-center flex-col">
      <h2 className="text-2xl opacity-90 mb-4 text-white">{presetType}</h2>
      <form
        onSubmit={onSubmit}
        className="flex gap-8 items-center w-full flex-col"
      >
        {
          // if the song is new, show the input
          isNewPreset ? (
            <div className="flex items-center gap-2">
              <label className="font-caps uppercase">Name</label>
              <input
                type="text"
                value={presetToSaveNameInput}
                onChange={(e) => setPresetToSaveNameInput(e.target.value)}
                className={`${darkInput} font-caps`}
              />
            </div>
          ) : (
            // if the song is not new, show the song name
            <div className="flex   items-center gap-2">
              <label className="font-caps uppercase">Name</label>
              <p className="font-caps rounded-xl bg-gray-800 px-4 text-violet-300">
                {presetToSaveName}
              </p>
            </div>
          )
        }

        {Array.isArray(error) &&
          error.map((error, i) => {
            return (
              <Fragment key={i}>
                <FormWarning touched={true} warning={error} />
              </Fragment>
            );
          })}
        {isPlaying && (
          <div className="text-red-500 text-xs font-semibold shadow-xl">
            Cannot Save Song while App is playing
          </div>
        )}
        <div className="flex justify-around w-full">
          <button
            type="submit"
            className={`${
              isPlaying ? '' : 'hover:bg-gray-800 active:scale-105'
            } py-2 w-24  transition-all duration-300 rounded-xl bg-opacity-80 bg-gray-900`}
            disabled={isPlaying}
          >
            Save
          </button>
          <button
            type="button"
            onClick={closeModal}
            className="hover:bg-gray-800 w-24 py-2 active:scale-105 transition-all duration-300 rounded-xl bg-opacity-80 bg-gray-900"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
