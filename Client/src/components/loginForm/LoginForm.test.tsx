// src/components/LoginForm.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter as Router } from 'react-router-dom';
import authReducer from '../../store/authSlice';
import LoginForm from '.';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import '@testing-library/jest-dom';

const mock = new MockAdapter(axios);
jest.mock('../../styles/AuthForm.module.css', () => '');

const renderWithRedux = (component: React.ReactNode) => {
  const store = configureStore({
    reducer: { auth: authReducer },
  });

  return {
    ...render(
      <Provider store={store}>
        <Router>{component}</Router>
      </Provider>
    ),
    store,
  };
};

describe('LoginForm Component', () => {
  afterEach(() => {
    mock.reset();
  });

  test('renders LoginForm and logs in user', async () => {
    const user = { id: 1, username: 'testuser' };
    mock.onPost('auth/loginUser').reply(200, user);

    renderWithRedux(<LoginForm />);

    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@test.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password' } });
    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => expect(window.location.pathname).not.toContain('/login'));
  });

  test('handles login error', async () => {
    mock.onPost('auth/loginUser').reply(500);

    renderWithRedux(<LoginForm />);

    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@test.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password' } });
    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => expect(screen.getByText(/Failed to login/i)).toBeInTheDocument());
  });
});
