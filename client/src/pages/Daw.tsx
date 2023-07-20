import { useAppSelector } from '../store/hooks/useAppSelector.ts';
import { selectUser } from '../store/slices/userSlice.ts';
import { router } from '../router/Routes.tsx';
import { useAppDispatch } from '../store/hooks/useAppDispatch.ts';
import { USER_ACTIONS } from '../store/actions/userActions.ts';

export default function Daw() {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  if (!user) router.navigate('/');
  console.log(user);
  const signOut = () => dispatch({ type: USER_ACTIONS.LOGOUT_ASYNC });

  return (
    <main className="p-8 w-full flex justify-between">
      <h2 className="text-white">DAW</h2>
      <button onClick={signOut} className="text-xl text-white">
        SIGN OUT
      </button>
    </main>
  );
}
