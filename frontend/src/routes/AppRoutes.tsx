import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Lobby from 'components/Lobby';
import SinglePlayerMode from 'components/SinglePlayerMode';
//import GameRoom from 'components/MultiplayerMode/GameRoom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Lobby />,
  },
  {
    path: '/play-server',
    element: <SinglePlayerMode />,
  },
  /*  {
    path: '/room/:roomId',
    element: <GameRoom />,
  },*/
]);

const AppRoutes = () => <RouterProvider router={router} />;

export default AppRoutes;
