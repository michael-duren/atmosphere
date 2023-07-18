import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppSelector } from './store/hooks/useAppSelector.ts';
import { useAppDispatch } from './store/hooks/useAppDispatch.ts';
import { USER_ACTIONS } from './store/actions/userActions.ts';
import { selectCommon } from './store/slices/commonSlice.ts';

function App() {
  const { token } = useAppSelector(selectCommon);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (token) {
      dispatch({ type: USER_ACTIONS.GET_LOGGED_IN_USER_ASYNC });
    }
  }, [token]);

  return (
    <>
      <Outlet />
    </>
  );
}

export default App;
