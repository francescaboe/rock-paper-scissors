import React from 'react';
import {
  IDLE_PLAYERS,
  TEXT,
  options,
  RoPaScAction,
  RoPaScActionTypes,
  RoPaScState,
  outcomes,
} from './types';

// Reducer
const initialState = {
  playerUser: IDLE_PLAYERS.playerUser,
  playerServer: IDLE_PLAYERS.playerServer,
  isPlaying: false,
  score: {
    user: 0,
    server: 0,
  },
};

function reducer(state: RoPaScState, action: RoPaScAction) {
  switch (action.type) {
    case RoPaScActionTypes.START_GAME:
      return { ...state, isPlaying: true };
    case RoPaScActionTypes.END_GAME:
      return {
        ...state,
        playerUser: IDLE_PLAYERS.playerUser,
        playerServer: IDLE_PLAYERS.playerServer,
        isPlaying: false,
      };
    case RoPaScActionTypes.UPDATE_PLAYER_USER:
      return { ...state, playerUser: action.payload };
    case RoPaScActionTypes.UPDATE_PLAYER_SERVER:
      return { ...state, playerServer: action.payload };
    case RoPaScActionTypes.UPDATE_SCORE:
      return {
        ...state,
        score: {
          ...state.score,
          server: state.score.server + action.payload.server,
          user: state.score.user + action.payload.user,
        },
      };
    case RoPaScActionTypes.RESET_GAME:
      return initialState;
    default:
      return state;
  }
}

function RockPaperScissors() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const { playerUser, playerServer, isPlaying, score } = state;

  const isIdleEmoji = (player) => player === '🤜' || player === '🤛';
  const isIdle =
    playerServer === initialState.playerServer && playerUser === initialState.playerUser;
  const handleOnOptionClick = (e) => {
    // persist result
    const pl = e.currentTarget.name;
    dispatch({ type: RoPaScActionTypes.END_GAME });
    dispatch({ type: RoPaScActionTypes.START_GAME });

    setTimeout(() => {
      dispatch({ type: RoPaScActionTypes.UPDATE_PLAYER_USER, payload: pl });
      // VS COMPUTER
      // Get the random option using the random index
      const randomIndex = Math.floor(Math.random() * options.length);
      const randomOption = options[randomIndex];
      dispatch({ type: RoPaScActionTypes.UPDATE_PLAYER_SERVER, payload: randomOption });
      // VS SERVER PLAYER
      // TODO
    }, 1800);

    setTimeout(() => {
      dispatch({ type: RoPaScActionTypes.END_GAME });
    }, 3000);
  };

  React.useEffect(() => {
    if (isIdle) {
      // update score
      return;
    }
    if (playerServer === playerUser) {
      //setWinner(TEXT.draw);
      return;
    }
    if (playerServer === outcomes[playerUser]) {
      dispatch({ type: RoPaScActionTypes.UPDATE_SCORE, payload: { server: 0, user: 1 } });
    } else {
      dispatch({ type: RoPaScActionTypes.UPDATE_SCORE, payload: { server: 1, user: 0 } });
    }
  }, [playerServer, playerUser, outcomes]);

  return (
    <main className="p-2 h-lvh bg-amber-50 flex flex-col">
      <h1 className="text-center">Play Rock Paper Scissors</h1>
      <section className="text-center w-full h-full flex flex-col justify-around items-center md:inline-flex md:flex-row-reverse">
        {/*SERVER PLAYER*/}
        <div className="flex flex-col gap-6">
          <h2 className="flex flex-col">
            <span>{TEXT.serverPlayer}</span>
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
            className={`text-6xl ${isIdleEmoji(playerServer) && 'rotate-90 md:-rotate-90'} ${isPlaying && 'animate-throwing'}`}
          >
            {playerServer}
          </span>
          <span>{`server: ${score['server']} - ${score['user']} :user`}</span>
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
      <button className="absolute bottom-1 left-2 border-2 p-2" disabled>
        Chat
      </button>
    </main>
  );
}

export default RockPaperScissors;
