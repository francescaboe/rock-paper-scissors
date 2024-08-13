// Reducer
import { IDLE_PLAYERS, outcomes, RoPaScAction, RoPaScActionTypes, RoPaScState } from './types';
import i18n from 'i18next';

export const initialGameState = {
  playerUser: IDLE_PLAYERS.playerUser,
  playerServer: IDLE_PLAYERS.playerServer,
  isPlaying: false,
  result: IDLE_PLAYERS.result,
  score: {
    user: 0,
    server: 0,
  },
};

export function gameReducer(state: RoPaScState, action: RoPaScAction) {
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
          result = i18n.t('user_win');
        } else {
          updatedScore.server += 1;
          result = i18n.t('server_win');
        }
      } else {
        result = i18n.t('draw');
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
      return initialGameState;
    default:
      return state;
  }
}
