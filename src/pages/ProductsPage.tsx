
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [activeCategory, setActiveCategory] = useState<string | null>(categoryParam);
  const [activeSort, setActiveSort] = useState<string>('featured');
  
  useEffect(() => {
    let result = [...products];
    
    // Apply category filter
    if (activeCategory) {
      result = result.filter(product => product.category === activeCategory);
    }
    
    // Apply sorting
    switch (activeSort) {
      case 'price-low':
        result = result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result = result.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        result = result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'featured':
      default:
        result = result.sort((a, b) => (a.featured === b.featured ? 0 : a.featured ? -1 : 1));
        break;
    }
    
    setFilteredProducts(result);
  }, [activeCategory, activeSort]);
  
  // Update active category when URL param changes
  useEffect(() => {
    setActiveCategory(categoryParam);
  }, [categoryParam]);
  
  return (
    <div className="py-8">
      <div className="bloom-container">
        <h1 className="text-4xl font-bold mb-8 text-center">Shop Our Flowers</h1>
        
        {/* Filters and Sorting */}
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap gap-2">
            <button 
              className={`px-4 py-2 rounded-full text-sm ${!activeCategory ? 'bg-bloom-pink text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
              onClick={() => setActiveCategory(null)}
            >
              All
            </button>
            <button 
              className={`px-4 py-2 rounded-full text-sm ${activeCategory === 'bouquets' ? 'bg-bloom-pink text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
              onClick={() => setActiveCategory('bouquets')}
            >
              Bouquets
            </button>
            <button 
              className={`px-4 py-2 rounded-full text-sm ${activeCategory === 'singles' ? 'bg-bloom-pink text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
              onClick={() => setActiveCategory('singles')}
            >
              Single Stems
            </button>
            <button 
              className={`px-4 py-2 rounded-full text-sm ${activeCategory === 'arrangements' ? 'bg-bloom-pink text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
              onClick={() => setActiveCategory('arrangements')}
            >
              Arrangements
            </button>
          </div>
          
          <div className="flex items-center">
            <label htmlFor="sort" className="text-sm text-gray-600 mr-2">Sort by:</label>
            <select 
              id="sort" 
              className="border-gray-200 rounded-md text-sm"
              value={activeSort}
              onChange={(e) => setActiveSort(e.target.value)}
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name</option>
            </select>
          </div>
        </div>
        
        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="product-grid">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium">No products found</h3>
            <p className="text-gray-500 mt-2">Try changing your filters or check back later.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
