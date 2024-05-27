import axios from 'axios';
import { Dispatch } from 'redux';
import { TODOS_API_URL } from '../common/constants';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export const fetchTodos = () => async (dispatch: Dispatch) => {
  try {
    const response = await axios.get<Todo[]>(TODOS_API_URL);
    dispatch({ type: 'FETCH_TODOS_SUCCESS', payload: response.data });
  } catch (error: any) {
    dispatch({ type: 'FETCH_TODOS_FAILURE', payload: error.message });
  }
};

export const addTodo = (text: string) => async (dispatch: Dispatch) => {
  try {
    const response = await axios.post<Todo>(TODOS_API_URL, { text });
    dispatch({ type: 'ADD_TODO_SUCCESS', payload: response.data });
  } catch (error: any) {
    dispatch({ type: 'ADD_TODO_FAILURE', payload: error.message });
  }
};

export const deleteTodo = (id: number) => async (dispatch: Dispatch) => {
  try {
    await axios.delete(`${TODOS_API_URL}/${id}`);
    dispatch({ type: 'DELETE_TODO_SUCCESS', payload: id });
  } catch (error: any) {
    dispatch({ type: 'DELETE_TODO_FAILURE', payload: error.message });
  }
};

export const fetchCompletedTodos = () => async (dispatch: Dispatch) => {
  try {
    const response = await axios.get<Todo[]>(`${TODOS_API_URL}/completed`);
    dispatch({ type: 'FETCH_COMPLETED_TODOS_SUCCESS', payload: response.data });
  } catch (error: any) {
    dispatch({ type: 'FETCH_COMPLETED_TODOS_FAILURE', payload: error.message });
  }
};

export const completeTodo = (id: number) => async (dispatch: Dispatch) => {
  try {
    const response = await axios.put(`${TODOS_API_URL}/${id}/complete`);
    dispatch({ type: 'COMPLETE_TODO_SUCCESS', payload: response.data });
  } catch (error: any) {
    dispatch({ type: 'COMPLETE_TODO_FAILURE', payload: error.message });
  }
};