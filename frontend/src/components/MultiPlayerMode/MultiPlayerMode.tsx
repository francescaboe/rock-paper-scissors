import React from 'react';
import RockPaperScissors from 'components/RockPaperScissors';
import { GAME_MODES, RPS_ACTION_TYPES } from 'constants/game.constants';
import { gameReducer, initialGameState } from 'utils/gameReducer';

function MultiPlayerMode() {
  // create room
  // wait for other user to join game
  const [state, dispatch] = React.useReducer(gameReducer, initialGameState);
  const onUserChoice = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(e);
    // persist result
    // POST to server
    // GET from server user choice
    // when both choices are received, compare them and update state
  };

  const handleOnResetGame = () => {
    dispatch({ type: RPS_ACTION_TYPES.RESET_GAME });
  };

  return (
    <div>
      {/* Add both user and server names */}
      <RockPaperScissors
        mode={GAME_MODES.multi}
        onUserChoice={onUserChoice}
        onResetGame={handleOnResetGame}
        state={state}
        userPlayerName="Placeholder User"
        serverPlayerName="Placeholder Server"
      />
      {/*TODO: add chat later*/}
      {/* <button className="absolute bottom-1 left-2 border-2 p-2" disabled>
        Chat
      </button>*/}
    </div>
  );
}

export default MultiPlayerMode;
