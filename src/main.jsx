import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext'; 
import { AdminAuthProvider } from './context/AdminAuthContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <AdminAuthProvider>
          <OrderProvider>
            <App />
          </OrderProvider>
        </AdminAuthProvider>
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);
