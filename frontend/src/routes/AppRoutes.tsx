import React from 'react';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import Lobby from 'components/Lobby';
import SinglePlayerMode from 'components/SinglePlayerMode';
import MultiplayerMode from 'components/MultiPlayerMode';
import NotFound from 'components/404';
import ErrorBoundary from 'components/ErrorBoundary';
const router = createHashRouter([
  {
    path: '/',
    element: <Lobby />,
  },
  {
    path: '/play-server',
    element: (
      <ErrorBoundary>
        <SinglePlayerMode />
      </ErrorBoundary>
    ),
  },
  {
    /*path: '/room/:roomId',*/
    path: '/room',
    element: (
      <ErrorBoundary>
        <MultiplayerMode />
      </ErrorBoundary>
    ),
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

const AppRoutes = () => <RouterProvider router={router} />;

export default AppRoutes;
