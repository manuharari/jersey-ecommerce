import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-800 to-blue-900 text-white py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <i className="fas fa-futbol mr-2"></i> JERSEYS MUNDIAL
            </h3>
            <p className="text-blue-200">Your official source for FIFA World Cup 2026 jerseys. Show your support for your favorite teams!</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-blue-200">
              <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Jerseys</a></li>
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">World Cup Info</h4>
            <ul className="space-y-2 text-blue-200">
              <li><a href="#" className="hover:text-white transition-colors">Teams</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Stadiums</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Schedule</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Tournament</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <ul className="space-y-2 text-blue-200">
              <li><i className="fab fa-facebook mr-2"></i> Facebook</li>
              <li><i className="fab fa-instagram mr-2"></i> Instagram</li>
              <li><i className="fab fa-twitter mr-2"></i> Twitter</li>
              <li><i className="fab fa-youtube mr-2"></i> YouTube</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-blue-700 mt-8 pt-8 text-center text-blue-300">
          <p>&copy; 2023 JERSEYS MUNDIAL. Officially licensed FIFA World Cup 2026 merchandise.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;