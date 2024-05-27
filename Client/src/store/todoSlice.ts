import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from '../utils/axiosConfig';
import { Todo } from '../types/Todo';

interface TodoState {
  todos: Todo[];
  completedTodos: Todo[];
  loading: boolean;
  error: string | null;
}

const initialState: TodoState = {
  todos: [],
  completedTodos: [],
  loading: false,
  error: null,
};

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get<Todo[]>('/todoitems');
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

export const fetchCompletedTodos = createAsyncThunk('todos/fetchCompletedTodos', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get<Todo[]>('/todoitems/completed');
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

export const addTodo = createAsyncThunk('todos/addTodo', async (text: string, { rejectWithValue }) => {
  try {
    const response = await axios.post<Todo>('/todoitems', { text, completed: false, completedDate: null });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id: number, { rejectWithValue }) => {
  try {
    await axios.delete(`/todoitems/${id}`);
    return id;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

export const markTodoCompleted = createAsyncThunk('todos/markTodoAsCompleted', async (id: number, { rejectWithValue }) => {
  try {
    await axios.put(`/todoitems/${id}/complete`);
    return id;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action: PayloadAction<Todo[]>) => {
        state.todos = action.payload;
        state.loading = false;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchCompletedTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCompletedTodos.fulfilled, (state, action: PayloadAction<Todo[]>) => {
        state.completedTodos = action.payload;
        state.loading = false;
      })
      .addCase(fetchCompletedTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
        state.todos.push(action.payload);
      })
      .addCase(deleteTodo.fulfilled, (state, action: PayloadAction<number>) => {
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      })
      .addCase(markTodoCompleted.fulfilled, (state, action: PayloadAction<number>) => {
        const index = state.todos.findIndex((todo) => todo.id === action.payload);
        if (index !== -1) {
          state.todos[index].completed = true;
          state.todos[index].completedDate = new Date().toISOString();
        }
      });
  },
});

export default todoSlice.reducer;