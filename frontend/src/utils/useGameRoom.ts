import React from 'react';
import { io, Socket } from 'socket.io-client';
import { createRoomApi, joinRoomApi } from 'api/gameApi';
import { useLocation } from 'react-router-dom';

function useGameRoom() {
  const [roomId, setRoomId] = React.useState('');
  const [inputRoomId, setInputRoomId] = React.useState('');
  const [startUser, setStartUser] = React.useState('');
  const [opponent, setOpponent] = React.useState('');
  const [socket, setSocket] = React.useState<Socket | null>(null);

  const location = useLocation();

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

  React.useEffect(() => {
    if (location.state?.roomId) {
      setRoomId(location.state?.roomId);
    }
  }, [location.state?.roomId, setRoomId]);

  const onCreateRoom = (creatingUser: string) => {
    createRoomApi({ username: creatingUser })
      .then((resp) => {
        setRoomId(resp.roomId);
        setStartUser(creatingUser);
        socket?.emit('joinRoom', { roomId: resp.roomId, username: creatingUser });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const onJoinRoom = (joiningUser: string, joinRoomId: string) => {
    joinRoomApi({ username: joiningUser, roomId: joinRoomId })
      .then((resp) => {
        setRoomId(resp.roomId);
        setOpponent(joiningUser);
        socket?.emit('joinRoom', { roomId: resp.roomId, username: joiningUser });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleOnJoinRoom = () => {
    try {
      onJoinRoom(location.state?.userPlayerName, inputRoomId);
    } catch (error) {
      console.error('Error joining room:', error);
    }
  };

  return {
    onCreateRoom,
    handleOnJoinRoom,
    roomId,
    setRoomId,
    inputRoomId,
    setInputRoomId,
    startUser,
    opponent,
  };
}

export default useGameRoom;
