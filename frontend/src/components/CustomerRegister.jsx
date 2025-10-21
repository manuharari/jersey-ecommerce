// frontend/src/components/CustomerRegister.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CustomerRegister = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    
    if (formData.password.length < 8) {
        setError("Password must be at least 8 characters long.");
        return;
    }
    
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      // In a real app, you would have a dedicated registration endpoint
      // For Django's built-in User model, you'd typically use Django REST Auth or create a custom endpoint
      // For now, let's simulate a successful registration that requires admin approval or email confirmation
      // and then redirects to login.
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000)); 
      
      // Simulate successful registration
      setSuccess(true);
      setError('');
      
      // Redirect to login after a short delay or on user action
      // setTimeout(() => navigate('/customer-login'), 2000); 
      
    } catch (err) {
      setError('Registration failed. Please try again.');
      console.error('Customer registration error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <i className="fas fa-check-circle text-6xl text-green-500 mb-4"></i>
          <h2 className="text-2xl font-bold mb-4">Registration Successful!</h2>
          <p className="text-gray-600 mb-6">Please check your email to verify your account.</p>
          <button
            onClick={() => navigate('/customer-login')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div
        className="w-full max-w-md rounded-2xl shadow-xl overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1E40AF, #3B82F6)' }}
      >
        <div className="p-8">
          <div className="text-center mb-8">
            <i className="fas fa-user-plus text-6xl text-white mb-4"></i>
            <h1 className="text-3xl font-bold text-white">JERSEYS MUNDIAL</h1>
            <p className="text-blue-200 mt-2">Create Your Account</p> {/* Clarified title */}
          </div>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-white text-sm font-medium mb-2">Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-blue-800 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-white"
                  placeholder="Choose a username"
                  required
                />
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-blue-800 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-white"
                  placeholder="Your email address"
                  required
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-white text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-blue-800 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-white"
                placeholder="Create a password"
                required
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-white text-sm font-medium mb-2">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-blue-800 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-white"
                placeholder="Confirm your password"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-white text-blue-600 font-bold py-3 rounded-lg hover:bg-gray-100 transition-colors"
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Create Account'} {/* Clarified button text */}
            </button>
          </form>
          
          <div className="mt-6 text-center text-blue-200 text-sm">
            <p>Already have an account? <a href="/customer-login" className="text-white hover:underline">Log in here</a></p> {/* Link to login */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerRegister;
