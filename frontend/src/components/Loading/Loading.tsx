import React from 'react';

const Loading: React.FC = () => (
  <div
    className="fixed inset-0 flex justify-center items-center z-50"
    role="status"
    aria-live="polite"
  >
    <div
      className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"
      aria-hidden="true"
    ></div>
    <span className="sr-only">Loading...</span>
  </div>
);

export default Loading;
