import React, { useState } from 'react';
import './AdminDashboard.css';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const AdminDashboard = () => {
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

  const [pendingOrders, setPendingOrders] = useState([
    { id: 1, customer: 'Juan Dela Cruz', service: 'Cleaning', date: '2025-07-31' },
    { id: 2, customer: 'Maria Clara', service: 'Repair', date: '2025-08-01' },
  ]);

  const handleApprove = (order) => {
    if (window.confirm(`Are you sure you want to approve Order #${order.id}?`)) {
      fetch('/api/admin/approve-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId: order.id }),
      })
        .then(res => res.json())
        .then(() => {
          alert(`✅ Order #${order.id} approved! Email/SMS sent to customer.`);
          setPendingOrders(prev => prev.filter(o => o.id !== order.id));
        })
        .catch(() => {
          alert('❌ Failed to approve order.');
        });
    }
  };

  const handleCancel = (order) => {
    if (window.confirm(`Are you sure you want to cancel Order #${order.id}?`)) {
      alert(`❌ Order #${order.id} cancelled.`);
      setPendingOrders(prev => prev.filter(o => o.id !== order.id));
    }
  };

  return (
    <Container fluid className="admin-dashboard">
      <h1>Senfrost Admin Dashboard</h1>

      {/* ✅ Stat Cards Pricing style */}
      <div className="stats-grid">
        {stats.map((stat, idx) => (
          <div className="stat-card pricing-style" key={idx}>
            <h5>{stat.title}</h5>
            <h2>{stat.value}</h2>
          </div>
        ))}
      </div>

      {/* ✅ Graph in Pricing-style card */}
      <div className="chart-card pricing-style">
        <h4>Orders Trend</h4>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={trendData}>
            <Line type="monotone" dataKey="orders" stroke="#800000" strokeWidth={3} />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* ✅ Pending Scheduled Services in Excel-like layout */}
        <div className="table-card pricing-style">
          <h4>Pending Scheduled Services</h4>
          <Table striped bordered hover responsive>
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
                    {/* Action buttons */}
                    <button
                      className="btn-approve"
                      onClick={() => {
                        if (window.confirm(`Approve Order #${order.id}?`)) {
                          alert(`✅ Order #${order.id} approved!`);
                        }
                      }}
                    >
                      Approve
                    </button>
                    <button
                      className="btn-cancel"
                      onClick={() => {
                        const reason = prompt('Enter reason for cancellation:');
                        if (reason) {
                          if (window.confirm(`Are you sure you want to cancel Order #${order.id}?`)) {
                            alert(`❌ Order #${order.id} cancelled.\nReason: ${reason}`);
                          }
                        } else {
                          alert('⚠️ Cancellation reason is required.');
                        }
                      }}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
    </Container>
  );
};

export default AdminDashboard;
