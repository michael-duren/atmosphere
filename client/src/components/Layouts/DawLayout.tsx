import DawHeader from './DawHeader.tsx';

interface Props {
  children?: React.ReactNode;
}

export default function DawLayout({ children }: Props) {
  return (
    <div className="p-6 min-h-screen flex flex-col">
      <DawHeader />
      <main className="grid h-full lg:grid-cols-12 gap-4 text-white mt-8">
        {children}
      </main>
    </div>
  );
}
