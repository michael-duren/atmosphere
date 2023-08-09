import { useAppSelector } from '../../../../store/hooks/useAppSelector.ts';
import { useAppDispatch } from '../../../../store/hooks/useAppDispatch.ts';
import ColorButton from '../../../Ui/Buttons/ColorButton.tsx';

interface Props {
  presetToDelete: any;
  type: string;
  dispatchType: string;
  closeModal: () => void;
}

export default function DeletePresetWarning({
  presetToDelete,
  type,
  dispatchType,
  closeModal,
}: Props) {
  const { isPlaying } = useAppSelector((store) => store.transport);
  const dispatch = useAppDispatch();
  const deleteSong = () => {
    closeModal();
    dispatch({
      type: dispatchType,
      payload: presetToDelete.id,
    });
  };

  return (
    <div className="text-white flex flex-col items-center justify-center gap-4">
      <h2 className="text-2xl">
        Are you sure you want to permanently delete{' '}
        <i>{presetToDelete!.presetName}</i>?
      </h2>
      <div className="flex w-full">
        <p>This {type} will not be recoverable</p>
      </div>
      {isPlaying && (
        <div className="text-red-500 text-xs font-semibold shadow-xl">
          Cannot Delete {type} while App is playing
        </div>
      )}
      <div className="flex w-full justify-around mt-8">
        <ColorButton
          color="red"
          type="button"
          title="Yes"
          disabled={isPlaying}
          onClick={deleteSong}
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
