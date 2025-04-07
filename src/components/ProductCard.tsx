
import { Link } from 'react-router-dom';
import { Product } from '../data/products';
import { useCart } from '../context/CartContext';
import { Button } from './ui/button';
import { ShoppingCart, Flower } from 'lucide-react';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const [isHovering, setIsHovering] = useState(false);
  
  return (
    <div 
      className="group rounded-xl overflow-hidden border-2 border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 bg-white relative"
      onMouseEnter={() => setIsHovering(true)} 
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Fun corner decoration */}
      <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden">
        <div className="absolute transform rotate-45 bg-bloom-light-pink w-16 h-16 -top-8 -right-8"></div>
        <Flower className={`absolute top-2 right-2 w-4 h-4 text-bloom-pink transition-transform duration-500 ${isHovering ? 'rotate-180' : ''}`} />
      </div>
      
      <Link to={`/products/${product.id}`} className="block">
        <div className="aspect-square overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name} 
            className="object-cover w-full h-full  transition-transform duration-500"
          />
        </div>
      </Link>
      
      <div className="p-4">
        <Link to={`/products/${product.id}`} className="block">
          <h3 className="font-medium text-xl text-gray-800 hover:text-bloom-pink transition-colors font-amatic">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-sm text-gray-500 mt-1">
          {product.category}
        </p>
        
        <div className="flex items-center justify-between mt-3">
          <span className="font-semibold text-bloom-green">${product.price.toFixed(2)}</span>
          
          <Button 
            size="sm"
            onClick={() => addToCart(product)}
            className="bloom-button-secondary rounded-full"
          >
            <ShoppingCart className="h-4 w-4 mr-1" />
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
