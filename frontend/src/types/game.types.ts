import React from 'react';

type NoPayload = { type: 'START_GAME' | 'RESET_GAME' | 'END_GAME' };
type UpdateGame = { type: 'UPDATE_GAME'; payload: { playerServer: string; playerUser: string } };

// An interface for our actions
export type RoPaScAction = NoPayload | UpdateGame;

// An interface for our state
export interface RoPaScState {
  playerUser: string;
  playerServer: string;
  isPlaying: boolean;
  result: string;
  score: { server: number; user: number };
}

export interface RockPaperScissorsBoardProps {
  mode: 'multi' | 'single';
  onUserChoice: (e: React.MouseEvent<HTMLButtonElement>) => void;
  state: RoPaScState;
}
