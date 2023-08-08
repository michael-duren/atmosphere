import ColorButton from '../../../Ui/Buttons/ColorButton.tsx';
import { useAppSelector } from '../../../../store/hooks/useAppSelector.ts';

interface Props {
  presetName: string;
  onClick: () => void;
  closeModal: () => void;
}

export default function SavePresetWarning({
  presetName,
  onClick,
  closeModal,
}: Props) {
  const { isPlaying } = useAppSelector((store) => store.transport);

  return (
    <div className="text-white flex flex-col items-center justify-center gap-4">
      <h2 className="text-2xl">
        Are you sure you want to load <i>{presetName}</i>?
      </h2>
      <div className="flex w-full">
        <p>Any unsaved changes will be lost</p>
      </div>
      {isPlaying && (
        <div className="text-red-500 text-xs font-semibold shadow-xl">
          Cannot Load Song while App is playing
        </div>
      )}
      <div className="flex w-full justify-around mt-8">
        <ColorButton
          color="red"
          type="button"
          title="Yes"
          disabled={isPlaying}
          onClick={onClick}
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
