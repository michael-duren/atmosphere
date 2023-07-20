import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '../store/hooks/useAppSelector.ts';
import { selectCommon } from '../store/slices/commonSlice.ts';

export default function RequireAuth() {
  const location = useLocation();
  const common = useAppSelector(selectCommon);

  if (!common.token) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  return <Outlet />;
}
