// frontend/src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import Home from './components/Home';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import AdminDashboard from './components/AdminDashboard';
import CustomerLogin from './components/CustomerLogin'; // Import Customer Login
import CustomerRegister from './components/CustomerRegister'; // Import Customer Register
import Login from './components/Login'; // Generic or Admin Login (decide its role)
import Header from './components/Header';
import Footer from './components/Footer';

// Set base URL for API requests
axios.defaults.baseURL = 'http://localhost:8000/api';

function App() {
  const [user, setUser] = useState(null); // This will represent the CUSTOMER user
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  // Check if customer is logged in on app load
  useEffect(() => {
    const token = localStorage.getItem('customerToken'); // Use a specific key for customer token
    if (token) {
      // Verify token and get user info (in a real app, make a request)
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // For now, just set a mock user based on token presence
      // A real app would decode the token or make a /me request
      try {
        // This is a simple check; a real implementation would validate the token server-side
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUser({ username: payload.username || 'customer' });
      } catch (e) {
        console.error("Failed to parse customer token:", e);
        // Optionally remove invalid token
        localStorage.removeItem('customerToken');
        delete axios.defaults.headers.common['Authorization'];
      }
    }
    setLoading(false);
  }, []);

  // Customer Login function
  const customerLogin = (token, userData) => {
    localStorage.setItem('customerToken', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setUser(userData);
  };

  // Logout function (logs out the customer)
  const logout = () => {
    localStorage.removeItem('customerToken');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
    setCart([]);
  };

  // Add to cart function
  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Remove from cart function
  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  // Update cart quantity
  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  // Calculate cart total
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <div className="min-h-screen bg-gray-50">
        <Header cartCount={cartCount} user={user} logout={logout} />
        
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home addToCart={addToCart} />} />
            <Route path="/product/:id" element={<ProductDetail addToCart={addToCart} />} />
            <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} updateCartQuantity={updateCartQuantity} cartTotal={cartTotal} />} />
            {/* --- KEY CHANGE: Allow access to Checkout regardless of login state --- */}
            <Route path="/checkout" element={<Checkout cart={cart} cartTotal={cartTotal} customerUser={user} />} />
            
            {/* --- Customer Authentication Routes --- */}
            <Route path="/customer-login" element={<CustomerLogin login={customerLogin} />} />
            <Route path="/customer-register" element={<CustomerRegister />} />
            
            {/* --- Admin Route (Protected by user role if needed) --- */}
            <Route path="/admin" element={user ? <AdminDashboard /> : <Navigate to="/customer-login" />} />
            
            {/* --- Generic Login Route (Decide its purpose) --- */}
            <Route path="/login" element={<Navigate to="/customer-login" />} /> {/* Example: Redirect to customer login */}
            
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;
