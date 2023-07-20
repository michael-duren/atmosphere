import DawLayout from '../components/Layouts/DawLayout.tsx';
import AbstractSpinner from '../components/Ui/Spinners/AbstractSpinner.tsx';
import { useAppSelector } from '../store/hooks/useAppSelector.ts';
import { selectUser } from '../store/slices/userSlice.ts';

export default function Daw() {
  const user = useAppSelector(selectUser);

  if (!user || user.isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[100vh]">
        <AbstractSpinner />
      </div>
    );
  }

  return (
    <DawLayout>
      <div className="col-span-4">Aside</div>
      <div className="col-span-8">Main</div>
    </DawLayout>
  );
}
