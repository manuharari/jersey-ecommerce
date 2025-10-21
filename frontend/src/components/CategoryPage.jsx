// frontend/src/components/CategoryPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const CategoryPage = ({ addToCart }) => {
  const { categoryName } = useParams(); // Get category name from URL
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        setLoading(true);
        setError(null);
        // Make API call to fetch products by category
        // This assumes your backend has an endpoint like /api/products/?category=<categoryName>
        // Or a dedicated endpoint like /api/categories/<categoryName>/products/
        // For now, let's use a filter query parameter
        const response = await axios.get(`/products/?category=${categoryName}`);
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching products by category:', err);
        setError(`Failed to load ${categoryName} jerseys: ${err.response?.data?.detail || err.message}`);
        setLoading(false);
      }
    };

    if (categoryName) {
      fetchProductsByCategory();
    }
  }, [categoryName]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl">Loading {categoryName} jerseys...</div>
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
      <div className="mb-8">
        <Link 
          to="/"
          className="text-blue-600 hover:underline flex items-center mb-4"
        >
          <i className="fas fa-arrow-left mr-2"></i> Back to Home
        </Link>
        <h1 className="text-3xl font-bold">{categoryName} Jerseys</h1>
      </div>
      
      {products.length === 0 ? (
        <div className="text-center py-16">
          <i className="fas fa-futbol text-6xl text-gray-400 mb-4"></i>
          <h2 className="text-2xl font-bold mb-4">No {categoryName} Jerseys Available</h2>
          <p className="text-gray-600 mb-8">Check back soon for new arrivals!</p>
          <Link 
            to="/"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Browse All Jerseys
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map(product => (
            <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden relative hover:shadow-xl transition-shadow">
              <div className="flag-badge" style={{position: 'absolute', top: '10px', right: '10px', background: 'white', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.2)'}}>
                <span className="text-xs font-bold">{product.category === 'Home' ? 'H' : product.category === 'Away' ? 'A' : 'T'}</span>
              </div>
              <img 
                src={product.image_url} 
                alt={product.name}
                className="w-full h-64 object-cover cursor-pointer"
                onMouseEnter={(e) => e.target.src = product.image_url.replace('Home', 'Back').replace('Away', 'Back')}
                onMouseLeave={(e) => e.target.src = product.image_url}
              />
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 
                    className="text-lg font-semibold cursor-pointer hover:text-blue-600 transition-colors"
                    onClick={() => window.location.href = `/product/${product.id}`}
                  >
                    <Link to={`/product/${product.id}`}>{product.name}</Link>
                  </h3>
                  <span className="text-lg font-bold text-blue-600">${product.price}</span>
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{product.team}</span>
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
    </div>
  );
};

export default CategoryPage;
