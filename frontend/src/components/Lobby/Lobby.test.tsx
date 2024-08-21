import React from 'react';
import { render, screen, fireEvent } from 'test-utils';

import Lobby from '../Lobby';

describe('Lobby', () => {
  test('renders lobby title', () => {
    render(<Lobby />);
    const headingElement = screen.getByText('rock_paper_scissors_lobby');
    expect(headingElement).toBeInTheDocument();
  });

  test('renders input field for username', () => {
    render(<Lobby />);
    expect(screen.getByLabelText('what_is_your_name')).toBeInTheDocument();
  });

  test('renders play options', () => {
    render(<Lobby />);
    expect(screen.getByText('play_server')).toBeInTheDocument();
    expect(screen.getByText('start_new_game')).toBeInTheDocument();
    expect(screen.getByText('join_game')).toBeInTheDocument();
  });

  test('displays error when trying to navigate with empty username', () => {
    render(<Lobby />);
    const playServerLink = screen.getByText('play_server');
    fireEvent.click(playServerLink);
    expect(screen.getByText('username_empty')).toBeInTheDocument();
  });

  test('allows navigation when username is provided', () => {
    render(<Lobby />);
    const usernameInput = screen.getByLabelText('what_is_your_name');
    fireEvent.change(usernameInput, { target: { value: 'TestUser' } });
    const playServerLink = screen.getByText('play_server');
    fireEvent.click(playServerLink);
    expect(screen.queryByText('username_empty')).not.toBeInTheDocument();
  });

  test('clears error message when user starts typing', () => {
    render(<Lobby />);
    const playServerLink = screen.getByText('play_server');
    fireEvent.click(playServerLink);
    expect(screen.getByText('username_empty')).toBeInTheDocument();

    const usernameInput = screen.getByLabelText('what_is_your_name');
    fireEvent.change(usernameInput, { target: { value: 'T' } });
    expect(screen.queryByText('username_empty')).not.toBeInTheDocument();
  });
});
