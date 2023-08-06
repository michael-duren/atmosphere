import {
  PiCaretDownBold,
  PiCaretRightBold,
  PiFolderNotch,
  PiFolderOpen,
} from 'react-icons/pi';

interface Props {
  name: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function FolderButton({ name, isOpen, setIsOpen }: Props) {
  return (
    <button
      onClick={() => setIsOpen(!isOpen)}
      className="flex items-center transition-all duration-300"
    >
      {isOpen ? (
        <>
          <span className="mr-2">
            <PiCaretDownBold size={14} />
          </span>{' '}
          <span className="mr-1">
            <PiFolderOpen size={18} />
          </span>
        </>
      ) : (
        <>
          <span className="mr-2">
            <PiCaretRightBold size={14} />
          </span>
          <span className="mr-1">
            <PiFolderNotch size={18} />
          </span>
        </>
      )}{' '}
      <span>{name}</span>
    </button>
  );
}
