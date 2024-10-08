import React from 'react';
import { optionLabels, options, RPS_ACTION_TYPES, TIMERS } from 'constants/game.constants';
import { initialGameState, gameReducer } from 'utils/gameReducer';
import { useTranslation } from 'react-i18next';

function RockPaperScissors() {
  const { i18n } = useTranslation();
  const [state, dispatch] = React.useReducer(gameReducer, initialGameState);
  const { playerUser, playerServer, isPlaying, result, score } = state;

  const isIdleEmoji = (player: string) => player === '🤜' || player === '🤛';

  const handleOnOptionClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // persist result
    const pl = e.currentTarget.name;
    dispatch({ type: RPS_ACTION_TYPES.END_GAME });
    dispatch({ type: RPS_ACTION_TYPES.START_GAME });

    setTimeout(() => {
      // VS COMPUTER
      // Get the random option using the random index
      const randomIndex = Math.floor(Math.random() * options.length);
      const randomOption = options[randomIndex];
      dispatch({
        type: RPS_ACTION_TYPES.UPDATE_GAME,
        payload: { playerServer: randomOption, playerUser: pl },
      });
      // VS SERVER PLAYER
      // TODO
    }, TIMERS.EIGHTEEN);

    // 3 seconds later, reset players (but not score)
    setTimeout(() => {
      dispatch({ type: RPS_ACTION_TYPES.END_GAME });
    }, TIMERS.THIRTY);
  };

  return (
    <main className="p-2 h-lvh bg-amber-50 flex flex-col">
      <h1 className="text-center">{i18n.t('rock_paper_scissors')}</h1>
      <section className="text-center w-full h-full flex flex-col justify-around items-center md:inline-flex md:flex-row-reverse">
        {/*SERVER PLAYER*/}
        <div className="flex flex-col gap-6">
          {/*aria-live="polite" announces the score update without interrupting screen reader*/}
          <h2 className="flex flex-col" aria-live="polite">
            <span id="server-score-label">{i18n.t('server_player')}</span>
            <span className="text-4xl" aria-labelledby="server-score-label" aria-live="polite">
              {score.server}
            </span>
          </h2>
          <p>
            <span className="text-6xl">❓</span>
            <span className="text-6xl">❓</span>
            <span className="text-6xl">❓</span>
          </p>
        </div>
        {/*PLAYGROUND*/}
        <p className="text-center gap-4 flex flex-col justify-around items-center md:inline-flex md:flex-row-reverse">
          <span
            className={`text-6xl ${isIdleEmoji(playerServer) && 'rotate-90 md:-rotate-90'} ${isPlaying && 'animate-throwing md:animate-throwing-md'}`}
            aria-label={optionLabels[playerServer]}
            role="img"
          >
            {playerServer}
          </span>
          <span className="text-2xl md:w-20" aria-live="polite">
            {result}
          </span>
          <span
            className={`text-6xl ${isIdleEmoji(playerUser) && 'rotate-90'} ${isPlaying && 'animate-throwing'}`}
            aria-label={optionLabels[playerUser]}
            aria-live="polite"
          >
            {playerUser}
          </span>
        </p>
        {/*USER PLAYER*/}
        <div className="flex flex-col gap-6">
          <h2 className="flex flex-col" aria-live="polite">
            <span id="user-score-label">{i18n.t('user_player')}</span>
            <span className="text-4xl" aria-labelledby="user-score-label">
              {score.user}
            </span>
          </h2>
          <p className="flex justify-center gap-2">
            {options.map((opt) => (
              <button
                onClick={handleOnOptionClick}
                className="text-6xl disabled:opacity-20"
                key={opt}
                name={opt}
                aria-label={optionLabels[opt]}
                disabled={isPlaying}
              >
                {opt}
              </button>
            ))}
          </p>
        </div>
      </section>
      {/*TODO: add chat later*/}
      {/* <button className="absolute bottom-1 left-2 border-2 p-2" disabled>
        Chat
      </button>*/}
    </main>
  );
}

export default RockPaperScissors;
