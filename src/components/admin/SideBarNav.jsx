import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';
import './SidebarNav.css';

const SidebarNav = () => {
  const { logout } = useAdminAuth();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <aside className={`admin-sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <h2>Admin</h2>
        <button className="collapse-btn" onClick={toggleSidebar}>
          ☰
        </button>
      </div>
      <nav className="sidebar-nav">
        <Link to="/admin">🏠 Dashboard</Link>
        <Link to="/admin/orders">📦 Manage Orders</Link>
        <Link to="/admin/products">🛍️ Manage Products</Link>
        <Link to="/admin/products/add">➕ Add Product</Link>
        <button onClick={handleLogout} className="logout-btn">🔒 Logout</button>
      </nav>
    </aside>
  );
};

export default SidebarNav;
