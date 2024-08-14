// Reducer
import { RoPaScAction, RoPaScState } from 'types/game.types';
import { IDLE_PLAYERS, RPS_ACTION_TYPES, outcomes } from 'constants/game.constants';
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
    case RPS_ACTION_TYPES.START_GAME:
      return { ...state, isPlaying: true };
    case RPS_ACTION_TYPES.END_GAME:
      return {
        ...state,
        playerUser: IDLE_PLAYERS.playerUser,
        playerServer: IDLE_PLAYERS.playerServer,
        isPlaying: false,
        result: IDLE_PLAYERS.result,
      };
    case RPS_ACTION_TYPES.UPDATE_GAME: {
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
    case RPS_ACTION_TYPES.RESET_GAME:
      return initialGameState;
    default:
      return state;
  }
}
