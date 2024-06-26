import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCompletedTodos } from '../../store/todoSlice';
import { RootState, AppDispatch } from '../../../store';
import styles from './CompletedTodoList.module.css';

const CompletedTodoList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { completedTodos, loading, error } = useSelector((state: RootState) => state.todos);

  useEffect(() => {
    dispatch(fetchCompletedTodos());
  }, [dispatch]);

  return (
    <div className={styles.completedTodoList}>
      <h3>List of completed Todos</h3>
      {loading && <p>Loading...</p>}
      {error && <p className={styles.error}>{error}</p>}
      {completedTodos.map((todo) => (
        <div key={todo.id} className={styles.completedTodoItem}>
          <span>{todo.text}</span>
        </div>
      ))}
    </div>
  );
};

export default CompletedTodoList;