import { useAppSelector } from '../store/hooks/useAppSelector.ts';
import { selectUser } from '../store/slices/userSlice.ts';
import { router } from '../route/Routes.tsx';

export default function Daw() {
  const user = useAppSelector(selectUser);

  if (!user) router.navigate('/');
  console.log(user);

  return (
    <main>
      <h2 className="text-white">DAW</h2>
    </main>
  );
}
