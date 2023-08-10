import { useAppSelector } from '../../../../store/hooks/useAppSelector.ts';
import ColorButton from '../../../Ui/Buttons/ColorButton.tsx';
import { useAppDispatch } from '../../../../store/hooks/useAppDispatch.ts';

interface Props {
  presetToLoad: any;
  type: string;
  dispatchType: string;
  closeModal: () => void;
}

export default function LoadPresetWarning({
  presetToLoad,
  type,
  dispatchType,
  closeModal,
}: Props) {
  const { isPlaying } = useAppSelector((store) => store.transport);
  const dispatch = useAppDispatch();
  const loadPreset = () => {
    dispatch({
      type: dispatchType,
      payload: presetToLoad,
    });
    closeModal();
  };

  return (
    <div className="text-white flex flex-col items-center justify-center gap-4">
      <h2 className="text-2xl">
        Are you sure you want to load <i>{type}</i>?
      </h2>
      <div className="flex w-full">
        <p>Any unsaved changes will be lost</p>
      </div>
      {isPlaying && (
        <div className="text-red-500 text-xs font-semibold shadow-xl">
          Cannot Load {type} while App is playing
        </div>
      )}
      <div className="flex w-full justify-around mt-8">
        <ColorButton
          color="red"
          type="button"
          title="Yes"
          disabled={isPlaying}
          onClick={loadPreset}
        />
        <ColorButton
          color="green"
          type="button"
          title="No"
          onClick={closeModal}
        />
      </div>
    </div>
  );
}
