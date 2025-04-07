import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProductById } from '../data/products';
import { useCart } from '../context/CartContext';
import { toast } from '../components/ui/use-toast';
import { Button } from '../components/ui/button';
import { Heart, ShoppingCart, ChevronLeft, Store } from 'lucide-react';

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const productId = parseInt(id || '0');
  const product = getProductById(productId);
  const navigate = useNavigate();
  
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  
  if (!product) {
    return (
      <div className="bloom-container py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <p className="mb-6">Sorry, we couldn't find the product you're looking for.</p>
        <Link to="/products" className="bloom-button">
          Continue Shopping
        </Link>
      </div>
    );
  }
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
  };
  
  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuantity(parseInt(e.target.value));
  };
  
  const handleWishlist = () => {
    toast({
      title: "Added to Wishlist",
      description: `${product.name} has been saved to your wishlist.`,
    });
  };

  const handleVisitStore = () => {
    navigate(`/stores/${product.storeId || 'main'}`);
  };

  return (
    <div className="py-8">
      <div className="bloom-container">
        {/* Back button */}
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center text-gray-600 mb-6 hover:text-bloom-pink transition-colors"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Products
        </button>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div>
            <div className="bg-white rounded-lg overflow-hidden border border-gray-100">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-auto object-cover aspect-square"
              />
            </div>
          </div>
          
          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-bloom-green text-xl font-semibold mb-4">${product.price.toFixed(2)}</p>
            
            <div className="mb-6">
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>
            
            <div className="mb-6">
              <p className="text-sm text-gray-500 mb-1">Category: {product.category}</p>
              
              {product.colors && (
                <div className="flex items-center gap-1 mb-1">
                  <span className="text-sm text-gray-500">Colors:</span>
                  {product.colors.map(color => (
                    <span key={color} className="text-sm text-gray-700">{color}</span>
                  ))}
                </div>
              )}
              
              {product.occasion && (
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="text-sm text-gray-500">Perfect for:</span>
                  {product.occasion.map(occ => (
                    <span 
                      key={occ} 
                      className="text-xs bg-bloom-light-pink text-white px-2 py-1 rounded-full"
                    >
                      {occ}
                    </span>
                  ))}
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-4 mb-6">
              <div>
                <label htmlFor="quantity" className="block text-sm text-gray-500 mb-1">Quantity</label>
                <select 
                  id="quantity" 
                  className="border-gray-200 rounded-md w-20"
                  value={quantity}
                  onChange={handleQuantityChange}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="flex gap-4">
              <Button 
                onClick={handleAddToCart} 
                className="bloom-button flex-1"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
              
              <Button 
                onClick={handleVisitStore} 
                variant="outline"
                className="bloom-button-outline"
              >
                <Store className="h-5 w-5 mr-2" />
                Visit Store
              </Button>
              
              {/* <Button 
                onClick={handleWishlist} 
                variant="outline"
                className="bloom-button-outline"
              >
                <Heart className="h-5 w-5" />
              </Button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
