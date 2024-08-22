import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, Navigate, useLocation } from 'react-router-dom';
import RockPaperScissors from 'components/RockPaperScissors';
import { gameReducer, initialGameState } from 'utils/gameReducer';
import { copyToClipboard } from 'utils/utilityFunctions';
import { DEFAULT_PLAYER_NAME, GAME_MODES, RPS_ACTION_TYPES } from 'constants/game.constants';

function MultiPlayerMode() {
  const { t } = useTranslation();
  const location = useLocation();
  // create room
  // wait for other user to join game
  const [state, dispatch] = React.useReducer(gameReducer, initialGameState);
  const [inputValue, setInputValue] = React.useState('');
  const [roomId, setRoomId] = React.useState('');
  const [opponent, setOpponent] = React.useState('');

  const handleOnCopyClick = () => {
    copyToClipboard(roomId);
  };

  const handleOnResetGame = () => {
    dispatch({ type: RPS_ACTION_TYPES.RESET_GAME });
  };

  const joinRoom = () => {
    // join room api
    setRoomId(inputValue);
    setOpponent('Opponent');
  };

  const onUserChoice = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(e);
    // save user choice
  };

  // if user tries to navigate to this page from the url skipping the userPlayerName required param, redirect to home page
  if (!location.state?.userPlayerName) {
    return <Navigate to="/" replace />;
  }

  React.useEffect(() => {
    if (location.state?.roomId) {
      setRoomId(location.state?.roomId);
    }
  }, [location.state?.roomId]);

  return (
    <main>
      {roomId ? (
        <div className="text-center">
          {opponent ? (
            <RockPaperScissors
              mode={GAME_MODES.multi}
              onUserChoice={onUserChoice}
              onResetGame={handleOnResetGame}
              state={state}
              userPlayerName={location.state?.userPlayerName || DEFAULT_PLAYER_NAME.USER}
              serverPlayerName={opponent}
            />
          ) : (
            <div>
              <p className="text-center">
                Room ID: {roomId}
                <button onClick={handleOnCopyClick}>{t('copy')}</button>
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
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button onClick={joinRoom}>Join Room</button>
          <Link className="text-center" to="/">
            {t('back_to_home')}
          </Link>
        </div>
      )}
    </main>
  );
}

export default MultiPlayerMode;
