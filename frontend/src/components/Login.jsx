import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ login }) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.post('/token/', credentials);
      login(response.data.access, { username: credentials.username });
      navigate('/admin');
    } catch (error) {
      setError('Invalid credentials. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div 
        className="w-full max-w-md rounded-2xl shadow-xl overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1E40AF, #3B82F6)' }}
      >
        <div className="p-8">
          <div className="text-center mb-8">
            <i className="fas fa-futbol text-6xl text-white mb-4"></i>
            <h1 className="text-3xl font-bold text-white">JERSEYS MUNDIAL</h1>
            <p className="text-blue-200 mt-2">Admin Console</p>
          </div>
          
          <form onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}
            
            <div className="mb-6">
              <label className="block text-white text-sm font-medium mb-2">Username</label>
              <input
                type="text"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-blue-800 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-white"
                placeholder="Enter admin username"
                required
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-white text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-blue-800 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-white"
                placeholder="Enter admin password"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-white text-blue-600 font-bold py-3 rounded-lg hover:bg-gray-100 transition-colors"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login to Admin Console'}
            </button>
          </form>
          
          <div className="mt-6 text-center text-blue-200 text-sm">
            <p>Default credentials:</p>
            <p>Username: admin</p>
            <p>Password: admin123</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;