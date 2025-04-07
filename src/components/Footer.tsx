
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-bloom-beige py-8">
      <div className="bloom-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold text-lg text-bloom-green mb-4">Bloom Express</h3>
            <p className="text-gray-600">
              Delivering fresh blooms daily for all your special moments.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg text-bloom-green mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="text-gray-600 hover:text-bloom-pink">
                  All Flowers
                </Link>
              </li>
              <li>
                <Link to="/products?category=bouquets" className="text-gray-600 hover:text-bloom-pink">
                  Bouquets
                </Link>
              </li>
              <li>
                <Link to="/products?category=singles" className="text-gray-600 hover:text-bloom-pink">
                  Single Stems
                </Link>
              </li>
              <li>
                <Link to="/products?category=arrangements" className="text-gray-600 hover:text-bloom-pink">
                  Arrangements
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg text-bloom-green mb-4">Help</h3>
            <p className="text-gray-600 mb-2">
              Need assistance with your order?
            </p>
            <p className="text-gray-600">
              Email: support@bloomexpress.com
            </p>
            <p className="text-gray-600">
              Phone: (555) 123-4567
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t border-gray-200 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Bloom Express. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
