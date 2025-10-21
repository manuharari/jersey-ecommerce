// frontend/src/components/Header.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = ({ cartCount, user, logout }) => { // Receive user and logout from App.jsx
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for burger menu

  return (
    <header className="bg-gradient-to-r from-primary to-secondary shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-3xl font-bold text-white flex items-center">
            <i className="fas fa-futbol mr-3"></i>
            JERSEYS MUNDIAL
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-white hover:text-accent transition-colors font-medium">
              Home
            </Link>
            {/* --- MENUS WITH SUBMENUS --- */}
            {/* Men/Women/Kids Dropdown */}
            <div className="relative group">
              <button className="text-white hover:text-accent transition-colors font-medium flex items-center">
                Jerseys
                <i className="fas fa-chevron-down ml-1 text-xs"></i>
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <Link to="/category/men" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Men</Link>
                <Link to="/category/women" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Women</Link>
                <Link to="/category/kids" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Kids</Link>
              </div>
            </div>
            
            {/* Confederations Dropdown */}
            <div className="relative group">
              <button className="text-white hover:text-accent transition-colors font-medium flex items-center">
                Confederations
                <i className="fas fa-chevron-down ml-1 text-xs"></i>
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <Link to="/category/conmebol" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">CONMEBOL</Link>
                <Link to="/category/uefa" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">UEFA</Link>
                <Link to="/category/concacaf" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">CONCACAF</Link>
                <Link to="/category/caf" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">CAF</Link>
                <Link to="/category/afc" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">AFC</Link>
                <Link to="/category/ofc" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">OFC</Link>
              </div>
            </div>
            
            {/* Accessories Link */}
            <Link to="/category/accessories" className="text-white hover:text-accent transition-colors font-medium">
              Accessories
            </Link>
            {/* --- --- */}
            
            <Link to="/cart" className="text-white hover:text-accent transition-colors font-medium relative">
              Cart ({cartCount})
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            {/* Conditionally show Admin link if user is logged in (you might want stricter admin check) */}
            {user && (
              <Link to="/admin" className="text-white hover:text-accent transition-colors font-medium">
                Admin
              </Link>
            )}
          </nav>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="hidden md:flex items-center space-x-4">
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
                className="hidden md:block bg-white text-primary px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors font-medium"
              >
                Login
              </Link>
            )}
            
            {/* Mobile Menu Button (Burger Icon) */}
            <button 
              className="md:hidden text-white focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation (Burger Menu) */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4">
            <ul className="space-y-4">
              <li>
                <Link 
                  to="/" 
                  className="block text-white hover:text-yellow-300 transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)} // Close menu on link click
                >
                  Home
                </Link>
              </li>
              {/* --- MOBILE MENUS WITH SUBMENUS --- */}
              {/* Men/Women/Kids Accordion (Mobile) */}
              <li>
                <button
                  className="w-full text-left text-white hover:text-yellow-300 transition-colors font-medium flex justify-between items-center"
                  onClick={() => {
                    const genderMenu = document.getElementById('mobile-gender-menu');
                    if (genderMenu) {
                      genderMenu.classList.toggle('hidden');
                    }
                  }}
                >
                  Jerseys
                  <i className="fas fa-chevron-down text-xs"></i>
                </button>
                <ul id="mobile-gender-menu" className="hidden mt-2 pl-4 space-y-2">
                  <li><Link to="/category/men" className="block text-blue-200 hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>Men</Link></li>
                  <li><Link to="/category/women" className="block text-blue-200 hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>Women</Link></li>
                  <li><Link to="/category/kids" className="block text-blue-200 hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>Kids</Link></li>
                </ul>
              </li>
              
              {/* Confederations Accordion (Mobile) */}
              <li>
                <button
                  className="w-full text-left text-white hover:text-yellow-300 transition-colors font-medium flex justify-between items-center"
                  onClick={() => {
                    const confedMenu = document.getElementById('mobile-confed-menu');
                    if (confedMenu) {
                      confedMenu.classList.toggle('hidden');
                    }
                  }}
                >
                  Confederations
                  <i className="fas fa-chevron-down text-xs"></i>
                </button>
                <ul id="mobile-confed-menu" className="hidden mt-2 pl-4 space-y-2">
                  <li><Link to="/category/conmebol" className="block text-blue-200 hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>CONMEBOL</Link></li>
                  <li><Link to="/category/uefa" className="block text-blue-200 hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>UEFA</Link></li>
                  <li><Link to="/category/concacaf" className="block text-blue-200 hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>CONCACAF</Link></li>
                  <li><Link to="/category/caf" className="block text-blue-200 hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>CAF</Link></li>
                  <li><Link to="/category/afc" className="block text-blue-200 hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>AFC</Link></li>
                  <li><Link to="/category/ofc" className="block text-blue-200 hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>OFC</Link></li>
                </ul>
              </li>
              
              {/* Accessories Link (Mobile) */}
              <li>
                <Link 
                  to="/category/accessories" 
                  className="block text-white hover:text-yellow-300 transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)} // Close menu on link click
                >
                  Accessories
                </Link>
              </li>
              {/* --- --- */}
              
              <li>
                <Link 
                  to="/cart" 
                  className="block text-white hover:text-yellow-300 transition-colors font-medium relative"
                  onClick={() => setIsMenuOpen(false)} // Close menu on link click
                >
                  Cart ({cartCount})
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </li>
              {/* Conditionally show Admin link if user is logged in */}
              {user && (
                <li>
                  <Link 
                    to="/admin" 
                    className="block text-white hover:text-yellow-300 transition-colors font-medium"
                    onClick={() => setIsMenuOpen(false)} // Close menu on link click
                  >
                    Admin
                  </Link>
                </li>
              )}
              {/* Mobile Login/Logout */}
              {user ? (
                <li>
                  <button 
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false); // Close menu on logout
                    }}
                    className="w-full text-left text-white hover:text-red-300 transition-colors font-medium"
                  >
                    Logout
                  </button>
                </li>
              ) : (
                <li>
                  <Link 
                    to="/customer-login"
                    className="block text-white hover:text-yellow-300 transition-colors font-medium"
                    onClick={() => setIsMenuOpen(false)} // Close menu on link click
                  >
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
