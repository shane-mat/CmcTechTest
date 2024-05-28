import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import todoReducer from '../../store/todoSlice';
import TodoList from '.';
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

describe('TodoList Component', () => {
  afterEach(() => {
    mock.reset();
  });

  test('renders TodoList and fetches todos', async () => {
    mock.onGet('/api/todos').reply(200, [{ id: 1, text: 'Test Todo', completed: false }]);

    renderWithRedux(<TodoList />);

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

    await waitFor(() => expect(screen.getByText(/Test Todo/i)).toBeInTheDocument());
  });

  test('handles error state', async () => {
    mock.onGet('/api/todos').reply(500);

    renderWithRedux(<TodoList />);

    await waitFor(() => expect(screen.getByText(/Failed to fetch todos/i)).toBeInTheDocument());
  });

  test('marks a todo as completed', async () => {
    mock.onGet('/api/todos').reply(200, [{ id: 1, text: 'Test Todo', completed: false }]);
    mock.onPut('/api/todos/1/complete').reply(200, { id: 1, text: 'Test Todo', completed: true });

    renderWithRedux(<TodoList />);

    await waitFor(() => expect(screen.getByText(/Test Todo/i)).toBeInTheDocument());

    fireEvent.click(screen.getByText(/Complete/i));

    await waitFor(() => expect(screen.getByText(/Test Todo/i)).toHaveClass('completed'));
  });

  test('deletes a todo', async () => {
    mock.onGet('/api/todos').reply(200, [{ id: 1, text: 'Test Todo', completed: false }]);
    mock.onDelete('/api/todos/1').reply(200);

    renderWithRedux(<TodoList />);

    await waitFor(() => expect(screen.getByText(/Test Todo/i)).toBeInTheDocument());

    fireEvent.click(screen.getByText(/Delete/i));

    await waitFor(() => expect(screen.queryByText(/Test Todo/i)).not.toBeInTheDocument());
  });
});
