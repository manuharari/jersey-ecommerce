// frontend/src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ cartCount, user, logout }) => { // Receive user and logout from App.jsx
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-3xl font-bold text-white flex items-center">
          <i className="fas fa-futbol mr-3"></i>
          JERSEYS MUNDIAL
        </Link>
        
        <nav className="hidden md:flex space-x-8">
          <Link to="/" className="text-white hover:text-yellow-300 transition-colors font-medium">
            Home
          </Link>
          <Link to="/cart" className="text-white hover:text-yellow-300 transition-colors font-medium relative">
            Cart ({cartCount})
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          {/* Conditionally show Admin link if user is logged in (you might want stricter admin check) */}
          {user && (
            <Link to="/admin" className="text-white hover:text-yellow-300 transition-colors font-medium">
              Admin
            </Link>
          )}
        </nav>
        
        <div className="flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-white">Hi, {user.username}</span>
              <button 
                onClick={logout} // Use the logout function passed from App.jsx
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                Logout
              </button>
            </div>
          ) : (
            // Show Login link if no user is logged in
            <Link 
              to="/customer-login" // Link to the customer login page
              className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors font-medium"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;