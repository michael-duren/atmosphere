import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch } from './store/hooks/useAppDispatch.ts';
import { USER_ACTIONS } from './store/actions/userActions.ts';
import { useAppSelector } from './store/hooks/useAppSelector.ts';
import { selectUser } from './store/slices/userSlice.ts';
import AbstractSpinner from './components/Ui/Spinners/AbstractSpinner.tsx';

function App() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  useEffect(() => {
    if (localStorage.getItem('jwt')) {
      dispatch({ type: USER_ACTIONS.GET_LOGGED_IN_USER_ASYNC });
    }
  }, []);

  if (user.isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[100vh]">
        <AbstractSpinner />
      </div>
    );
  }

  return (
    <>
      <Outlet />
    </>
  );
}

export default App;
