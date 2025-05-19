
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Button } from '../components/ui/button';
import { toast } from '../components/ui/use-toast';
import { Loader2 } from 'lucide-react';

const CheckoutPage = () => {
  const { cart, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    country: 'United States',
    cardName: '',
    cardNumber: '',
    expDate: '',
    cvv: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Redirect if cart is empty
  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const requiredFields = [
      'firstName', 'lastName', 'email', 'address', 
      'city', 'state',  'cardName', 
      'cardNumber', 'expDate', 'cvv'
    ];
    
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all required fields.',
        variant: 'destructive'
      });
      return;
    }
    
    // Process payment
    setIsProcessing(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Success!
      clearCart();
      navigate('/thank-you');
    } catch (error) {
      toast({
        title: 'Payment Failed',
        description: 'There was an issue processing your payment. Please try again.',
        variant: 'destructive'
      });
      setIsProcessing(false);
    }
  };
  
  return (
    <div className="py-8">
      <div className="bloom-container">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit}>
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      className="w-full border-gray-300 rounded-md"
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      className="w-full border-gray-300 rounded-md"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full border-gray-300 rounded-md"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      className="w-full border-gray-300 rounded-md"
                      value={formData.address}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        className="w-full border-gray-300 rounded-md"
                        value={formData.city}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">State</label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        className="w-full border-gray-300 rounded-md"
                        value={formData.state}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                      <select
                        id="country"
                        name="country"
                        className="w-full border-gray-300 rounded-md"
                        value={formData.country}
                        onChange={handleChange}
                      >
                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">Name on Card</label>
                    <input
                      type="text"
                      id="cardName"
                      name="cardName"
                      className="w-full border-gray-300 rounded-md"
                      value={formData.cardName}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      className="w-full border-gray-300 rounded-md"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      placeholder="XXXX XXXX XXXX XXXX"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="expDate" className="block text-sm font-medium text-gray-700 mb-1">Expiration Date</label>
                      <input
                        type="text"
                        id="expDate"
                        name="expDate"
                        className="w-full border-gray-300 rounded-md"
                        value={formData.expDate}
                        onChange={handleChange}
                        placeholder="MM/YY"
                      />
                    </div>
                    <div>
                      <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                      <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        className="w-full border-gray-300 rounded-md"
                        value={formData.cvv}
                        onChange={handleChange}
                        placeholder="123"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <Button 
                  type="submit"
                  className="bloom-button w-full"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Processing...
                    </>
                  ) : (
                    'Complete Order'
                  )}
                </Button>
              </div>
            </form>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 sticky top-24">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
              
              <div className="flow-root">
                <ul className="-my-4 divide-y divide-gray-200">
                  {cart.map((item) => (
                    <li key={item._id} className="py-4 flex">
                      <div className="flex-shrink-0 w-16 h-16 overflow-hidden rounded-md border border-gray-200">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="flex justify-between">
                          <h3 className="text-sm font-medium">{item.name}</h3>
                          <p className="text-sm text-gray-500">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">Qty: {item.quantity}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                
                <div className="border-t border-b py-4 mt-4">
                  <div className="flex justify-between text-base">
                    <p>Subtotal</p>
                    <p>${subtotal.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between text-base mt-2">
                    <p>Shipping</p>
                    <p>$8.95</p>
                  </div>
                  <div className="flex justify-between text-base mt-2">
                    <p>Tax</p>
                    <p>${(subtotal * 0.08).toFixed(2)}</p>
                  </div>
                </div>
                
                <div className="flex justify-between text-lg font-medium my-4">
                  <p>Total</p>
                  <p>${(subtotal + 8.95 + subtotal * 0.08).toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
