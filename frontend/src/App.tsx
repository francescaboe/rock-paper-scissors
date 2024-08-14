import React from 'react';
import AppRoutes from 'routes/AppRoutes';
function App() {
  return (
    <>
      <React.Suspense fallback="loading">
        <AppRoutes />
      </React.Suspense>
    </>
  );
}

export default App;
