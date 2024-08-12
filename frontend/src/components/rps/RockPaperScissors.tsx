import React from 'react';
import { optionLabels, options, RoPaScActionTypes, TEXT } from './types';
import { initialGameState, gameReducer } from './gameReducer';

function RockPaperScissors() {
  const [state, dispatch] = React.useReducer(gameReducer, initialGameState);
  const { playerUser, playerServer, isPlaying, result, score } = state;

  const isIdleEmoji = (player: string) => player === '🤜' || player === '🤛';

  const handleOnOptionClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // persist result
    const pl = e.currentTarget.name;
    dispatch({ type: RoPaScActionTypes.END_GAME });
    dispatch({ type: RoPaScActionTypes.START_GAME });

    setTimeout(() => {
      // VS COMPUTER
      // Get the random option using the random index
      const randomIndex = Math.floor(Math.random() * options.length);
      const randomOption = options[randomIndex];
      dispatch({
        type: RoPaScActionTypes.UPDATE_GAME,
        payload: { playerServer: randomOption, playerUser: pl },
      });
      // VS SERVER PLAYER
      // TODO
    }, 1800);

    // 3 seconds later, reset players (but not score)
    setTimeout(() => {
      dispatch({ type: RoPaScActionTypes.END_GAME });
    }, 3000);
  };

  return (
    <main className="p-2 h-lvh bg-amber-50 flex flex-col">
      <h1 className="text-center">Play Rock Paper Scissors</h1>
      <section className="text-center w-full h-full flex flex-col justify-around items-center md:inline-flex md:flex-row-reverse">
        {/*SERVER PLAYER*/}
        <div className="flex flex-col gap-6">
          {/*aria-live="polite" announces the score update without interrupting screen reader*/}
          <h2 className="flex flex-col" aria-live="polite">
            <span id="server-score-label">{TEXT.serverPlayer}</span>
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
            <span id="user-score-label">{TEXT.userPlayer}</span>
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
