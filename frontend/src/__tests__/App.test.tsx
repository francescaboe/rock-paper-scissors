// src/App.test.tsx
import React from 'react';
import { render } from 'test-utils';
import '@testing-library/jest-dom';
import App from '../App';

test('renders welcome message', () => {
  render(<App />);
});
