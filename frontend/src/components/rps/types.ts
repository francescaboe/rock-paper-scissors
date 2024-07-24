export enum IDLE_PLAYERS {
  playerUser = '🤛',
  playerServer = '🤜',
}

export enum TEXT {
  draw = 'Draw',
  server_win = 'I win!',
  no_winner = 'No winner yet!',
  user_win = 'You win!',
  play = 'Play',
  reset = 'Reset',
  result = 'Result',
  score = 'Score: ',
  serverPlayer = 'Server player name',
  userPlayer = 'Your name',
}
export const options: string[] = ['✊', '🖐️', '✌️'];

// winner: looser
export const outcomes: { [key: string]: string | undefined } = {
  '✊': '✌️',
  '🖐️': '✊',
  '✌️': '🖐️',
};

export enum RoPaScActionTypes {
  START_GAME = 'START_GAME',
  UPDATE_PLAYER_USER = 'UPDATE_PLAYER_USER',
  UPDATE_PLAYER_SERVER = 'UPDATE_PLAYER_SERVER',
  UPDATE_SCORE = 'UPDATE_SCORE',
  RESET_GAME = 'RESET_GAME',
}

// An interface for our actions
export interface RoPaScAction {
  type: RoPaScActionTypes;
  payload?: string | boolean;
}

// An interface for our state
export interface RoPaScState {
  playerUser: string;
  playerServer: string;
  isPlaying: boolean;
  score: { server: number; user: number };
}
