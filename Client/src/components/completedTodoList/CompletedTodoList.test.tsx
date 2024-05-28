// src/components/CompletedTodoList.test.tsx
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import todoReducer from '../../store/todoSlice';
import CompletedTodoList from '.';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);

const renderWithRedux = (component: React.ReactNode) => {
  const store = configureStore({
    reducer: { todos: todoReducer },
  });

  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  };
};

describe('CompletedTodoList Component', () => {
  afterEach(() => {
    mock.reset();
  });

  test('renders CompletedTodoList and fetches completed todos', async () => {
    mock.onGet('/api/todos/completed').reply(200, [{ id: 1, text: 'Completed Todo', completed: true }]);

    renderWithRedux(<CompletedTodoList />);

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

    await waitFor(() => expect(screen.getByText(/Completed Todo/i)).toBeInTheDocument());
  });

  test('handles error state', async () => {
    mock.onGet('/api/todos/completed').reply(500);

    renderWithRedux(<CompletedTodoList />);

    await waitFor(() => expect(screen.getByText(/Failed to fetch completed todos/i)).toBeInTheDocument());
  });
});
