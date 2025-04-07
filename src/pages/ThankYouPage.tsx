
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const ThankYouPage = () => {
  const navigate = useNavigate();
  const orderNumber = Math.floor(10000 + Math.random() * 90000);

  // Redirect to home if accessed directly without checkout
  useEffect(() => {
    const hasOrderConfirmation = sessionStorage.getItem('orderConfirmation');
    
    if (!hasOrderConfirmation) {
      sessionStorage.setItem('orderConfirmation', 'true');
    }
    
    return () => {
      sessionStorage.removeItem('orderConfirmation');
    };
  }, []);
  
  return (
    <div className="py-12">
      <div className="bloom-container max-w-3xl mx-auto text-center">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8">
          <div className="flex justify-center mb-6">
            <div className="bg-green-100 rounded-full p-3">
              <CheckCircle className="h-16 w-16 text-green-600" />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Thank You for Your Order!</h1>
          
          <p className="text-lg text-gray-600 mb-6">
            Your order #{orderNumber} has been successfully placed.
          </p>
          
          <div className="bg-bloom-beige rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">What Happens Next?</h2>
            <div className="space-y-3 text-left">
              <div className="flex items-start">
                <div className="bg-bloom-pink rounded-full w-6 h-6 flex items-center justify-center text-white font-medium shrink-0 mt-0.5">1</div>
                <div className="ml-3">
                  <p className="text-gray-700">We'll prepare your beautiful flowers with care</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-bloom-pink rounded-full w-6 h-6 flex items-center justify-center text-white font-medium shrink-0 mt-0.5">2</div>
                <div className="ml-3">
                  <p className="text-gray-700">You'll receive a confirmation email with order details</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-bloom-pink rounded-full w-6 h-6 flex items-center justify-center text-white font-medium shrink-0 mt-0.5">3</div>
                <div className="ml-3">
                  <p className="text-gray-700">Your flowers will be delivered at the specified time and location</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/" className="bloom-button">
              Return to Home
            </Link>
            <Link to="/products" className="bloom-button-outline">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;
