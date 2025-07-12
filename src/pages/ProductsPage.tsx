
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
// import { Product, products } from '../data/products';
import ProductCard from '../components/ProductCard';
import { Input } from '@/components/ui/input';
import { Flower, Search, SlidersHorizontal, X } from 'lucide-react';
import { Label } from '@/components/ui/label'; // Added missing import
import { Checkbox } from '@/components/ui/checkbox'; // Added missing import
import { 
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { useNavigate } from 'react-router-dom';
import PriceRangeFilter from '@/components/PriceRangeFilter';
import CityFilter from '@/components/CityFilter';
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from "@/components/ui/collapsible";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from '@/components/ui/button';
import { useLanguage } from '../context/LanguageContext';
import { productService } from '@/services/products.service';
const ProductsPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(categoryParam);
  const [activeSort, setActiveSort] = useState<string>('featured');
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);
  
  // Price filter state
  const minAvailablePrice = 1;
  const maxAvailablePrice = 100;
  const [priceRange, setPriceRange] = useState<[number, number]>([minAvailablePrice, maxAvailablePrice]);
  
  // City filter state
  const availableCities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Miami', 'San Francisco', 'Seattle', 'Washington D.C.'];
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  
  // Mobile filters state
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const { t } = useLanguage();

  const [products, setProducts] = useState<any[]>([]);

  const fetchProducts = async () => {
    const response = await productService.getAll();
    setProducts(response);
    setFilteredProducts(response);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

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
    
    // Apply price filter
    result = result.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Apply city filter
    if (selectedCities.length > 0) {
      result = result.filter(product => 
        product.city && selectedCities.includes(product.city)
      );
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
  }, [activeCategory, activeSort, searchTerm, priceRange, selectedCities]);
  
  // Update active category when URL param changes
  useEffect(() => {
    setActiveCategory(categoryParam);
  }, [categoryParam]);
  
  const handlePriceChange = (min: number, max: number) => {
    setPriceRange([min, max]);
  };
  
  const handleCityChange = (city: string, isChecked: boolean) => {
    if (isChecked) {
      setSelectedCities([...selectedCities, city]);
    } else {
      setSelectedCities(selectedCities.filter(c => c !== city));
    }
  };
  
  const clearFilters = () => {
    setPriceRange([minAvailablePrice, maxAvailablePrice]);
    setSelectedCities([]);
    setActiveCategory(null);
  };
  
  const hasActiveFilters = selectedCities.length > 0 || 
                          priceRange[0] > minAvailablePrice || 
                          priceRange[1] < maxAvailablePrice ||
                          activeCategory !== null;
  
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
                  key={product._id}
                  onSelect={() => {
                    navigate(`/products/${product._id}`);
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
        
        <div className="flex flex-col lg:flex-row gap-8 mb-8">
          {/* Desktop Filter Panel */}
          <div className="bg-bloom-beige p-4 rounded-lg hidden lg:block w-64 shrink-0 space-y-8">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Filters</h3>
              {hasActiveFilters && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearFilters}
                  className="text-xs text-gray-500 flex items-center"
                >
                  <X className="h-3 w-3 mr-1" />
                  Clear all
                </Button>
              )}
            </div>
            
            {/* Category Filter */}
            <div className="space-y-3">
              <h4 className="font-medium text-sm">Categories</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="all-categories" 
                    checked={activeCategory === null}
                    onCheckedChange={() => setActiveCategory(null)}
                  />
                  <Label htmlFor="all-categories" className="text-sm cursor-pointer">{t('all-categories')}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="bouquets" 
                    checked={activeCategory === 'bouquets'}
                    onCheckedChange={(checked) => setActiveCategory(checked ? 'bouquets' : null)}
                  />
                  <Label htmlFor="bouquets" className="text-sm cursor-pointer">{t('bouquets')}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="singles" 
                    checked={activeCategory === 'singles'}
                    onCheckedChange={(checked) => setActiveCategory(checked ? 'singles' : null)}
                  />
                  <Label htmlFor="singles" className="text-sm cursor-pointer">{t('singles')}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="arrangements" 
                    checked={activeCategory === 'arrangements'}
                    onCheckedChange={(checked) => setActiveCategory(checked ? 'arrangements' : null)}
                  />
                    <Label htmlFor="arrangements" className="text-sm cursor-pointer">{t('arrangements')}</Label>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-6">
              <PriceRangeFilter 
                minPrice={minAvailablePrice} 
                maxPrice={maxAvailablePrice} 
                onChange={handlePriceChange} 
              />
            </div>
            
            <div className="border-t border-gray-200 pt-6">
              <CityFilter 
                cities={availableCities}
                selectedCities={selectedCities}
                onChange={handleCityChange}
              />
            </div>
          </div>
          
          <div className="flex-1">
            {/* Mobile Filter Button */}
            <div className="lg:hidden flex justify-between items-center mb-4">
              <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-1">
                    <SlidersHorizontal className="h-4 w-4" />
                    Filters
                    {hasActiveFilters && (
                      <span className="bg-bloom-pink text-white text-xs rounded-full h-5 w-5 flex items-center justify-center ml-1">
                        !
                      </span>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-full sm:max-w-sm">
                  <SheetHeader>
                    <SheetTitle className="flex justify-between items-center">
                      <span>{t('filters')}</span>
                      {hasActiveFilters && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={clearFilters}
                          className="text-xs text-gray-500 flex items-center"
                        >
                          <X className="h-3 w-3 mr-1" />
                          {t('clear-all')}
                        </Button>
                      )}
                    </SheetTitle>
                    <SheetDescription>
                      {t('refine-your-product-search')}
                    </SheetDescription>
                  </SheetHeader>
                  <div className="mt-6 space-y-6">
                    {/* Category Filter */}
                    <Collapsible defaultOpen>
                      <CollapsibleTrigger className="flex justify-between w-full text-left font-medium py-2 border-b">
                        <span>{t('categories')}</span>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="pt-4 space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="mobile-all-categories" 
                            checked={activeCategory === null}
                            onCheckedChange={() => setActiveCategory(null)}
                          />
                          <Label htmlFor="mobile-all-categories" className="text-sm cursor-pointer">{t('all-categories')}</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="mobile-bouquets" 
                            checked={activeCategory === 'bouquets'}
                            onCheckedChange={(checked) => setActiveCategory(checked ? 'bouquets' : null)}
                          />
                          <Label htmlFor="mobile-bouquets" className="text-sm cursor-pointer">{t('bouquets')}</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="mobile-singles" 
                            checked={activeCategory === 'singles'}
                            onCheckedChange={(checked) => setActiveCategory(checked ? 'singles' : null)}
                          />
                          <Label htmlFor="mobile-singles" className="text-sm cursor-pointer">{t('singles')}</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="mobile-arrangements" 
                            checked={activeCategory === 'arrangements'}
                            onCheckedChange={(checked) => setActiveCategory(checked ? 'arrangements' : null)}
                          />
                          <Label htmlFor="mobile-arrangements" className="text-sm cursor-pointer">{t('arrangements')}</Label>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                    
                    <Collapsible defaultOpen>
                      <CollapsibleTrigger className="flex justify-between w-full text-left font-medium py-2 border-b">
                        <span>{t('price')}</span>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="pt-4">
                        <PriceRangeFilter 
                          minPrice={minAvailablePrice} 
                          maxPrice={maxAvailablePrice} 
                          onChange={handlePriceChange} 
                        />
                      </CollapsibleContent>
                    </Collapsible>
                    
                    <Collapsible defaultOpen>
                      <CollapsibleTrigger className="flex justify-between w-full text-left font-medium py-2 border-b">
                        <span>{t('cities')}</span>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="pt-4">
                        <CityFilter 
                          cities={availableCities}
                          selectedCities={selectedCities}
                          onChange={handleCityChange}
                        />
                      </CollapsibleContent>
                    </Collapsible>
                    
                    <div className="pt-4">
                      <Button 
                        className="w-full bloom-button" 
                        onClick={() => setIsFilterOpen(false)}
                      >
                        {t('apply-filters')}
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
              
              <div className="flex items-center">
                <label htmlFor="mobile-sort" className="text-sm text-gray-600 mr-2">{t('sort')}:</label>
                <select 
                  id="mobile-sort" 
                  className="border-gray-200 rounded-md text-sm"
                  value={activeSort}
                  onChange={(e) => setActiveSort(e.target.value)}
                >
                    <option value="featured">{t('featured')}</option>
                  <option value="price-low">{t('price-low')}</option>
                  <option value="price-high">{t('price-high')}</option>
                  <option value="name">{t('name')}</option>
                </select>
              </div>
            </div>
            
            {/* Filter Summary for Desktop */}
            <div className="hidden lg:flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">
                  {filteredProducts.length} products found
                </span>
                {hasActiveFilters && (
                  <div className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={clearFilters}
                      className="text-xs text-gray-500 flex items-center p-0 h-auto hover:bg-transparent"
                    >
                      {t('clear-filters')}
                    </Button>
                  </div>
                )}
              </div>
              
              <div className="flex items-center">
                <label htmlFor="desktop-sort" className="text-sm text-gray-600 mr-2">{t('sort-by')}:</label>
                <select 
                  id="desktop-sort" 
                  className="border-gray-200 rounded-md text-sm"
                  value={activeSort}
                  onChange={(e) => setActiveSort(e.target.value)}
                >
                  <option value="featured">{t('featured')}</option>
                  <option value="price-low">{t('price-low')}</option>
                  <option value="price-high">{t('price-high')}</option>
                  <option value="name">{t('name')}</option>
                </select>
              </div>
            </div>
            
            {/* Active Filter Pills */}
            {hasActiveFilters && (
              <div className="flex flex-wrap gap-2 mb-4">
                {activeCategory && (
                  <div className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full flex items-center gap-1">
                    <span>{t('category')}: {activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}</span>
                    <button onClick={() => setActiveCategory(null)} className="ml-1">
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                )}
                
                {(priceRange[0] > minAvailablePrice || priceRange[1] < maxAvailablePrice) && (
                  <div className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full flex items-center gap-1">
                    <span>{t('price')}: ${priceRange[0]} - ${priceRange[1]}</span>
                    <button onClick={() => setPriceRange([minAvailablePrice, maxAvailablePrice])} className="ml-1">
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                )}
                
                {selectedCities.map(city => (
                  <div key={city} className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full flex items-center gap-1">
                    <span>{t('city')}: {city}</span>
                    <button onClick={() => handleCityChange(city, false)} className="ml-1">
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            
            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="product-grid">
                {filteredProducts.map(product => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium">{t('no-products-found')}</h3>
                <p className="text-gray-500 mt-2">{t('try-changing-filters')}</p>
                <Button 
                  variant="outline" 
                  className="mt-4" 
                  onClick={clearFilters}
                >
                  {t('clear-all-filters')}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
