import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter as Router } from 'react-router-dom';
import authReducer from '../../store/authSlice';
import RegisterForm from '.';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);

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

describe('RegisterForm Component', () => {
  afterEach(() => {
    mock.reset();
  });

  test('renders RegisterForm and registers user', async () => {
    const user = { id: 1, username: 'newuser' };
    mock.onPost('/api/auth/register').reply(200, user);

    renderWithRedux(<RegisterForm />);

    fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'newuser' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'new@test.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password' } });
    fireEvent.click(screen.getByText(/Register/i));

    await waitFor(() => expect(screen.queryByText(/Register/i)).not.toBeInTheDocument());
  });

  test('handles registration error', async () => {
    mock.onPost('/api/auth/register').reply(500);

    renderWithRedux(<RegisterForm />);

    fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'newuser' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'new@test.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password' } });
    fireEvent.click(screen.getByText(/Register/i));

    await waitFor(() => expect(screen.getByText(/Failed to register/i)).toBeInTheDocument());
  });
});
