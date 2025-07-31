import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './orderHistory.css'; // optional

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem('orderHistory')) || [];
    setOrders(storedOrders);
  }, []);

  return (
    <div className="order-history-container">
      <h2>📜 Order History</h2>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul className="order-list">
          {orders.map((order) => (
            <li key={order.id} className="order-item">
              <h4>Order ID: {order.id}</h4>
              <p>Payment: {order.paymentMethod}</p>
              <p>Date: {new Date(order.paidAt).toLocaleString()}</p>
              <ul className="order-items">
                {order.items.map((item) => (
                  <li key={`${item.id}-${item.selectedCapacity}`}>
                    {item.name} ({item.selectedCapacity}) x {item.quantity}
                  </li>
                ))}
              </ul>
              <strong>Total Paid: ₱{order.total?.toLocaleString()}</strong>
            </li>
          ))}
        </ul>
      )}

      <Link to="/">⬅ Back to Home</Link>
    </div>
  );
};

export default OrderHistory;
