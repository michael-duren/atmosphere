import { createBrowserRouter, Navigate, RouteObject } from 'react-router-dom';
import Home from '../pages/Home.tsx';
import Daw from '../pages/Daw.tsx';
import App from '../App.tsx';
import RequireAuth from './RequireAuth.tsx';
import NotFound from '../pages/NotFound.tsx';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        element: <RequireAuth />,
        children: [{ path: 'app', element: <Daw /> }],
      },
      { path: '', element: <Home /> },
      { path: 'not-found', element: <NotFound /> },
      { path: '*', element: <Navigate replace to="/not-found" /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
