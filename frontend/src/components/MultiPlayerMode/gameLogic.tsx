import React, { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { RPS_ACTION_TYPES } from 'constants/game.constants';

export const useMultiplayerMode = ({ dispatch }) => {
  /*const [socket, setSocket] = React.useState<Socket | null>(null);
  const [roomId, setRoomId] = React.useState<string | null>(null);
  const [opponent, setOpponent] = React.useState<string | null>(null);
  const [userPlayerName, setUserPlayerName] = React.useState('');
  const [error, setError] = React.useState('');

  useEffect(() => {
    const newSocket = io('http://localhost:3001');
    setSocket(newSocket);

    newSocket.on('roomCreated', (id: string) => {
      setRoomId(id);
    });

    newSocket.on('opponentJoined', (opponentName: string) => {
      setOpponent(opponentName);
    });

    newSocket.on('gameResult', (result: any) => {
      dispatch({ type: RPS_ACTION_TYPES.UPDATE_GAME, payload: result });
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const createRoom = () => {
    if (socket) {
      socket.emit('createRoom');
    }
  };

  const joinRoom = (id: string) => {
    if (socket) {
      socket.emit('joinRoom', id);
    }
  };

  const onUserChoice = (e: React.MouseEvent<HTMLButtonElement>) => {
    const choice = e.currentTarget.name;
    if (socket && roomId) {
      socket.emit('makeChoice', { roomId, choice });
    }
  };

  const handleOnResetGame = () => {
    dispatch({ type: RPS_ACTION_TYPES.RESET_GAME });
    if (socket && roomId) {
      socket.emit('resetGame', roomId);
    }
  };

  return {
    createRoom,
    joinRoom,
    onUserChoice,
    handleOnResetGame,
    roomId,
    opponent,
    userPlayerName,
    error,
    socket,
  }; */
};
