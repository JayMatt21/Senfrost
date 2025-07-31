import React, { useState, useEffect } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const { isAdmin, login } = useAdminAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    checkStoredAuth();
    if (isAdmin) {
      navigate('/admin');
    }
  }, [isAdmin, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    const success = login(username, password);
    if (success) {
      navigate('/admin');
    } else {
      alert('Invalid credentials.');
    }
  };

  return (
    <div className="admin-login">
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        /><br/>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br/>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
