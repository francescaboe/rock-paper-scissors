export enum IDLE_PLAYERS {
  playerUser = 'fist_left',
  playerServer = 'fist_right',
  result = '...',
}

export enum EMOJIS {
  rock = '✊',
  paper = '✋',
  scissors = '✌️',
  fist_left = '🤛',
  fist_right = '🤜',
  '?' = '❓',
}

export const options: string[] = ['rock', 'paper', 'scissors'];

// winner: looser
export const outcomes: { [key: string]: string | undefined } = {
  rock: 'scissors',
  paper: 'rock',
  scissors: 'paper',
};

export enum RPS_ACTION_TYPES {
  START_GAME = 'START_GAME',
  END_GAME = 'END_GAME',
  UPDATE_GAME = 'UPDATE_GAME',
  RESET_GAME = 'RESET_GAME',
}

export enum TIMERS {
  EIGHTEEN = 1800,
  THIRTY = 3000,
}

export enum GAME_MODES {
  multi = 'multi',
  single = 'single',
}

export enum DEFAULT_PLAYER_NAME {
  USER = 'You',
  SERVER = 'Server',
}
