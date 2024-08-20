import { gameReducer, initialGameState } from './gameReducer';
import { RPS_ACTION_TYPES } from 'constants/game.constants';

jest.mock('i18next', () => ({
  t: jest.fn((key) => key),
}));

describe('gameReducer', () => {
  /*  it('should handle START_GAME action', () => {
    const action = { type: RPS_ACTION_TYPES.START_GAME };
    const newState = gameReducer(initialGameState, action);
    expect(newState.isPlaying).toBe(true);
  });*/

  /*  it('should handle END_GAME action', () => {
    const initialState = { ...initialGameState, isPlaying: true };
    const action = { type: RPS_ACTION_TYPES.END_GAME };
    const newState = gameReducer(initialState, action);
    expect(newState.isPlaying).toBe(false);
    expect(newState.playerUser).toBe(initialGameState.playerUser);
    expect(newState.playerServer).toBe(initialGameState.playerServer);
    expect(newState.result).toBe(initialGameState.result);
  });*/

  it('should handle UPDATE_GAME action when user wins', () => {
    const action = {
      type: RPS_ACTION_TYPES.UPDATE_GAME,
      payload: { playerUser: 'rock', playerServer: 'scissors' },
    };
    const newState = gameReducer(initialGameState, action);
    expect(newState.playerUser).toBe('rock');
    expect(newState.playerServer).toBe('scissors');
    expect(newState.score.user).toBe(1);
    expect(newState.score.server).toBe(0);
    expect(newState.result).toBe('user_win');
  });

  it('should handle UPDATE_GAME action when server wins', () => {
    const action = {
      type: RPS_ACTION_TYPES.UPDATE_GAME,
      payload: { playerUser: 'scissors', playerServer: 'rock' },
    };
    const newState = gameReducer(initialGameState, action);
    expect(newState.playerUser).toBe('scissors');
    expect(newState.playerServer).toBe('rock');
    expect(newState.score.user).toBe(0);
    expect(newState.score.server).toBe(1);
    expect(newState.result).toBe('server_win');
  });

  it("should handle UPDATE_GAME action when it's a draw", () => {
    const action = {
      type: RPS_ACTION_TYPES.UPDATE_GAME,
      payload: { playerUser: 'paper', playerServer: 'paper' },
    };
    const newState = gameReducer(initialGameState, action);
    expect(newState.playerUser).toBe('paper');
    expect(newState.playerServer).toBe('paper');
    expect(newState.score.user).toBe(0);
    expect(newState.score.server).toBe(0);
    expect(newState.result).toBe('draw');
  });

  /* it('should handle RESET_GAME action', () => {
    const initialState = {
      ...initialGameState,
      isPlaying: true,
      score: { user: 5, server: 3 },
    };
    const action = { type: RPS_ACTION_TYPES.RESET_GAME };
    const newState = gameReducer(initialState, action);
    expect(newState).toEqual(initialGameState);
  });*/

  /*  it('should return the current state for unknown action types', () => {
    const action = { type: 'UNKNOWN_ACTION' };
    const newState = gameReducer(initialGameState, action);
    expect(newState).toEqual(initialGameState);
  });*/
});
