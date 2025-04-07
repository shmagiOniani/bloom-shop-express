
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import { Input } from '@/components/ui/input';
import { Flower, Search } from 'lucide-react';
import { 
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { useNavigate } from 'react-router-dom';

const ProductsPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [activeCategory, setActiveCategory] = useState<string | null>(categoryParam);
  const [activeSort, setActiveSort] = useState<string>('featured');
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);
  
  // Handle keyboard shortcut for search
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);
  
  useEffect(() => {
    let result = [...products];
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
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
  }, [activeCategory, activeSort, searchTerm]);
  
  // Update active category when URL param changes
  useEffect(() => {
    setActiveCategory(categoryParam);
  }, [categoryParam]);
  
  return (
    <div className="py-8">
      <div className="bloom-container">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-bloom-green mb-3 relative inline-block">
            Shop Our <span className="text-bloom-pink">Flowers</span>
            <div className="absolute w-full h-2 bg-bloom-light-pink -bottom-1 left-0 rounded-full transform -rotate-1"></div>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-4">
            Brighten someone's day with our beautiful blooms!
          </p>
        </div>
        
        {/* Quick Search */}
        <div className="max-w-xl mx-auto mb-8">
          <div className="relative">
            <Input 
              type="text"
              placeholder="Search for flowers, bouquets, arrangements..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 py-6 rounded-full border-bloom-pink border-2 focus:border-bloom-green shadow-sm"
            />
            <Flower className="absolute left-3 top-1/2 transform -translate-y-1/2 text-bloom-pink h-5 w-5" />
            <button 
              onClick={() => setOpen(true)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-bloom-pink transition-colors bg-white/80 rounded-full p-1"
            >
              <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                <span className="text-xs">⌘</span>K
              </kbd>
            </button>
          </div>
        </div>
        
        {/* Command Dialog for quick search */}
        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput placeholder="Search for products..." />
          <CommandList>
            <CommandEmpty>No products found.</CommandEmpty>
            <CommandGroup heading="Products">
              {products.map(product => (
                <CommandItem
                  key={product.id}
                  onSelect={() => {
                    navigate(`/products/${product.id}`);
                    setOpen(false);
                  }}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Flower className="h-4 w-4 text-bloom-pink" />
                    <span>{product.name}</span>
                    <span className="text-sm text-muted-foreground ml-2">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </CommandDialog>
        
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
