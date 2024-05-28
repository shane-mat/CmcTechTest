import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import axios from 'axios';
import store from '../../../store';
import TodoForm from '.';
import '@testing-library/jest-dom';

jest.mock('axios');

test('calls addTodo API when form is submitted', async () => {
  render(
    <Provider store={store}>
      <TodoForm />
    </Provider>
  );

  const inputElement = screen.getByPlaceholderText('Add new todo...');
  const submitButton = screen.getByText('Add');

  fireEvent.change(inputElement, { target: { value: 'Test todo' } });
  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith('/todoitems', { text: 'Test todo' });
  });
});