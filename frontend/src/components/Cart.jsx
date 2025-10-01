import React from 'react';
import { Link } from 'react-router-dom';

const Cart = ({ cart, removeFromCart, updateCartQuantity, cartTotal }) => {
  if (cart.length === 0) {
    return (
      <div className="text-center py-16">
        <i className="fas fa-futbol text-6xl text-blue-600 mb-4"></i>
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <p className="text-gray-600 mb-8">Looks like you haven't added any jerseys to your cart yet</p>
        <Link 
          to="/"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Your Jersey Collection</h1>
      
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {cart.map(item => (
          <div key={item.id} className="border-b border-gray-200 last:border-b-0">
            <div className="p-6 flex items-center">
              <img 
                src={item.image_url} 
                alt={item.name}
                className="w-24 h-24 object-cover rounded-lg mr-6"
              />
              <div className="flex-1">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-blue-600 font-bold">${item.price}</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button 
                    className="px-3 py-2 hover:bg-gray-100"
                    onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                  >
                    <i className="fas fa-minus"></i>
                  </button>
                  <span className="px-4 py-2">{item.quantity}</span>
                  <button 
                    className="px-3 py-2 hover:bg-gray-100"
                    onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                  >
                    <i className="fas fa-plus"></i>
                  </button>
                </div>
                <button 
                  className="text-red-500 hover:text-red-700"
                  onClick={() => removeFromCart(item.id)}
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
        
        <div className="p-6 bg-gray-50">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xl font-bold">Total: ${cartTotal.toFixed(2)}</span>
          </div>
          <Link 
            to="/checkout"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;