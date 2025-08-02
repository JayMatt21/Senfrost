import './App.css';

import Navigation from './components/Navigation/Navigation';
import Home from './components/Home/Home';
import Services from './components/Services/Services';
import Footer from './components/Footer/Footer';
import AboutUs from './components/AboutUs/AboutUs';
import Pricing from './components/Pricing/Pricing';

import Checkout from './pages/Checkout';
import OrderConfirmed from './pages/OrderConfirmed';
import OrderHistory from './pages/OrderHistory';

import AdminDashboard from './pages/admin/AdminDashboard';
import ManageOrders from './pages/admin/ManageOrders';
import ManageProducts from './pages/admin/ManageProducts';
import AddProduct from './pages/admin/AddProduct';
import AdminLogin from './pages/admin/AdminLogin';

import AdminLayout from './components/admin/AdminLayout';
import AdminRoute from './routes/AdminRoute';
import Auth from './pages/Auth';

import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

function ScrollToHash() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  return null;
}

function App() {
  const location = useLocation();

  const isAdminPath = location.pathname.startsWith('/admin');

  return (
    <>
      <ScrollToHash />

      {!isAdminPath && <Navigation />}

      <Routes>
        {/* ✅ Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-confirmed" element={<OrderConfirmed />} />
        <Route path="/orders" element={<OrderHistory />} />

        {/* ✅ Admin Routes (nested) */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="orders" element={<ManageOrders />} />
          <Route path="products" element={<ManageProducts />} />
          <Route path="products/add" element={<AddProduct />} />
        </Route>

        <Route path="/admin-login" element={<AdminLogin />} />
      </Routes>

      {!isAdminPath && <Footer />}
    </>
  );
}

export default App;
