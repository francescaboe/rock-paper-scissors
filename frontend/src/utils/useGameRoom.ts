import React from 'react';
import { io, Socket } from 'socket.io-client';
import { createRoomApi, joinRoomApi } from 'api/gameApi';
import { useLocation } from 'react-router-dom';

function useGameRoom() {
  const location = useLocation();
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
    const data = await createRoomApi({ username });
    setRoomId(data.roomId);
    setClientUser(username);
  };

  // on join game click - in room
  const onJoinRoom = () => {
    joinRoomApi({ username: clientUser, roomId: inputRoomId })
      .then((resp) => {
        setRoomId(resp.roomId);
        setOpponent(resp.players[0]);
        socket?.emit('joinRoom', { roomId: resp.roomId, username: clientUser });
      })
      .catch((e) => {
        console.log(e);
      });
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
  };
}

export default useGameRoom;
