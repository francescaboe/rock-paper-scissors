import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

function Lobby() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [userPlayerName, setUserPlayerName] = React.useState('');
  const [roomId, setRoomId] = React.useState('');
  const [error, setError] = React.useState('');

  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    setUserPlayerName(e.target.value);
  };

  // prevent going to play room if username empty
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!userPlayerName.trim()) {
      e.preventDefault();
      setError(t('username_empty'));
    } else {
      setError('');
    }
  };

  const handleOnCreateRoom = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // create room api
    // redirect to play room
    if (!userPlayerName.trim()) {
      e.preventDefault();
      setError(t('username_empty'));
    } else {
      // generate room id via api //.then(roomId => { setRoomId(roomId); }) then redirect;
      setRoomId('1234');
      e.preventDefault();
      // navigate to play room
      // navigate(`/room`, { state: { userPlayerName, roomId } })
    }
  };

  React.useEffect(() => {
    if (roomId) {
      navigate(`/room`, { state: { userPlayerName, roomId } });
    }
  }, [roomId]);

  return (
    <div className="h-lvh flex flex-col">
      <h1 className="text-center">{t('rock_paper_scissors_lobby')}</h1>
      <section className="w-full h-full flex flex-col gap-8 justify-center items-center">
        <div>
          <input
            className="text-center"
            type="text"
            placeholder={t('what_is_your_name')}
            aria-label={t('what_is_your_name')}
            value={userPlayerName}
            onChange={handleUserNameChange}
            id="username-input"
          />
          <div aria-live="polite" className="h-6">
            {error && (
              <p className="text-red-900 text-center text-sm" role="alert" aria-label={error}>
                {error}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-8 justify-center items-center md:inline-flex md:flex-row">
          <Link
            to="/play-server"
            state={{ userPlayerName }}
            onClick={handleLinkClick}
            aria-label={t('play_server')}
          >
            {t('play_server')}
          </Link>
          <Link
            to="/room"
            state={{ userPlayerName, roomId }}
            onClick={handleOnCreateRoom}
            aria-label={t('start_new_game')}
          >
            {t('start_new_game')}
          </Link>
          <Link
            to="/room"
            state={{ userPlayerName }}
            onClick={handleLinkClick}
            aria-label={t('join_game')}
          >
            {t('join_game')}
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Lobby;
