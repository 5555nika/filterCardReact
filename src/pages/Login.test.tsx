import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { Login } from './Login';
import { AuthContext } from '../context';

const mockSetIsAuth = vi.fn();

describe('Login Component', () => {
  beforeEach(() => {
    mockSetIsAuth.mockClear();
    localStorage.clear();
  });

  it('renders inputs and submit button', () => {
    render(
      <AuthContext.Provider value={{ isAuth: false, setIsAuth: mockSetIsAuth, isLoading: false }}>
        <Login />
      </AuthContext.Provider>
    );

    expect(screen.getByPlaceholderText('username...')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('password...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument();
  });

  it('shows validation errors when fields are empty', async () => {
    const user = userEvent.setup();
    render(
      <AuthContext.Provider value={{ isAuth: false, setIsAuth: mockSetIsAuth, isLoading: false }}>
        <Login />
      </AuthContext.Provider>
    );

    const button = screen.getByRole('button', { name: /log in/i });
    await user.click(button);

    expect(screen.getByText('Username is required')).toBeInTheDocument();
    expect(screen.getByText('Password is required')).toBeInTheDocument();
    expect(mockSetIsAuth).not.toHaveBeenCalled();
  });

  it('shows validation error when password is too short', async () => {
    const user = userEvent.setup();
    render(
      <AuthContext.Provider value={{ isAuth: false, setIsAuth: mockSetIsAuth, isLoading: false }}>
        <Login />
      </AuthContext.Provider>
    );

    const usernameInput = screen.getByPlaceholderText('username...');
    const passwordInput = screen.getByPlaceholderText('password...');
    const button = screen.getByRole('button', { name: /log in/i });

    await user.type(usernameInput, 'testuser');
    await user.type(passwordInput, '123');
    await user.click(button);

    expect(screen.queryByText('Username is required')).not.toBeInTheDocument();
    expect(screen.getByText('Password must be at least 6 characters')).toBeInTheDocument();
    expect(mockSetIsAuth).not.toHaveBeenCalled();
  });

  it('clears error messages when user starts typing', async () => {
    const user = userEvent.setup();
    render(
      <AuthContext.Provider value={{ isAuth: false, setIsAuth: mockSetIsAuth, isLoading: false }}>
        <Login />
      </AuthContext.Provider>
    );

    const usernameInput = screen.getByPlaceholderText('username...');
    const button = screen.getByRole('button', { name: /log in/i });

    await user.click(button);
    expect(screen.getByText('Username is required')).toBeInTheDocument();

    await user.type(usernameInput, 'a');
    expect(screen.queryByText('Username is required')).not.toBeInTheDocument();
  });

  it('submits form successfully with valid inputs', async () => {
    const user = userEvent.setup();
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});

    render(
      <AuthContext.Provider value={{ isAuth: false, setIsAuth: mockSetIsAuth, isLoading: false }}>
        <Login />
      </AuthContext.Provider>
    );

    const usernameInput = screen.getByPlaceholderText('username...');
    const passwordInput = screen.getByPlaceholderText('password...');
    const button = screen.getByRole('button', { name: /log in/i });

    await user.type(usernameInput, 'testuser');
    await user.type(passwordInput, '123456');
    await user.click(button);

    expect(localStorage.getItem('auth')).toBe('true');
    expect(mockSetIsAuth).toHaveBeenCalledWith(true);
    expect(alertMock).toHaveBeenCalledWith('Success');

    alertMock.mockRestore();
  });
});
