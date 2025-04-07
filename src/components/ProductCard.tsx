
import { Link } from 'react-router-dom';
import { Product } from '../data/products';
import { useCart } from '../context/CartContext';
import { Button } from './ui/button';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  
  return (
    <div className="group rounded-lg overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow bg-white">
      <Link to={`/products/${product.id}`} className="block">
        <div className="aspect-square overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name} 
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>
      
      <div className="p-4">
        <Link to={`/products/${product.id}`} className="block">
          <h3 className="font-medium text-lg text-gray-800 hover:text-bloom-pink transition-colors">
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
            className="bloom-button-secondary"
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
