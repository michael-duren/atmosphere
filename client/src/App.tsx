import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAppDispatch } from './store/hooks/useAppDispatch.ts';
import { USER_ACTIONS } from './store/actions/userActions.ts';
import { useAppSelector } from './store/hooks/useAppSelector.ts';
import { selectUser } from './store/slices/userSlice.ts';
import { User } from './models/user.ts';
import { Toaster } from 'react-hot-toast';

function App() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const [timeOutId, setTimeOutId] = useState<number | null>(null);

  useEffect(() => {
    // If the user is logged in, get the user object from the server
    if (localStorage.getItem('jwt') && !user.user) {
      dispatch({ type: USER_ACTIONS.GET_LOGGED_IN_USER_ASYNC });
    }
  }, []);

  useEffect(() => {
    // If the user is not logged in, return.
    if (!user.user) {
      return;
    }
    if (timeOutId) {
      clearTimeout(timeOutId); // clear previous timeout if it exists
    }

    // helper function to dispatch refresh token action
    const dispatchRefreshToken = (user: User) => {
      if (user && user.token) {
        dispatch({ type: USER_ACTIONS.REFRESH_TOKEN_ASYNC });
      }
    };
    // function to call helper when the timeout is reached
    const timeoutFunc = () => {
      dispatchRefreshToken(user.user!);
    };

    const jwtToken = JSON.parse(atob(user.user.token.split('.')[1])); // get the expiration time from the token
    const expires = new Date(jwtToken.exp * 1000); // convert to milliseconds
    const timeout = expires.getTime() - Date.now() - 50 * 1000; // subtract 50 seconds to give a buffer
    const currentTimeOutId = setTimeout(timeoutFunc, timeout); // set the timeout
    setTimeOutId(currentTimeOutId); // save the timeout id to state to be cleared when the component unmounts or the timeout is reset

    return () => {
      if (timeOutId) {
        clearTimeout(timeOutId); // clear the timeout when the component unmounts
      }
    };
  }, [user.user]); // listen to changes in the user object

  return (
    <>
      <Outlet />
      <Toaster
        toastOptions={{
          style: {
            color: '#fff',
            background: 'black',
            border: '1px solid #44403C',
          },
        }}
      />
    </>
  );
}

export default App;
