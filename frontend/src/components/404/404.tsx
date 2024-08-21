import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

function NotFound() {
  const { t } = useTranslation();
  return (
    <main className="h-lvh flex flex-col">
      <h1 className="text-center">{t('not_found')}</h1>
      <section className=" w-full h-full flex flex-col gap-8 justify-center items-center">
        <Link to="/">
          <button>{t('go_back')}</button>
        </Link>
      </section>
    </main>
  );
}

export default NotFound;
