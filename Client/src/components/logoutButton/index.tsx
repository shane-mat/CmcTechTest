import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/authSlice';
import { AppDispatch, RootState } from '../../../store';

const Logout: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div> {user ? <button onClick={handleLogout}>Logout</button> : <div></div>}
    </div>
  );
}

export default Logout;