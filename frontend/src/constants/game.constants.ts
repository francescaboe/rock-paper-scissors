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
