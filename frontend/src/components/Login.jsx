// frontend/src/components/Login.jsx (Repurposed)
import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => { // Remove props as it's not a login form anymore
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md w-full">
        <i className="fas fa-futbol text-6xl text-blue-600 mb-6"></i>
        <h1 className="text-3xl font-bold mb-6">Welcome to JERSEYS MUNDIAL</h1>
        <p className="text-gray-600 mb-8">Please select how you would like to log in.</p>
        
        <div className="space-y-4">
          <Link
            to="/customer-login"
            className="block w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Customer Login
          </Link>
          
          <Link
            to="http://localhost:8000/admin/" // Direct link to Django Admin
            className="block w-full bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 transition-colors font-semibold"
          >
            Administrator Login (Django Admin)
          </Link>
        </div>
        
        <div className="mt-8 text-sm text-gray-500">
          <p>Don't have an account? <Link to="/customer-register" className="text-blue-500 hover:underline">Register here</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;