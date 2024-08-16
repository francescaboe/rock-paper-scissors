import React from 'react';
import { useLocation } from 'react-router-dom';
import RockPaperScissorsBoard from 'components/RockPaperScissors';
import {
  DEFAULT_PLAYER_NAME,
  GAME_MODES,
  options,
  RPS_ACTION_TYPES,
  TIMERS,
} from 'constants/game.constants';
import { gameReducer, initialGameState } from 'utils/gameReducer';

function SinglePlayerMode() {
  const [state, dispatch] = React.useReducer(gameReducer, initialGameState);
  const location = useLocation();

  const handleOnOptionClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // persist result
    const pl = e.currentTarget.name;
    dispatch({ type: RPS_ACTION_TYPES.END_GAME });
    dispatch({ type: RPS_ACTION_TYPES.START_GAME });

    setTimeout(() => {
      // Get the random option using the random index
      const randomIndex = Math.floor(Math.random() * options.length);
      const randomOption = options[randomIndex];
      dispatch({
        type: RPS_ACTION_TYPES.UPDATE_GAME,
        payload: { playerServer: randomOption, playerUser: pl },
      });
    }, TIMERS.EIGHTEEN);

    // 3 seconds later, reset players (but not score)
    setTimeout(() => {
      dispatch({ type: RPS_ACTION_TYPES.END_GAME });
    }, TIMERS.THIRTY);
  };

  const handleOnResetGame = () => {
    dispatch({ type: RPS_ACTION_TYPES.RESET_GAME });
  };

  return (
    <div>
      <RockPaperScissorsBoard
        mode={GAME_MODES.single}
        onUserChoice={handleOnOptionClick}
        onResetGame={handleOnResetGame}
        state={state}
        userPlayerName={location.state?.userPlayerName || DEFAULT_PLAYER_NAME.USER}
        serverPlayerName={DEFAULT_PLAYER_NAME.SERVER}
      />
    </div>
  );
}

export default SinglePlayerMode;
