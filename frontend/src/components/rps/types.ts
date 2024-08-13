export enum IDLE_PLAYERS {
  playerUser = '🤛',
  playerServer = '🤜',
  result = '...',
}

export const options: string[] = ['✊', '🖐️', '✌️'];
export const optionLabels: { [key: string]: string } = {
  '✊': 'Rock',
  '🖐️': 'Paper',
  '✌️': 'Scissors',
};

// winner: looser
export const outcomes: { [key: string]: string | undefined } = {
  '✊': '✌️',
  '🖐️': '✊',
  '✌️': '🖐️',
};

export enum RoPaScActionTypes {
  START_GAME = 'START_GAME',
  END_GAME = 'END_GAME',
  UPDATE_GAME = 'UPDATE_GAME',
  RESET_GAME = 'RESET_GAME',
}

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
