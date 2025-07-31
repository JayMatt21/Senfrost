import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AdminDashboard.css';
import { useAdminAuth } from '../../context/AdminAuthContext';

// Bootstrap & Recharts
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const AdminDashboard = () => {
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

  // ✅ Dummy data for demo
  const stats = [
    { title: 'Total Orders', value: 120 },
    { title: 'Pending Orders', value: 5 },
    { title: 'Completed Orders', value: 100 },
    { title: 'Revenue This Month', value: '₱50,000' },
  ];

  const trendData = [
    { month: 'Jan', orders: 20 },
    { month: 'Feb', orders: 35 },
    { month: 'Mar', orders: 50 },
    { month: 'Apr', orders: 45 },
    { month: 'May', orders: 60 },
  ];

  const pendingOrders = [
    { id: 1, customer: 'Juan Dela Cruz', service: 'Cleaning', date: '2025-07-31' },
    { id: 2, customer: 'Maria Clara', service: 'Repair', date: '2025-08-01' },
  ];

  return (
    <div className={`admin-layout ${collapsed ? 'collapsed' : ''}`}>
      <aside className="admin-sidebar">
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

      <main className="admin-content">
        <Container fluid>
          <h1>Admin Dashboard</h1>
          <p>Welcome! Here’s your dashboard content.</p>

          {/* ✅ Stats Cards */}
          <Row className="mb-4">
            {stats.map((stat, idx) => (
              <Col key={idx} md={3}>
                <Card className="mb-2 p-3 text-center shadow-sm">
                  <h5>{stat.title}</h5>
                  <h3>{stat.value}</h3>
                </Card>
              </Col>
            ))}
          </Row>

          {/* ✅ Trend Chart */}
          <div className="mt-4">
            <h4>Orders Trend</h4>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trendData}>
                <Line type="monotone" dataKey="orders" stroke="#5eaa7e" />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* ✅ Pending Orders Table */}
          <div className="mt-4">
            <h4>Pending Orders</h4>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Customer</th>
                  <th>Service</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {pendingOrders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.customer}</td>
                    <td>{order.service}</td>
                    <td>{order.date}</td>
                    <td>
                      <button className="btn btn-sm btn-success me-2">Approve</button>
                      <button className="btn btn-sm btn-danger">Cancel</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Container>
      </main>
    </div>
  );
};

export default AdminDashboard;
