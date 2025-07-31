import { useCart } from '../context/CartContext';
import { useOrder } from '../context/OrderContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import './checkout.css';

const Checkout = () => {
  const { cart, updateItemQuantity, removeItem, clearCart } = useCart();
  const { saveOrder } = useOrder();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState('');
  const [qrImage, setQrImage] = useState(null);
  const [showCVV, setShowCVV] = useState(false);

  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const totalAmount = cart?.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  ) || 0;

  const totalItems = cart?.reduce(
    (sum, item) => sum + item.quantity,
    0
  ) || 0;

  const handlePayment = () => {
    if (!paymentMethod) {
      alert('Please select a payment method.');
      return;
    }

    if (paymentMethod === 'qr' && !qrImage) {
      alert('Please upload your payment QR screenshot.');
      return;
    }

    if (paymentMethod === 'card') {
      const { cardNumber, expiry, cvv } = cardDetails;

      if (!/^\d{13,19}$/.test(cardNumber)) {
        alert('Invalid card number. Please enter a valid number.');
        return;
      }

      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) {
        alert('Invalid expiry date. Use MM/YY format.');
        return;
      }

      if (!/^\d{3,4}$/.test(cvv)) {
        alert('Invalid CVV. Must be 3 or 4 digits.');
        return;
      }
    }

    // ✅ SAVE ORDER WITH ID AND TOTAL
    const orderDetails = {
      id: Date.now(), // simple unique ID
      items: cart,
      total: totalAmount,
      totalItems,
      paymentMethod,
      paidAt: new Date().toISOString(),
    };

    saveOrder(orderDetails);

    alert(`Payment successful using ${paymentMethod}!`);
    clearCart();
    navigate('/order-confirmed');
  };

  const handleQrUpload = (e) => {
    setQrImage(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>

      {cart?.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart-items">
            {cart.map((item) => (
              <li key={item.id} className="cart-item">
                <img
                  src={item.image}
                  alt={item.name}
                  className="cart-item-image"
                />
                <div className="cart-item-details">
                  <strong>{item.name}</strong>
                  <p>₱{item.price.toLocaleString()}</p>
                  <div className="quantity-controls">
                    <button
                      type="button"
                      onClick={() =>
                        updateItemQuantity(
                          item.id,
                          item.selectedCapacity,
                          item.quantity - 1
                        )
                      }
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      type="button"
                      onClick={() =>
                        updateItemQuantity(
                          item.id,
                          item.selectedCapacity,
                          item.quantity + 1
                        )
                      }
                    >
                      +
                    </button>

                    <button
                      type="button"
                      className="remove-item"
                      onClick={() =>
                        removeItem(item.id, item.selectedCapacity)
                      }
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <h3>Total Items: {totalItems}</h3>
          <h3>Total Amount: ₱{totalAmount.toLocaleString()}</h3>

          <div className="payment-options">
            <h4>Select Payment Method:</h4>
            <label>
              <input
                type="radio"
                name="payment"
                value="qr"
                checked={paymentMethod === 'qr'}
                onChange={() => setPaymentMethod('qr')}
              />
              Pay via GCash / Maya QR
            </label>
            <label>
              <input
                type="radio"
                name="payment"
                value="card"
                checked={paymentMethod === 'card'}
                onChange={() => setPaymentMethod('card')}
              />
              Pay via Credit / Debit Card
            </label>
          </div>

          {paymentMethod === 'qr' && (
            <div className="qr-upload">
              <label>Upload your GCash/Maya payment screenshot:</label>
              <input type="file" accept="image/*" onChange={handleQrUpload} />
              {qrImage && <img src={qrImage} alt="QR Payment" width="200" />}
            </div>
          )}

          {paymentMethod === 'card' && (
            <div className="card-details">
              <label>Card Number:</label>
              <input
                type="text"
                placeholder="Card Number"
                value={cardDetails.cardNumber}
                onChange={(e) =>
                  setCardDetails({ ...cardDetails, cardNumber: e.target.value })
                }
              />

              <label>Expiry Date (MM/YY):</label>
              <input
                type="text"
                placeholder="MM/YY"
                value={cardDetails.expiry}
                onChange={(e) =>
                  setCardDetails({ ...cardDetails, expiry: e.target.value })
                }
              />

              <label>CVV:</label>
              <div className="cvv-input-wrapper">
                <input
                  type={showCVV ? 'text' : 'password'}
                  placeholder="CVV"
                  value={cardDetails.cvv}
                  onChange={(e) =>
                    setCardDetails({ ...cardDetails, cvv: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="toggle-cvv"
                  onClick={() => setShowCVV(!showCVV)}
                >
                  {showCVV ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          )}

          <button className="pay-button" onClick={handlePayment}>
            Confirm Payment
          </button>

          <button
            className="back-button"
            onClick={() => navigate(-1)}
            style={{ marginTop: '1rem' }}
          >
            ⬅ Back
          </button>
        </>
      )}
    </div>
  );
};

export default Checkout;
