import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AdminDashboard.css';
import { useAdminAuth } from '../../context/AdminAuthContext';

const AdminDashboard = () => {
  const { logoutAdmin } = useAdminAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutAdmin();
    navigate('/admin/login');
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      <nav className="admin-nav">
        <Link to="/admin/orders">📦 Manage Orders</Link>
        <Link to="/admin/products">🛍️ Manage Products</Link>
      </nav>

      <p>Welcome, Admin! Select an option above to manage your store.</p>

      <button className="logout-btn" onClick={handleLogout}>
        🔒 Logout
      </button>
    </div>
  );
};

export default AdminDashboard;
