import React from 'react';
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

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  // 👉 Example static data — pwede palitan ng real data from Firestore, etc.
  const stats = [
    { title: 'Total Orders', value: 120 },
    { title: 'Pending Orders', value: 5 },
    { title: 'Completed Orders', value: 100 },
    { title: 'Revenue This Month', value: '₱50,000' },
  ];

  const pendingOrders = [
    { id: 1, customer: 'Juan Dela Cruz', service: 'Cleaning', date: '2025-07-31' },
    { id: 2, customer: 'Maria Clara', service: 'Repair', date: '2025-08-01' },
  ];

  const trendData = [
    { month: 'Jan', orders: 20 },
    { month: 'Feb', orders: 35 },
    { month: 'Mar', orders: 50 },
    { month: 'Apr', orders: 45 },
    { month: 'May', orders: 60 },
  ];

  return (
    <Container className="mt-4 admin-dashboard">
      <h1>Admin Dashboard</h1>

      <nav className="admin-nav mb-4">
        <Link to="/admin/orders">📦 Manage Orders</Link>
        <Link to="/admin/products">🛍️ Manage Products</Link>
      </nav>

      <p>Welcome, Admin! Select an option above to manage your store.</p>

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
            <Line type="monotone" dataKey="orders" stroke="#8884d8" />
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

      <button className="logout-btn mt-4" onClick={handleLogout}>
        🔒 Logout
      </button>
    </Container>
  );
};

export default AdminDashboard;
