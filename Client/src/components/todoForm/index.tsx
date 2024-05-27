import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo, fetchTodos } from '../../store/todoSlice';
import { AppDispatch } from '../../store/store';

const TodoForm: React.FC = () => {
  const [text, setText] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setText('');
    await dispatch(addTodo(text));
    await dispatch(fetchTodos());
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Todo</h3>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default TodoForm;