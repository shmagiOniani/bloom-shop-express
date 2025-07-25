
import { Link } from 'react-router-dom';
import { Product } from '../data/products';
import { useFavorite } from '../context/FavoriteContext';
import { Button } from './ui/button';
import { Heart, Flower } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { ImageCarousel } from './ui/image-carousel';
interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToFavorite } = useFavorite();
  const [isHovering, setIsHovering] = useState(false);
  const { t } = useLanguage();
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
      
      <div className="block">
      {/* <Link to={`/products/${product._id}`} className="block"> */}
        <div className="aspect-square overflow-hidden">
          {/* <img 
            src={product.image[0]} 
            alt={product.name} 
            className="object-cover w-full h-full  transition-transform duration-500"
          /> */}
             <ImageCarousel
                images={product.image}
                alt={product.name}
                className="w-full"
                showNums={false}
              />
        </div>
      </div>
      
      <div className="p-4">
        <Link to={`/products/${product._id}`} className="block">
          <h3 className="font-medium text-xl text-gray-800 hover:text-bloom-pink transition-colors font-amatic">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-sm text-gray-500 mt-1">
          {product.category.name}
        </p>
        
        <div className="flex items-center justify-between mt-3">
          <span className="font-semibold text-bloom-green">${product.price.toFixed(2)}</span>
          
          <Button 
            size="sm"
            onClick={() => addToFavorite(product)}
            className="bloom-button-secondary rounded-full"
          >
            <Heart className="h-4 w-4 " />
            {/* {t('product.addProduct')} */}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
