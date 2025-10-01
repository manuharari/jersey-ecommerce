import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/products/');
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl">Loading products...</div>
      </div>
    );
  }

  return (
    <div>
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
      
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Featured Jerseys</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.slice(0, 4).map(product => (
            <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden relative hover:shadow-xl transition-shadow">
              <div 
                className="absolute top-2 right-2 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow"
                style={{ zIndex: 10 }}
              >
                <span className="text-xs font-bold">{product.category === 'Home' ? 'H' : 'A'}</span>
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
      </section>
    </div>
  );
};

export default Home;