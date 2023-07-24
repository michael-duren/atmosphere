interface Props {
  children: React.ReactNode;
  title: string;
}

export default function Knob({ children, title }: Props) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="text-xs font-caps">{title}</div>
      {children}
    </div>
  );
}
