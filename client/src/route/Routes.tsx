import { createBrowserRouter, RouteObject } from 'react-router-dom';
import Home from '../pages/Home.tsx';
import Daw from '../pages/Daw.tsx';
import App from '../App.tsx';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      { path: '', element: <Home /> },
      { path: 'app', element: <Daw /> },
      // { path: '*', element: <Navigate replace to="/not-found" /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
