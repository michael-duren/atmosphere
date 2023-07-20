import { useAppSelector } from '../store/hooks/useAppSelector.ts';
import { selectUser } from '../store/slices/userSlice.ts';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export default function RequireAuth() {
  const { user } = useAppSelector(selectUser);
  const location = useLocation();

  if (!user?.token) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  return <Outlet />;
}
