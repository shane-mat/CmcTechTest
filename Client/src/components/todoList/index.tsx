import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos, deleteTodo, markTodoCompleted } from '../../store/todoSlice';
import { RootState, AppDispatch } from '../../store/store';
import TodoForm from '../todoForm';
import styles from './TodoList.module.css';
import { Todo } from '../../types/Todo';

const TodoList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { todos, loading, error } = useSelector((state: RootState) => state.todos);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <div className={styles.todoList}>
      <h3>List of Todos</h3>
      {loading && <p>Loading...</p>}
      {error && <p className={styles.error}>{error}</p>}
      <table>
        <tbody>
          {todos.map((todo: Todo) => (
            <tr key={todo.id} className={styles.todoItem}>
              <td><span className={todo.completed ? styles.completed : ''}>{todo.text}</span></td>
              <td><button onClick={() => dispatch(markTodoCompleted(todo.id))}>Complete</button></td>
              <td><button onClick={() => dispatch(deleteTodo(todo.id))}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <TodoForm />
    </div>
  );
};

export default TodoList;