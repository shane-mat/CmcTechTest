import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCompletedTodos } from '../../store/todoSlice';
import { RootState, AppDispatch } from '../../store/store';
import styles from './CompletedTodoList.module.css';

const CompletedTodoList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const completedTodos = useSelector((state: RootState) => state.todos.completedTodos);

  useEffect(() => {
    dispatch(fetchCompletedTodos());
  }, [dispatch]);

  return (
    <div className={styles.completedTodoList}>
      <h3>List of completed Todos</h3>
        {completedTodos.map((todo) => (
          <div key={todo.id} className={styles.completedTodoItem}>
            <span>{todo.text}</span>
          </div>
        ))}
    </div>
  );
};

export default CompletedTodoList;