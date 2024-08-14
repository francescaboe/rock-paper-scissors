import React from 'react';
import { useTranslation } from 'react-i18next';
function Lobby() {
  const { t } = useTranslation();
  return (
    <div className="h-lvh flex flex-col">
      <h1 className="text-center">{t('rock_paper_scissors_lobby')}</h1>
      <section className=" w-full h-full flex flex-col gap-8 justify-center items-center">
        <input
          className="text-center"
          type="text"
          placeholder={t('what_is_your_name')}
          aria-label={t('what_is_your_name')}
        />
        <div className="flex flex-col gap-8 justify-center items-center md:inline-flex md:flex-row">
          <button>{t('play_server')}</button>
          <button>{t('start_new_game')}</button>
          <button>{t('join_game')}</button>
        </div>
      </section>
    </div>
  );
}

export default Lobby;
