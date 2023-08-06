import { FiDelete } from 'react-icons/fi';
import { IconType } from 'react-icons';
import { toTitleCase } from '../../../../utils/string.ts';

interface Props {
  mainOnClick: () => void;
  deleteOnClick: () => void;
  name: string;
  Icon: IconType;
  iconSize: number;
}

export default function CollectionItem({
  mainOnClick,
  deleteOnClick,
  Icon,
  name,
  iconSize,
}: Props) {
  return (
    <div className="flex gap-8 items-center">
      <button
        className="flex group transition-all duration-300 hover:text-violet-300  items-center"
        onClick={mainOnClick}
      >
        <span className="mr-2">
          <Icon className="group-active:scale-110" size={iconSize} />
        </span>
        <span className="group-active:scale-105 text-sm">
          {toTitleCase(name)}
        </span>
      </button>
      <button
        onClick={deleteOnClick}
        className="transition-all duration-300 hover:text-red-400"
      >
        <FiDelete size={14} />
      </button>
    </div>
  );
}
