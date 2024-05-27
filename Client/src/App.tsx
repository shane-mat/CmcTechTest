import React from 'react';
import { Provider} from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import store from './store/store';
import TodoList from './components/todoList';
import CompletedTodoList from './components/completedTodoList';
import LoginForm from './components/loginForm';
import Logout from './components/logoutButton';
import RegisterForm from './components/registerForm';
import ProtectedRoute from './components/ProtectedRoute';
import './styles/App.css';

const App: React.FC = () => {

  return (
    <Provider store={store}>
      <Router>
        <div className="app">
          <h1 className="title">Todo App</h1>
          <Logout />
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/todos" element={<ProtectedRoute component={TodoList} />} />
            <Route path="/completed" element={<ProtectedRoute component={CompletedTodoList} />} />
            <Route path="/" element={<Navigate to="/todos" />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;