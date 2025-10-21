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
        const response = await axios.get('/products/'); // Uses baseURL from App.jsx
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(`Failed to load products: ${err.response?.data?.detail || err.message}`);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // --- ROBUST GROUPING LOGIC ---
  // Group products by confederation for display
  const groupedProducts = {
    CONMEBOL: products.filter(p => p.confederation === 'CONMEBOL'),
    UEFA: products.filter(p => p.confederation === 'UEFA'),
    CONCACAF: products.filter(p => p.confederation === 'CONCACAF'),
    CAF: products.filter(p => p.confederation === 'CAF'),
    AFC: products.filter(p => p.confederation === 'AFC'),
    OFC: products.filter(p => p.confederation === 'OFC'),
    Accessory: products.filter(p => p.category === 'Accessory')
    // Note: 'Home', 'Away', 'Third' are sub-categories within confederations
  };

  // Filter for Men/Women/Kids jerseys (assuming you add a 'gender' field to Product model)
  // For now, let's assume all are unisex or use a placeholder filter
  const menProducts = products.filter(p => p.gender === 'men' || p.gender === 'unisex' || !p.gender); // Fallback to all if no gender field yet
  const womenProducts = products.filter(p => p.gender === 'women' || p.gender === 'unisex' || !p.gender);
  const kidsProducts = products.filter(p => p.gender === 'kids' || p.gender === 'unisex' || !p.gender);
  // --- ---

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
      
      {/* Men's Jerseys Section */}
      {menProducts.length > 0 && (
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Men's Jerseys</h2>
            <Link 
              to="/category/men" 
              className="text-blue-600 hover:text-blue-800 transition-colors font-medium"
            >
              View All Men's Jerseys
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {menProducts.slice(0, 4).map(product => (
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
      )}

      {/* Women's Jerseys Section */}
      {womenProducts.length > 0 && (
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Women's Jerseys</h2>
            <Link 
              to="/category/women" 
              className="text-blue-600 hover:text-blue-800 transition-colors font-medium"
            >
              View All Women's Jerseys
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {womenProducts.slice(0, 4).map(product => (
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
      )}

      {/* Kids' Jerseys Section */}
      {kidsProducts.length > 0 && (
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Kids' Jerseys</h2>
            <Link 
              to="/category/kids" 
              className="text-blue-600 hover:text-blue-800 transition-colors font-medium"
            >
              View All Kids' Jerseys
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {kidsProducts.slice(0, 4).map(product => (
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
      )}

      {/* Confederation Sections */}
      {Object.entries(groupedProducts).map(([confederation, confedProducts]) => (
        confedProducts.length > 0 && (
          <section key={confederation} className="mb-16">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">{confederation} Teams</h2>
              <Link 
                to={`/category/${confederation.toLowerCase()}`} 
                className="text-blue-600 hover:text-blue-800 transition-colors font-medium"
              >
                View All {confederation} Teams
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {confedProducts.slice(0, 4).map(product => (
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
                      <span className="text-sm text-gray-500">{product.team} ({product.confederation})</span>
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
        )
      ))}

      {/* Accessories Section */}
      {groupedProducts.Accessory.length > 0 && (
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Accessories</h2>
            <Link 
              to="/category/accessories" 
              className="text-blue-600 hover:text-blue-800 transition-colors font-medium"
            >
              View All Accessories
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {groupedProducts.Accessory.slice(0, 4).map(product => (
              <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden relative hover:shadow-xl transition-shadow">
                <div className="flag-badge" style={{position: 'absolute', top: '10px', right: '10px', background: 'white', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.2)'}}>
                  <span className="text-xs font-bold">A</span>
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
      )}

      {/* Promotional Banner */}
      <section className="mb-16 bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Free Shipping on Orders Over $100!</h2>
        <p className="text-xl mb-6">Show your support with pride and get rewarded with free delivery.</p>
        <Link 
          to="/"
          className="bg-white text-primary font-bold py-3 px-6 rounded-full hover:bg-gray-100 transition-colors"
        >
          Shop Now
        </Link>
      </section>
    </div>
  );
};

export default Home;
