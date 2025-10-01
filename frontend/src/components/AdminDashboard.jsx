import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    image_url: '',
    category: 'Home'
  });

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      const [productsRes, ordersRes] = await Promise.all([
        axios.get('/products/'),
        axios.get('/orders/')
      ]);
      setProducts(productsRes.data);
      setOrders(ordersRes.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching ', error);
      setLoading(false);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/products/', formData);
      setProducts([...products, response.data]);
      setFormData({
        name: '',
        description: '',
        price: '',
        stock: '',
        image_url: '',
        category: 'Home'
      });
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`/products/${id}/`);
      setProducts(products.filter(product => product.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex h-screen">
        <div className="admin-sidebar w-64 text-white flex flex-col" style={{ background: 'linear-gradient(to bottom, #1E40AF, #1E3A8A)' }}>
          <div className="p-6">
            <h1 className="text-2xl font-bold flex items-center">
              <i className="fas fa-futbol mr-3"></i> JERSEYS MUNDIAL
            </h1>
            <p className="text-sm text-gray-300 mt-2">Admin Console</p>
          </div>
          
          <nav className="flex-1 mt-6">
            <ul>
              <li>
                <button
                  className={`w-full text-left px-6 py-3 sidebar-item flex items-center ${
                    activeTab === 'products' ? 'bg-white text-blue-600' : 'hover:bg-white hover:text-blue-600'
                  }`}
                  onClick={() => setActiveTab('products')}
                >
                  <i className="fas fa-tshirt mr-3"></i>
                  Manage Jerseys
                </button>
              </li>
              <li>
                <button
                  className={`w-full text-left px-6 py-3 sidebar-item flex items-center ${
                    activeTab === 'orders' ? 'bg-white text-blue-600' : 'hover:bg-white hover:text-blue-600'
                  }`}
                  onClick={() => setActiveTab('orders')}
                >
                  <i className="fas fa-shopping-cart mr-3"></i>
                  Manage Orders
                </button>
              </li>
              <li>
                <button
                  className={`w-full text-left px-6 py-3 sidebar-item flex items-center ${
                    activeTab === 'ai' ? 'bg-white text-blue-600' : 'hover:bg-white hover:text-blue-600'
                  }`}
                  onClick={() => setActiveTab('ai')}
                >
                  <i className="fas fa-robot mr-3"></i>
                  AI Tools
                </button>
              </li>
            </ul>
          </nav>
        </div>
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-white shadow-sm">
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center">
                <h1 className="text-xl font-semibold text-gray-800">
                  {activeTab === 'products' ? 'Manage Jerseys' : 
                   activeTab === 'orders' ? 'Manage Orders' : 
                   'AI Tools'}
                </h1>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                  <i className="fas fa-user"></i>
                </div>
              </div>
            </div>
          </header>
          
          <main className="flex-1 overflow-y-auto p-6 bg-gray-100">
            {activeTab === 'products' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-2xl font-bold">Manage Jerseys</h1>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                  {products.map(product => (
                    <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                      <div className="flag-badge" style={{position: 'absolute', top: '10px', right: '10px', background: 'white', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.2)'}}>
                        <span className="text-xs font-bold">{product.category === 'Home' ? 'H' : 'A'}</span>
                      </div>
                      <img 
                        src={product.image_url} 
                        alt={product.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="font-semibold">{product.name}</h3>
                        <p className="text-gray-600 text-sm mb-2">${product.price}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500">Stock: {product.stock}</span>
                          <button 
                            className="text-red-500 hover:text-red-700"
                            onClick={() => handleDeleteProduct(product.id)}
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h2 className="text-xl font-bold mb-4">Add New Jersey</h2>
                  <form onSubmit={handleAddProduct}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">Jersey Name</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Price ($)</label>
                        <input
                          type="number"
                          name="price"
                          value={formData.price}
                          onChange={(e) => setFormData({...formData, price: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                          step="0.01"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Stock Quantity</label>
                        <input
                          type="number"
                          name="stock"
                          value={formData.stock}
                          onChange={(e) => setFormData({...formData, stock: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Category</label>
                        <select
                          name="category"
                          value={formData.category}
                          onChange={(e) => setFormData({...formData, category: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="Home">Home</option>
                          <option value="Away">Away</option>
                          <option value="Third">Third</option>
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-2">Image URL</label>
                        <input
                          type="text"
                          name="image_url"
                          value={formData.image_url}
                          onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <label className="block text-sm font-medium mb-2">Description</label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        rows="4"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      ></textarea>
                    </div>
                    
                    <button 
                      type="submit"
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Add Jersey
                    </button>
                  </form>
                </div>
              </div>
            )}
            
            {activeTab === 'orders' && (
              <div>
                <h1 className="text-2xl font-bold mb-6">Manage Orders</h1>
                
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {orders.map(order => (
                        <tr key={order.id}>
                          <td className="px-6 py-4 whitespace-nowrap"># {order.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="font-medium">{order.user}</div>
                              <div className="text-sm text-gray-500">user@example.com</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {new Date(order.created_at).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap font-medium">${order.total_price}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-3 py-1 rounded-full text-sm ${
                              order.status === 'completed' 
                                ? 'bg-green-100 text-green-800' 
                                : order.status === 'pending'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            
            {activeTab === 'ai' && (
              <div>
                <h1 className="text-2xl font-bold mb-6">AI Product Description Generator</h1>
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <p className="mb-6">Generate compelling product descriptions using AI. Requires Ollama API running at http://localhost:11434</p>
                  
                  <div className="flex space-x-4">
                    <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                      Generate Description
                    </button>
                    <button className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors">
                      Check Ollama Status
                    </button>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;