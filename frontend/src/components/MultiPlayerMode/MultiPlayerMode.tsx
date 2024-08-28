import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import RockPaperScissors from 'components/RockPaperScissors';
import { gameReducer, initialGameState } from 'utils/gameReducer';
import useGameRoom from 'utils/useGameRoom';
import { onCopyToClipboard } from 'utils/utilityFunctions';
import { DEFAULT_PLAYER_NAME, GAME_MODES, RPS_ACTION_TYPES } from 'constants/game.constants';

function MultiPlayerMode() {
  const { t } = useTranslation();
  const [gameState, dispatch] = React.useReducer(gameReducer, initialGameState);
  const {
    onJoinRoom,
    roomId,
    inputRoomId,
    setInputRoomId,
    clientUser,
    opponent,
    LoadingComponent,
    ErrorComponent,
  } = useGameRoom();

  const handleOnResetGame = () => {
    dispatch({ type: RPS_ACTION_TYPES.RESET_GAME });
  };

  const onUserChoice = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(e);
    // send user choice to server
  };

  return (
    <main>
      {roomId ? (
        <div className="text-center">
          {opponent ? (
            <RockPaperScissors
              mode={GAME_MODES.multi}
              onUserChoice={onUserChoice}
              onResetGame={handleOnResetGame}
              state={gameState}
              userPlayerName={clientUser || DEFAULT_PLAYER_NAME.USER}
              serverPlayerName={opponent}
            />
          ) : (
            <div>
              <p className="text-center">
                Room ID: {roomId}
                <button value={roomId} onClick={onCopyToClipboard}>
                  {t('copy')}
                </button>
              </p>
              <p className="text-center">Waiting for opponent...</p>
            </div>
          )}
          <Link className="text-center" to="/">
            {t('back_to_home')}
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-8 justify-center items-center">
          <input
            className="text-center"
            type="text"
            placeholder="add Room ID"
            value={inputRoomId}
            onChange={(e) => setInputRoomId(e.target.value)}
          />
          <button onClick={onJoinRoom}>Join Room</button>
          <Link className="text-center" to="/">
            {t('back_to_home')}
          </Link>
        </div>
      )}
      {LoadingComponent}
      {ErrorComponent}
    </main>
  );
}

export default MultiPlayerMode;
