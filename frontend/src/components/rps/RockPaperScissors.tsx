import React from 'react';
import { options, RoPaScActionTypes, TEXT } from './types';
import { initialState, reducer } from './reducer';

function RockPaperScissors() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
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
          <h2 className="flex flex-col">
            <span>{TEXT.serverPlayer}</span>
            <span className="text-4xl">{score.server}</span>
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
          >
            {playerServer}
          </span>
          <span className="text-2xl md:w-20">{result}</span>
          <span
            className={`text-6xl ${isIdleEmoji(playerUser) && 'rotate-90'} ${isPlaying && 'animate-throwing'}`}
          >
            {playerUser}
          </span>
        </p>
        {/*USER PLAYER*/}
        <div className="flex flex-col gap-6">
          <h2 className="flex flex-col">
            <span>{TEXT.userPlayer}</span>
            <span className="text-4xl">{score.user}</span>
          </h2>
          <p className="flex justify-center gap-2">
            {options.map((opt) => (
              <button
                onClick={handleOnOptionClick}
                className="text-6xl disabled:opacity-20"
                key={opt}
                name={opt}
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
