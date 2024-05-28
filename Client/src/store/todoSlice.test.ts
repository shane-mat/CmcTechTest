import todoReducer, {
  fetchTodos,
  fetchCompletedTodos,
  addTodo,
  deleteTodo,
  markTodoCompleted,
} from './todoSlice';
import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);

const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
});

describe('todoSlice', () => {
  afterEach(() => {
    mock.reset();
  });

  test('should handle initial state', () => {
    expect(store.getState().todos).toEqual({
      todos: [],
      completedTodos: [],
      loading: false,
      error: null,
    });
  });

  test('fetchTodos should fetch todos and update state', async () => {
    mock.onGet('/api/todos').reply(200, [{ id: 1, text: 'Test Todo', completed: false }]);

    await store.dispatch(fetchTodos());

    const state = store.getState().todos;
    expect(state.todos).toHaveLength(1);
    expect(state.todos[0].text).toBe('Test Todo');
    expect(state.error).toBeNull();
  });

  test('fetchCompletedTodos should fetch completed todos and update state', async () => {
    mock.onGet('/api/todos/completed').reply(200, [{ id: 1, text: 'Completed Todo', completed: true }]);

    await store.dispatch(fetchCompletedTodos());

    const state = store.getState().todos;
    expect(state.completedTodos).toHaveLength(1);
    expect(state.completedTodos[0].text).toBe('Completed Todo');
    expect(state.error).toBeNull();
  });

  test('addTodo should add a new todo and update state', async () => {
    const newTodo = { id: 2, text: 'New Todo', completed: false };
    mock.onPost('/api/todos').reply(200, newTodo);

    await store.dispatch(addTodo('New Todo'));

    const state = store.getState().todos;
    expect(state.todos).toContainEqual(newTodo);
    expect(state.error).toBeNull();
  });

  test('deleteTodo should delete a todo and update state', async () => {
    mock.onDelete('/api/todos/1').reply(200);

    await store.dispatch(deleteTodo(1));

    const state = store.getState().todos;
    expect(state.todos).not.toContainEqual(expect.objectContaining({ id: 1 }));
    expect(state.error).toBeNull();
  });

  test('markTodoCompleted should mark a todo as completed and update state', async () => {
    const completedTodo = { id: 1, text: 'Test Todo', completed: true };
    mock.onPut('/api/todos/1/complete').reply(200, completedTodo);

    await store.dispatch(markTodoCompleted(1));

    const state = store.getState().todos;
    expect(state.todos).toContainEqual(completedTodo);
    expect(state.error).toBeNull();
  });
});