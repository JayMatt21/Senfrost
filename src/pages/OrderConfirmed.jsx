import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useOrder } from '../context/OrderContext';
import './orderConfirmed.css'; // Optional: kung may custom style ka

const OrderConfirmed = () => {
  const { order } = useOrder();
  const navigate = useNavigate();

  useEffect(() => {
    if (!order) return;

    const timer = setTimeout(() => {
      navigate('/');
    }, 10000);

    return () => clearTimeout(timer);
  }, [order, navigate]);

  if (!order) {
    return <p>No order found.</p>;
  }

  return (
    <div className="order-confirmed-container">
      <h2>🎉 Order Confirmed!</h2>
      <p><strong>Order ID:</strong> {order.id}</p>
      <p><strong>Payment Method:</strong> {order.paymentMethod}</p>

      <ul>
        {order.items?.map((item) => (
          <li key={`${item.id}-${item.selectedCapacity}`}>
            {item.name} ({item.selectedCapacity}) - Qty: {item.quantity} - ₱{item.price.toLocaleString()}
          </li>
        ))}
      </ul>

      <h3>Total Paid: ₱{order.total?.toLocaleString()}</h3>

      <Link to="/" className="back-home-button">
        ⬅ Back to Home
      </Link>

      <p className="note">Redirecting in 10 seconds...</p>
    </div>
  );
};

export default OrderConfirmed;
