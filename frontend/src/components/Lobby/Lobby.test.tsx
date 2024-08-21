import React from 'react';
import { render, screen, fireEvent } from 'test-utils';

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
    expect(screen.getByText('Play Server')).toBeInTheDocument();
    expect(screen.getByText('Start new game')).toBeInTheDocument();
    expect(screen.getByText('Join game')).toBeInTheDocument();
  });

  test('displays error when trying to navigate with empty username', () => {
    render(<Lobby />);
    const playServerLink = screen.getByText('Play Server');
    fireEvent.click(playServerLink);
    expect(screen.getByText('Why so private?')).toBeInTheDocument();
  });

  test('allows navigation when username is provided', () => {
    render(<Lobby />);
    const usernameInput = screen.getByLabelText("What's your name?");
    fireEvent.change(usernameInput, { target: { value: 'TestUser' } });
    const playServerLink = screen.getByText('Play Server');
    fireEvent.click(playServerLink);
    expect(screen.queryByText('Why so private?')).not.toBeInTheDocument();
  });

  test('clears error message when user starts typing', () => {
    render(<Lobby />);
    const playServerLink = screen.getByText('Play Server');
    fireEvent.click(playServerLink);
    expect(screen.getByText('Why so private?')).toBeInTheDocument();

    const usernameInput = screen.getByLabelText("What's your name?");
    fireEvent.change(usernameInput, { target: { value: 'T' } });
    expect(screen.queryByText('Why so private?')).not.toBeInTheDocument();
  });
});
