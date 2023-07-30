import { IconType } from 'react-icons';

interface Props {
  title: string;
  onClick: (...params: any) => void;
  ItemIcon?: IconType;
  type: 'button' | 'submit' | 'reset' | undefined;
  color: string;
}

export default function ColorButton({
  title,
  onClick,
  ItemIcon,
  type,
  color,
}: Props) {
  return (
    <>
      {color === 'amber' ? (
        <button
          className={`inline-flex mt-4 w-24 justify-center opacity-90 shadow-md shadow-amber-950 rounded-xl border border-transparent bg-amber-900 px-4 py-2 
      text-sm font-medium text-amber-100 hover:bg-amber-800 focus:outline-none focus-visible:ring-2 active:scale-105 focus-visible:ring-amber-500 
      focus-visible:ring-offset-2`}
          onClick={onClick}
          type={type}
        >
          {ItemIcon && <ItemIcon size={18} className="mr-2" />}
          <span>{title}</span>
        </button>
      ) : color === 'green' ? (
        <button
          className={`inline-flex mt-4 w-24 justify-center opacity-90 shadow-md shadow-green-950 rounded-xl border border-transparent bg-green-900 px-4 py-2 
      text-sm font-medium text-green-100 hover:bg-green-800 focus:outline-none focus-visible:ring-2 active:scale-105 focus-visible:ring-green-500 
      focus-visible:ring-offset-2`}
          onClick={onClick}
          type={type}
        >
          {ItemIcon && <ItemIcon size={18} className="mr-2" />}
          <span>{title}</span>
        </button>
      ) : color === 'blue' ? (
        <button
          className={`inline-flex mt-4 w-24 justify-center opacity-90 shadow-md shadow-blue-950 rounded-xl border border-transparent bg-blue-900 px-4 py-2 
      text-sm font-medium text-blue-100 hover:bg-blue-800 focus:outline-none focus-visible:ring-2 active:scale-105 focus-visible:ring-blue-500 
      focus-visible:ring-offset-2`}
          onClick={onClick}
          type={type}
        >
          {ItemIcon && <ItemIcon size={18} className="mr-2" />}
          <span>{title}</span>
        </button>
      ) : (
        <button
          className={`inline-flex mt-4 w-24 justify-center opacity-90 shadow-md shadow-red-950 rounded-xl border border-transparent bg-red-900 px-4 py-2 
      text-sm font-medium text-red-100 hover:bg-red-800 focus:outline-none focus-visible:ring-2 active:scale-105 focus-visible:ring-red-500 
      focus-visible:ring-offset-2`}
          onClick={onClick}
          type={type}
        >
          {ItemIcon && <ItemIcon size={18} className="mr-2" />}
          <span>{title}</span>
        </button>
      )}
    </>
  );
}
