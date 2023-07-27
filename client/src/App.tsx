import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch } from './store/hooks/useAppDispatch.ts';
import { USER_ACTIONS } from './store/actions/userActions.ts';
import { useAppSelector } from './store/hooks/useAppSelector.ts';
import { selectUser } from './store/slices/userSlice.ts';
import AbstractSpinner from './components/Ui/Spinners/AbstractSpinner.tsx';
import { User } from './models/user.ts';

function App() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  useEffect(() => {
    if (localStorage.getItem('jwt')) {
      dispatch({ type: USER_ACTIONS.GET_LOGGED_IN_USER_ASYNC });
    }
  }, []);

  useEffect(() => {
    if (!user.user) {
      return;
    }

    const dispatchRefreshToken = (user: User) => {
      if (user && user.token) {
        dispatch({ type: USER_ACTIONS.REFRESH_TOKEN_ASYNC });
      }
    };
    const timeoutFunc = () => {
      dispatchRefreshToken(user.user!);
    };

    const jwtToken = JSON.parse(atob(user.user.token.split('.')[1]));
    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - 29 * 60 * 1000;
    const timeOutId = setTimeout(timeoutFunc, timeout);

    return () => {
      clearTimeout(timeOutId);
    };
  }, [user.user]);

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
