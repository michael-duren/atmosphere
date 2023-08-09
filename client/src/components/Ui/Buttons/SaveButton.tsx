import { TfiSave } from 'react-icons/tfi';

interface Props {
  size?: number;
  onClick: () => void;
}

export default function SaveButton({ size, onClick }: Props) {
  const buttonSize = size ? size : 16;

  return (
    <button
      onClick={onClick}
      className="mb-4 group text-gray-300 hover:text-white active:scale-105"
    >
      <TfiSave className="group-hover:stroke-1" size={buttonSize} />
    </button>
  );
}
