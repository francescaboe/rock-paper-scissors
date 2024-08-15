import React from 'react';
import { optionLabels, options } from 'constants/game.constants';
import { useTranslation } from 'react-i18next';
import { RockPaperScissorsBoardProps } from 'types/game.types';

function RockPaperScissors({ mode, onUserChoice, state }: RockPaperScissorsBoardProps) {
  const { i18n } = useTranslation();
  const { playerUser, playerServer, isPlaying, result, score } = state;
  const isIdleEmoji = (player: string) => player === '🤜' || player === '🤛';

  return (
    <main className="p-2 h-lvh bg-amber-50 flex flex-col">
      <h1 className="text-center">{i18n.t('rock_paper_scissors', { mode })}</h1>
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
                onClick={onUserChoice}
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
    </main>
  );
}

export default RockPaperScissors;
