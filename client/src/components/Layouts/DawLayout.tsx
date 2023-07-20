import DawHeader from './DawHeader.tsx';

interface Props {
  children?: React.ReactNode;
}

export default function DawLayout({ children }: Props) {
  return (
    <div className="p-6">
      <DawHeader />
      <main className="grid lg:grid-cols-12 gap-4 text-white">{children}</main>
    </div>
  );
}
