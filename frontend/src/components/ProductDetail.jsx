// frontend/src/components/ProductDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProductDetail = ({ addToCart }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`/products/${id}/`);
        setProduct(response.data);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError(`Failed to load product: ${err.response?.data?.detail || err.message}`);
        // Optionally navigate back if product not found
        // if (err.response && err.response.status === 404) {
        //   navigate('/');
        // }
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl">Loading product...</div>
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

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl">Product not found</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <Link 
        to="/"
        className="mb-6 text-primary hover:underline flex items-center"
      >
        <i className="fas fa-arrow-left mr-2"></i> Back to Jerseys
      </Link>
      
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2 p-8 flex items-center justify-center">
            <img 
              src={product.image_url} 
              alt={product.name}
              className="w-full max-w-md h-96 object-contain"
              onMouseEnter={(e) => e.target.src = product.image_url.replace('Home', 'Back').replace('Away', 'Back')}
              onMouseLeave={(e) => e.target.src = product.image_url}
            />
          </div>
          <div className="md:w-1/2 p-8">
            <div className="flex items-center mb-2">
              <span className="text-2xl font-bold text-primary">${product.price}</span>
              <span className="ml-4 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                In Stock: {product.stock}
              </span>
            </div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-gray-600 mb-6">{product.description}</p>
            
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Category: {product.category}</h3>
            </div>
            
            <button 
              className="w-full bg-primary text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center"
              onClick={() => {
                addToCart(product);
                navigate('/cart');
              }}
            >
              <i className="fas fa-shopping-cart mr-2"></i> Add to Cart
            </button>
          </div>
        </div>
      </div>
      
      <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6">Product Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2">Material</h3>
            <p className="text-gray-600">100% Polyester with moisture-wicking technology</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Fit</h3>
            <p className="text-gray-600">Regular fit with stretch panels for comfort</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Care Instructions</h3>
            <p className="text-gray-600">Machine wash cold, do not bleach, tumble dry low</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Official License</h3>
            <p className="text-gray-600">Officially licensed FIFA World Cup 2026 merchandise</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
