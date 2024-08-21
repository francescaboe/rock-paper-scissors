import React from 'react';
import { render, screen } from 'test-utils';
import NotFound from './404';

describe('NotFound', () => {
  test('renders not found message', () => {
    render(<NotFound />);
    expect(screen.getByText('Error 404. Page not found.')).toBeInTheDocument();
  });

  test('renders go back button', () => {
    render(<NotFound />);
    expect(screen.getByRole('button', { name: 'Go back' })).toBeInTheDocument();
  });

  test('go back button links to home page', () => {
    render(<NotFound />);
    const backButton = screen.getByRole('button', { name: 'Go back' });
    expect(backButton.closest('a')).toHaveAttribute('href', '/');
  });

  test('renders with correct layout classes', () => {
    render(<NotFound />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveClass('text-center');
    expect(screen.getByRole('link')).toHaveAttribute('href', '/');
    expect(screen.getByRole('link').parentElement).toHaveClass(
      'w-full h-full flex flex-col gap-8 justify-center items-center',
    );
  });
});
