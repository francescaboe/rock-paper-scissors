import React from 'react';
import { render, screen, fireEvent, userEvent } from 'test-utils';

import Lobby from '../Lobby';

describe('Lobby', () => {
  test('renders lobby title', () => {
    render(<Lobby />);
    const headingElement = screen.getByText('Rock paper scissors Lobby');
    expect(headingElement).toBeInTheDocument();
  });

  test('renders input field for username', () => {
    render(<Lobby />);
    expect(screen.getByLabelText("What's your name?")).toBeInTheDocument();
  });

  test('renders play options', () => {
    render(<Lobby />);
    expect(screen.getByRole('link', { name: 'Play Server' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Start new game' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Join game' })).toBeInTheDocument();
  });

  test('displays error when trying to navigate with empty username', () => {
    render(<Lobby />);
    const playServerLink = screen.getByRole('link', { name: 'Play Server' });
    fireEvent.click(playServerLink);
    expect(screen.getByRole('alert', { name: 'Why so private?' })).toBeInTheDocument();
  });

  test('allows navigation when username is provided', () => {
    render(<Lobby />);
    const usernameInput = screen.getByLabelText("What's your name?");
    fireEvent.change(usernameInput, { target: { value: 'TestUser' } });
    const playServerLink = screen.getByRole('link', { name: 'Play Server' });
    fireEvent.click(playServerLink);
    expect(screen.queryByRole('alert', { name: 'Why so private?' })).not.toBeInTheDocument();
  });

  test('clears error message when user starts typing', () => {
    render(<Lobby />);
    const playServerLink = screen.getByRole('link', { name: 'Play Server' });
    fireEvent.click(playServerLink);
    expect(screen.getByRole('alert', { name: 'Why so private?' })).toBeInTheDocument();

    const usernameInput = screen.getByLabelText("What's your name?");
    fireEvent.change(usernameInput, { target: { value: 'T' } });
    expect(screen.queryByRole('alert', { name: 'Why so private?' })).not.toBeInTheDocument();
  });
});
