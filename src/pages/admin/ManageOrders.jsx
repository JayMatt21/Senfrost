
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ManageOrders.css';

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem('orderHistory')) || [];
    setOrders(storedOrders);
  }, []);

  return (
    <div className="manage-orders">
      <h1>Manage Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Payment Method</th>
              <th>Total Amount</th>
              <th>Date</th>
              <th>Items</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, idx) => (
              <tr key={idx}>
                <td>{order.id || idx + 1}</td>
                <td>{order.paymentMethod}</td>
                <td>₱{order.totalAmount?.toLocaleString()}</td>
                <td>{new Date(order.paidAt).toLocaleString()}</td>
                <td>
                  <ul>
                    {order.items.map((item) => (
                      <li key={item.id}>
                        {item.name} ({item.selectedCapacity}) x {item.quantity}
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Link to="/admin">⬅ Back to Dashboard</Link>
    </div>
  );
};

export default ManageOrders;
