import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import store from '../../store';
import TodoList from '.';

const todos = [
  { id: 1, text: 'Test todo 1', completed: false },
  { id: 2, text: 'Test todo 2', completed: true },
];

test('renders todos', async () => {
  render(
    <Provider store={store}>
      <TodoList todos={todos} onDelete={() => {}} onComplete={() => {}} />
    </Provider>
  );

  await waitFor(() => {
    const todoItems = screen.getAllByRole('listitem');
    expect(todoItems).toHaveLength(2);
  });
});