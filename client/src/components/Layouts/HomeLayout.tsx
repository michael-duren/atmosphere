import { Suspense } from 'react';
import AbstractSpinner from '../Ui/Spinners/AbstractSpinner';
import MoonCanvas from '../../canvas/MoonCanvas';

interface Props {
  children: React.ReactNode;
}

export default function HomeLayout({ children }: Props) {
  return (
    <main className="min-h-[100vh] min-w-[100vw] text-white flex flex-col items-center justify-center">
      <Suspense fallback={<AbstractSpinner />}>
        <MoonCanvas />
        {children}
      </Suspense>
    </main>
  );
}
