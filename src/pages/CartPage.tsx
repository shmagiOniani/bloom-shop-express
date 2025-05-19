
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Button } from '../components/ui/button';
import { Trash2, ShoppingBag, Plus, Minus } from 'lucide-react';

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, subtotal } = useCart();
  
  if (cart.length === 0) {
    return (
      <div className="bloom-container py-16 text-center">
        <div className="max-w-md mx-auto">
          <div className="flex justify-center mb-6">
            <ShoppingBag className="h-16 w-16 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added any flowers to your cart yet.
          </p>
          <Link to="/products" className="bloom-button inline-flex">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="py-8">
      <div className="bloom-container">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="p-6">
                <div className="flow-root">
                  <ul className="-my-6 divide-y divide-gray-200">
                    {cart.map((item) => (
                      <li key={item._id} className="py-6 flex">
                        <div className="flex-shrink-0 w-24 h-24 overflow-hidden rounded-md border border-gray-200">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="ml-4 flex-1 flex flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>
                                <Link to={`/products/${item._id}`}>{item.name}</Link>
                              </h3>
                              <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">{item.category}</p>
                          </div>
                          
                          <div className="flex-1 flex items-end justify-between text-sm">
                            <div className="flex items-center border rounded">
                              <button
                                onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                className="p-2 hover:bg-gray-100 transition-colors"
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <span className="px-4 py-2">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                className="p-2 hover:bg-gray-100 transition-colors"
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>
                            
                            <button
                              type="button"
                              className="font-medium text-red-600 hover:text-red-500"
                              onClick={() => removeFromCart(item._id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="border-t border-gray-200 px-6 py-4 flex justify-between">
                <button
                  type="button"
                  className="text-sm text-red-600 hover:text-red-500"
                  onClick={clearCart}
                >
                  Clear Cart
                </button>
                <Link to="/products" className="text-sm text-bloom-green hover:text-bloom-pink">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 sticky top-24">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
              
              <div className="flow-root">
                <div className="border-t border-b py-4">
                  <div className="flex justify-between text-base">
                    <p>Subtotal</p>
                    <p>${subtotal.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between text-base mt-2">
                    <p>Shipping</p>
                    <p>Calculated at checkout</p>
                  </div>
                </div>
                
                <div className="flex justify-between text-lg font-medium my-4">
                  <p>Total</p>
                  <p>${subtotal.toFixed(2)}</p>
                </div>
                
                <div className="mt-6">
                  <Link to="/checkout" className="bloom-button w-full text-center">
                    Proceed to Checkout
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
