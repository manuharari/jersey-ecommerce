// frontend/src/components/Checkout.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Checkout = ({ cart, cartTotal, customerUser }) => {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zipCode: '',
    // Note: Payment info like card number is usually handled by a payment processor (Stripe, PayPal)
    // and not collected directly like this in a real app.
    // cardNumber: '',
    // expiryDate: '',
    // cvv: ''
  });
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setOrderPlaced(false);
    setOrderId(null);

    try {
      // Prepare order data
      const orderData = {
        total_price: cartTotal,
        // items: cart.map(item => ({
        //   product_id: item.id,
        //   quantity: item.quantity,
        //   price: item.price
        // })) // Handled by backend based on user/cart session or passed explicitly
        // For simplicity, backend will calculate items from request context or cart ID if implemented
      };
      
      // Create order
      const response = await axios.post('/orders/', orderData);
      
      setOrderPlaced(true);
      setOrderId(response.data.id); // Assuming backend returns the created order ID
      
      // Clear cart after successful order (optional, depends on state management strategy)
      // This part requires passing a `clearCart` function from App.jsx if you want to clear it globally.
      // For now, we'll assume the cart is cleared on successful order creation or handled by the backend.
      
    } catch (err) {
      console.error('Error creating order:', err);
      setError(err.response?.data?.detail || err.message || 'Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (orderPlaced) {
    return (
      <div className="text-center py-16">
        <i className="fas fa-check-circle text-6xl text-green-500 mb-4"></i>
        <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
        <p className="text-gray-600 mb-2">Thank you for your purchase.</p>
        <p className="text-gray-600 mb-8">Your order ID is: <span className="font-bold">#{orderId}</span></p>
        <Link
          to="/"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      {/* --- Conditional Login Prompt --- */}
      {!customerUser && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6" role="alert">
          <p className="font-bold">Returning Customer?</p>
          <p>
            <Link to="/customer-login" className="font-semibold text-blue-600 hover:underline">Log in</Link> to your account for faster checkout and to access your order history.
          </p>
        </div>
      )}
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-6">Shipping Information</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-2">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-2">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">ZIP Code</label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
            
            {/* 
            Note: Real payment processing would happen here, likely via a payment gateway widget.
            Collecting card details directly like this is not recommended for production.
            */}
            <h3 className="text-lg font-semibold mb-4">Payment Information</h3>
            <p className="text-gray-600 mb-4">For demonstration purposes, payment processing is simulated. In a real application, you would integrate with a payment processor like Stripe or PayPal.</p>
            
            <button 
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center"
              disabled={loading || cart.length === 0}
            >
              {loading ? 'Processing...' : 'Place Order'}
            </button>
          </form>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
          
          <div className="space-y-4 mb-6">
            {cart.map(item => (
              <div key={item.id} className="flex justify-between items-center">
                <div className="flex items-center">
                  <img 
                    src={item.image_url} 
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded mr-4"
                  />
                  <div>
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                  </div>
                </div>
                <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
          
          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-2">
              <span>Subtotal</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span>Shipping</span>
              <span>$9.99</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span>Tax</span>
              <span>${(cartTotal * 0.08).toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-lg font-bold mt-4 pt-4 border-t">
              <span>Total</span>
              <span>${(cartTotal + 9.99 + (cartTotal * 0.08)).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;