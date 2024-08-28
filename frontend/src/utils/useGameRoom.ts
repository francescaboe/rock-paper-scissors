import React from 'react';
import { io, Socket } from 'socket.io-client';
import { useLocation } from 'react-router-dom';
import { createRoomApi, joinRoomApi } from 'api/gameApi';
import useApiCall from 'utils/useApiCall';

function useGameRoom() {
  const location = useLocation();
  const { callApi, isLoading, error, LoadingComponent, ErrorComponent } = useApiCall();
  const [roomId, setRoomId] = React.useState('');
  const [inputRoomId, setInputRoomId] = React.useState('');
  const [clientUser, setClientUser] = React.useState(location.state?.userPlayerName || '');
  const [opponent, setOpponent] = React.useState('');
  const [socket, setSocket] = React.useState<Socket | null>(null);

  // Socket listening to opponent actions
  React.useEffect(() => {
    const newSocket = io('http://localhost:4000', {
      transports: ['websocket'], // Ensure it uses WebSocket and not long-polling
    });

    newSocket.on('connect', () => {
      console.log('Socket connected:', newSocket.id); // This should log the socket id if connected
    });

    // listens for the opponentJoined event
    newSocket.on('opponentJoined', (data: { roomId: string; username: string }) => {
      setOpponent(data.username);
    });

    newSocket.on('disconnect', (reason) => {
      console.log('Socket disconnected:', reason);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  // set roomId - from lobby
  React.useEffect(() => {
    if (location.state?.roomId) {
      setRoomId(location.state?.roomId);
    }
  }, [location.state?.roomId, setRoomId]);

  // on start game click - in lobby
  const onCreateRoom = async (username: string) => {
    const data = await callApi<{ roomId: string; players: string[] }>(() =>
      createRoomApi({ username }),
    );
    if (data) {
      const { roomId } = data;
      // Handle the result
      setRoomId(roomId);
      setClientUser(username);
      // consider setClientUser(players[0]); if players[0] becomes an object
    }
  };

  // on join game click - in room
  const onJoinRoom = async () => {
    const data = await callApi<{ roomId: string; players: string[] }>(() =>
      joinRoomApi({ username: clientUser, roomId: inputRoomId }),
    );
    if (data) {
      const { roomId, players } = data;
      setRoomId(roomId);
      setOpponent(players[0]);
      socket?.emit('joinRoom', { roomId, username: clientUser });
    }
  };

  return {
    onCreateRoom,
    onJoinRoom,
    roomId,
    setRoomId,
    inputRoomId,
    setInputRoomId,
    clientUser,
    opponent,
    isLoading,
    error,
    LoadingComponent,
    ErrorComponent,
  };
}

export default useGameRoom;
