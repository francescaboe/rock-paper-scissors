import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Lobby from 'components/Lobby';
import SinglePlayerMode from 'components/SinglePlayerMode';
import MultiplayerMode from 'components/MultiPlayerMode';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Lobby />,
  },
  {
    path: '/play-server',
    element: <SinglePlayerMode />,
  },
  {
    /*path: '/room/:roomId',*/
    path: '/room',
    element: <MultiplayerMode />,
  },
]);

const AppRoutes = () => <RouterProvider router={router} />;

export default AppRoutes;
