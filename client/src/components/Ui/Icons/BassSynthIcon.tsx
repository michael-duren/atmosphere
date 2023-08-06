import { ReactComponent as BassSynthSvg } from '../../../../assets/icons/BassSynth.svg';

interface Props {
  width: string;
  height: string;
}

export default function BassSynthIcon({ width, height }: Props) {
  return (
    <BassSynthSvg
      className={`${width} ${height} fill-white mb-1 stroke-2 stroke-white`}
    />
  );
}
