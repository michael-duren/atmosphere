import { ImSpinner4 } from 'react-icons/im';

interface Props {
  size: number;
}

export default function SimpleSpinner({ size }: Props) {
  return (
    <div className="flex items-center justify-center">
      <ImSpinner4 size={size} className="animate-spin" />
    </div>
  );
}
