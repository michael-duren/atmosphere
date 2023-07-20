import { useAppSelector } from '../store/hooks/useAppSelector.ts';
import { selectUser } from '../store/slices/userSlice.ts';
import { router } from '../router/Routes.tsx';
import { useAppDispatch } from '../store/hooks/useAppDispatch.ts';
import { USER_ACTIONS } from '../store/actions/userActions.ts';
import DawLayout from '../components/Layouts/DawLayout.tsx';

export default function Daw() {
  return (
    <DawLayout>
      <div className="border-2 border-red-600">Aside</div>
      <div className="border-2 border-red-600">Main</div>
    </DawLayout>
  );
}
