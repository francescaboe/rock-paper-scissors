import React from 'react';

interface ErrorProps {
  message: string;
}

const Error: React.FC<ErrorProps> = ({ message = 'Generic error' }) => (
  <div
    role="alert"
    aria-live="assertive"
    className="text-red-500 text-center p-4 fixed bottom-4 left-0 right-0"
  >
    <p>{message}</p>
  </div>
);

export default Error;
