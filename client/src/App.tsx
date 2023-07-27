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

  // Token refresh logic
  // useEffect(() => {
  //   const refreshToken = async () => {
  //     try {
  //       const refreshedUser = await agent.Account.refreshToken();
  //       dispatch(setUser(refreshedUser));
  //       dispatch(setToken(refreshedUser.token));
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };
  //
  //   if (user && user.token) {
  //     const jwtToken = JSON.parse(atob(user.token.split('.')[1]));
  //     const expires = new Date(jwtToken.exp * 1000);
  //     const timeout = expires.getTime() - Date.now() - 30 * 1000;
  //
  //     const timerId = setTimeout(refreshToken, timeout);
  //
  //     return () => {
  //       clearTimeout(timerId);
  //     };
  //   }
  // }, [user, dispatch]);

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
