// Reducer
import {
  IDLE_PLAYERS,
  outcomes,
  RoPaScAction,
  RoPaScActionTypes,
  RoPaScState,
  TEXT,
} from './types';

export const initialState = {
  playerUser: IDLE_PLAYERS.playerUser,
  playerServer: IDLE_PLAYERS.playerServer,
  isPlaying: false,
  result: IDLE_PLAYERS.result,
  score: {
    user: 0,
    server: 0,
  },
};

export function reducer(state: RoPaScState, action: RoPaScAction) {
  switch (action.type) {
    case RoPaScActionTypes.START_GAME:
      return { ...state, isPlaying: true };
    case RoPaScActionTypes.END_GAME:
      return {
        ...state,
        playerUser: IDLE_PLAYERS.playerUser,
        playerServer: IDLE_PLAYERS.playerServer,
        isPlaying: false,
        result: IDLE_PLAYERS.result,
      };
    case RoPaScActionTypes.UPDATE_GAME: {
      const { playerUser, playerServer } = action.payload;
      const updatedScore = { ...state.score };
      let result: string;

      if (playerServer !== playerUser) {
        if (playerServer === outcomes[playerUser]) {
          updatedScore.user += 1;
          result = TEXT.user_win;
        } else {
          updatedScore.server += 1;
          result = TEXT.server_win;
        }
      } else {
        result = TEXT.draw;
      }
      return {
        ...state,
        playerServer,
        playerUser,
        score: updatedScore,
        result,
      };
    }
    case RoPaScActionTypes.RESET_GAME:
      return initialState;
    default:
      return state;
  }
}
