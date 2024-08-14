import React from 'react';
import RockPaperScissors from 'components/RockPaperScissors';
import Lobby from 'components/Lobby';
function App() {
  return (
    <>
      <React.Suspense fallback="loading">
        <RockPaperScissors />
      </React.Suspense>
      <Lobby />
    </>
  );
}

export default App;
