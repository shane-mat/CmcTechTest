import authReducer, { loginUser, registerUser } from './authSlice';
import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

describe('authSlice', () => {
  afterEach(() => {
    mock.reset();
  });

  test('should handle initial state', () => {
    expect(store.getState().auth).toEqual({
      user: null,
      loading: false,
      error: null,
    });
  });

  test('loginUser should login and update state', async () => {
    const user = { id: 1, username: 'testuser' };
    mock.onPost('/api/auth/login').reply(200, user);

    await store.dispatch(loginUser({ email: 'test@test.com', password: 'password' }));

    const state = store.getState().auth;
    expect(state.user).toEqual(user);
    expect(state.error).toBeNull();
  });

  test('registerUser should register and update state', async () => {
    const user = { id: 1, username: 'newuser' };
    mock.onPost('/api/auth/register').reply(200, user);

    await store.dispatch(registerUser({ email: 'new@test.com', password: 'password' }));

    const state = store.getState().auth;
    expect(state.user).toEqual(user);
    expect(state.error).toBeNull();
  });
});
