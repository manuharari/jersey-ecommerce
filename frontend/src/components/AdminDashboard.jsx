// frontend/src/components/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  // State for different sections
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // State for adding/editing a product
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    image_url: '',
    category: 'Home'
  });
  const [editingProductId, setEditingProductId] = useState(null);

  // State for AI description generation
  const [aiInput, setAiInput] = useState({ name: '', category: '' });
  const [aiDescription, setAiDescription] = useState('');
  const [aiLoading, setAiLoading] = useState(false);

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError('');
        const [productsRes, ordersRes] = await Promise.all([
          axios.get('http://localhost:8000/api/products/'),
          // You might need to create an endpoint for orders if not already done
          // axios.get('http://localhost:8000/api/orders/')
        ]);
        setProducts(productsRes.data);
        // setOrders(ordersRes.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching admin data:', err);
        setError('Failed to load dashboard data.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle AI input changes
  const handleAiInputChange = (e) => {
    setAiInput({
      ...aiInput,
      [e.target.name]: e.target.value
    });
  };

  // Handle adding a new product
  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock, 10)
      };

      const response = await axios.post('http://localhost:8000/api/products/create/', productData);
      setProducts([...products, response.data]);
      setFormData({
        name: '',
        description: '',
        price: '',
        stock: '',
        image_url: '',
        category: 'Home'
      });
      alert('Product added successfully!');
    } catch (err) {
      console.error('Error adding product:', err);
      alert('Error adding product. Please try again.');
    }
  };

  // Handle deleting a product
  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      await axios.delete(`http://localhost:8000/api/products/${id}/`);
      setProducts(products.filter(product => product.id !== id));
      alert('Product deleted successfully!');
    } catch (err) {
      console.error('Error deleting product:', err);
      alert('Error deleting product. Please try again.');
    }
  };

  // Handle editing a product (populate form)
  const handleEditProduct = (product) => {
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      image_url: product.image_url,
      category: product.category
    });
    setEditingProductId(product.id);
    // Scroll to the form
    document.getElementById('product-form').scrollIntoView({ behavior: 'smooth' });
  };

  // Handle updating a product
  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    if (!editingProductId) return;

    try {
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock, 10)
      };

      const response = await axios.put(`http://localhost:8000/api/products/${editingProductId}/`, productData);
      setProducts(products.map(p => p.id === editingProductId ? response.data : p));
      setFormData({
        name: '',
        description: '',
        price: '',
        stock: '',
        image_url: '',
        category: 'Home'
      });
      setEditingProductId(null);
      alert('Product updated successfully!');
    } catch (err) {
      console.error('Error updating product:', err);
      alert('Error updating product. Please try again.');
    }
  };

  // Handle generating AI description
  const handleGenerateAiDescription = async () => {
    if (!aiInput.name.trim()) {
      alert('Please enter a product name for AI description.');
      return;
    }

    setAiLoading(true);
    setAiDescription('');
    try {
      const response = await axios.post('http://localhost:8000/api/ai/describe/', aiInput);
      setAiDescription(response.data.description || 'No description generated.');
    } catch (err) {
      console.error('Error generating AI description:', err);
      setAiDescription('Failed to generate description. Please try again.');
    } finally {
      setAiLoading(false);
    }
  };

  // Handle copying AI description to form
  const handleUseAiDescription = () => {
    if (aiDescription) {
      setFormData({ ...formData, description: aiDescription });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl">Loading dashboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-red-500 p-4 bg-red-100 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Header/Navigation */}
      <div className="flex h-screen">
        {/* Sidebar */}
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
        
        {/* Main Content Area */}
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
            {/* Products Tab */}
            {activeTab === 'products' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Manage Jerseys</h2>
                
                {/* Product Grid */}
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
                          <div className="flex space-x-2">
                            <button 
                              className="text-blue-500 hover:text-blue-700"
                              onClick={() => handleEditProduct(product)}
                            >
                              <i className="fas fa-edit"></i>
                            </button>
                            <button 
                              className="text-red-500 hover:text-red-700"
                              onClick={() => handleDeleteProduct(product.id)}
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Add/Edit Product Form */}
                <div id="product-form" className="bg-white rounded-xl shadow-lg p-6">
                  <h2 className="text-xl font-bold mb-4">
                    {editingProductId ? 'Edit Jersey' : 'Add New Jersey'}
                  </h2>
                  <form onSubmit={editingProductId ? handleUpdateProduct : handleAddProduct}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">Jersey Name</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
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
                          onChange={handleInputChange}
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
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Category</label>
                        <select
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
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
                          onChange={handleInputChange}
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
                        onChange={handleInputChange}
                        rows="4"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      ></textarea>
                    </div>
                    
                    <div className="flex justify-between">
                      <button 
                        type="button"
                        className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                        onClick={() => {
                          setFormData({
                            name: '',
                            description: '',
                            price: '',
                            stock: '',
                            image_url: '',
                            category: 'Home'
                          });
                          setEditingProductId(null);
                        }}
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit"
                        className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        {editingProductId ? 'Update Jersey' : 'Add Jersey'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
            
            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div>
                <h1 className="text-2xl font-bold mb-6">Manage Orders</h1>
                
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                  {/* Sample Order Data - Replace with real data fetching */}
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
                      {/* Example Order Row */}
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap"># 1001</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="font-medium">John Doe</div>
                            <div className="text-sm text-gray-500">john@example.com</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          2023-10-27
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap font-medium">$159.98</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                            Completed
                          </span>
                        </td>
                      </tr>
                      {/* Add more order rows here */}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            
            {/* AI Tools Tab */}
            {activeTab === 'ai' && (
              <div>
                <h1 className="text-2xl font-bold mb-6">AI Product Description Generator</h1>
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <p className="mb-6">Generate compelling product descriptions using AI. Requires Ollama API running at `http://localhost:11434`.</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* AI Input Section */}
                    <div>
                      <h2 className="text-xl font-semibold mb-4">Generate Description</h2>
                      <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Product Name</label>
                        <input
                          type="text"
                          name="name"
                          value={aiInput.name}
                          onChange={handleAiInputChange}
                          placeholder="e.g., Mexico Home Jersey 2026"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div className="mb-6">
                        <label className="block text-sm font-medium mb-2">Category</label>
                        <input
                          type="text"
                          name="category"
                          value={aiInput.category}
                          onChange={handleAiInputChange}
                          placeholder="e.g., Home"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <button 
                        className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                        onClick={handleGenerateAiDescription}
                        disabled={aiLoading}
                      >
                        {aiLoading ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Generating...
                          </>
                        ) : (
                          <>
                            <i className="fas fa-robot mr-2"></i> Generate Description
                          </>
                        )}
                      </button>
                    </div>
                    
                    {/* AI Output Section */}
                    <div>
                      <h2 className="text-xl font-semibold mb-4">Generated Description</h2>
                      {aiDescription ? (
                        <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
                          <p className="text-gray-700 whitespace-pre-wrap">{aiDescription}</p>
                          <button 
                            className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
                            onClick={handleUseAiDescription}
                          >
                            Use This Description
                          </button>
                        </div>
                      ) : (
                        <div className="border border-gray-300 rounded-lg p-4 text-center text-gray-500">
                          {aiLoading ? 'Generating...' : 'AI-generated description will appear here.'}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Ollama Status Check (Optional) */}
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-medium mb-4">Ollama Connection</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Make sure Ollama is running on your machine. You can download it from <a href="https://ollama.ai/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">ollama.ai</a>.
                    </p>
                    <button 
                      className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm"
                      // onClick={checkOllamaStatus} // Implement this function if needed
                    >
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
