import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';
import './AdminLayout.css';

const AdminLayout = () => {
  const { logout } = useAdminAuth();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={`admin-layout ${collapsed ? 'collapsed' : ''}`}>
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <h2>Admin</h2>
          <button className="collapse-btn" onClick={toggleSidebar}>☰</button>
        </div>
        <nav className="sidebar-nav">
          <Link to="/admin">
            🏠 <span className="label">Dashboard</span>
          </Link>
          <Link to="/admin/orders">
            📦 <span className="label">Manage Orders</span>
          </Link>
          <Link to="/admin/products">
            🛍️ <span className="label">Manage Products</span>
          </Link>
          <Link to="/admin/products/add">
            ➕ <span className="label">Add Product</span>
          </Link>
          <button onClick={handleLogout} className="logout-btn">
            🔒 <span className="label">Logout</span>
          </button>
        </nav>
      </aside>

      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
