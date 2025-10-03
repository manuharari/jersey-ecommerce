// frontend/src/components/Home.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        // --- KEY CHANGE: Use the full backend API URL ---
        // Make sure this matches your Django backend's address and endpoint
        const response = await axios.get('http://localhost:8000/api/products/');
        console.log('Fetched products successfully:', response.data); // Debug log
        setProducts(response.data);
      } catch (err) {
        console.error('Error fetching products:', err); // More detailed error log
        // Improved error message for the user
        setError(`Failed to load products: ${err.response?.data?.detail || err.message || 'Unknown error'}`);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array: run only once when component mounts

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl">Loading jerseys...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-red-500 p-4 bg-red-100 rounded-lg">
          <p className="mb-2 font-bold">Oops!</p>
          <p>{error}</p>
          <p className="mt-2 text-sm">Please check the browser console (F12) for more details.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Banner Section */}
      <section className="mb-16 rounded-2xl overflow-hidden">
        <div
          className="h-96 md:h-[500px] rounded-2xl flex items-center justify-center text-center text-white"
          style={{
            background: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(https://placehold.co/1200x600/1E40AF/FFFFFF?text=Estadio+Azteca) no-repeat center center',
            backgroundSize: 'cover'
          }}
        >
          <div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">FIFA WORLD CUP 2026</h1>
            <p className="text-xl mb-8">Official Jerseys for Mexico 2026</p>
            <Link
              to="/"
              className="bg-yellow-500 text-blue-900 font-bold py-4 px-8 rounded-full hover:bg-yellow-400 transition-colors text-lg"
            >
              Shop Jerseys Now
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Featured Jerseys</h2>
        {products.length === 0 ? (
          <div className="text-center text-gray-500 py-10">
            <p>No jerseys available yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden relative hover:shadow-xl transition-shadow">
                {/* Category Badge */}
                <div className="flag-badge" style={{ position: 'absolute', top: '10px', right: '10px', background: 'white', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
                  <span className="text-xs font-bold">{product.category === 'Home' ? 'H' : product.category.charAt(0)}</span>
                </div>
                {/* Product Image */}
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-64 object-cover cursor-pointer"
                  // Optional: Add hover effect to show back image if you have one
                  // onMouseEnter={(e) => e.target.src = product.image_url.replace('Home', 'Back').replace('Away', 'Back')}
                  // onMouseLeave={(e) => e.target.src = product.image_url}
                />
                {/* Product Details */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold cursor-pointer hover:text-blue-600 transition-colors">
                      <Link to={`/product/${product.id}`}>{product.name}</Link>
                    </h3>
                    <span className="text-lg font-bold text-blue-600">${product.price}</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">{product.category}</span>
                    <button
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      onClick={() => addToCart(product)}
                    >
                      <i className="fas fa-plus mr-1"></i> Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;