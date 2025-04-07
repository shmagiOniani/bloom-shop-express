import { Link } from 'react-router-dom';
import { getFeaturedProducts, getBestSellers } from '../data/products';
import ProductCard from '../components/ProductCard';
import StoreCarousel from '../components/StoreCarousel';
import { ArrowRight } from 'lucide-react';

const HomePage = () => {
  const featuredProducts = getFeaturedProducts();
  const bestSellers = getBestSellers();
  
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-bloom-light-pink py-16 md:py-24">
        <div className="bloom-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                Fresh Blooms for Every Occasion
              </h1>
              <p className="text-lg text-gray-600 mb-6">
                Discover beautiful bouquets and arrangements delivered with care.
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <Link to="/products" className="bloom-button">
                  Shop Now
                </Link>
                <Link to="/products?category=bouquets" className="bloom-button-outline">
                  View Bouquets
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <img 
                src="https://images.unsplash.com/photo-1516476892398-bdcab4c8dab8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                alt="Beautiful flower arrangement" 
                className="rounded-lg shadow-lg object-cover max-h-[500px] w-full"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-16">
        <div className="bloom-container">
          <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link to="/products?category=bouquets" className="relative group overflow-hidden rounded-lg">
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1562690868-60bbe7293e94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                  alt="Bouquets" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-2">Bouquets</h3>
                  <span className="inline-block px-4 py-2 bg-white text-bloom-pink rounded-full">
                    Shop Now
                  </span>
                </div>
              </div>
            </Link>
            
            <Link to="/products?category=singles" className="relative group overflow-hidden rounded-lg">
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1530968561612-3430e92b1de3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                  alt="Single Stems" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-2">Single Stems</h3>
                  <span className="inline-block px-4 py-2 bg-white text-bloom-pink rounded-full">
                    Shop Now
                  </span>
                </div>
              </div>
            </Link>
            
            <Link to="/products?category=arrangements" className="relative group overflow-hidden rounded-lg">
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1591886960571-74d43a9d4304?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                  alt="Arrangements" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-2">Arrangements</h3>
                  <span className="inline-block px-4 py-2 bg-white text-bloom-pink rounded-full">
                    Shop Now
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Featured Products Section */}
      <section className="py-16 bg-bloom-beige">
        <div className="bloom-container">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Flowers</h2>
            <Link to="/products" className="flex items-center text-bloom-green hover:text-bloom-pink transition-colors">
              View All <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="product-grid">
            {featuredProducts.slice(0, 4).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Store Locations Carousel */}
      <section className="py-16 bg-white">
        <div className="bloom-container">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Find Our Stores</h2>
            <Link to="/stores" className="flex items-center text-bloom-green hover:text-bloom-pink transition-colors">
              View All Locations <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <StoreCarousel />
          
          <div className="text-center mt-8">
            <Link to="/stores" className="bloom-button-outline">
              All Store Locations
            </Link>
          </div>
        </div>
      </section>
      
      {/* Best Sellers Section */}
      <section className="py-16">
        <div className="bloom-container">
          <h2 className="text-3xl font-bold text-center mb-8">Best Sellers</h2>
          
          <div className="product-grid">
            {bestSellers.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Why Choose Us Section */}
      <section className="py-16 bg-white">
        <div className="bloom-container">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Bloom Express</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-bloom-light-pink h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-bloom-pink" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Fresh Flowers Daily</h3>
              <p className="text-gray-600">Our blooms are sourced fresh each morning for maximum longevity and beauty.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-bloom-light-pink h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-bloom-pink" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Same Day Delivery</h3>
              <p className="text-gray-600">Order by 2pm for same-day delivery within our local delivery zones.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-bloom-light-pink h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-bloom-pink" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">7-Day Freshness</h3>
              <p className="text-gray-600">Our flowers are guaranteed to stay fresh for at least 7 days or we'll replace them.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
