
import { Link } from 'react-router-dom';
import { Menu, X, MapPin, Flower, Heart } from 'lucide-react';
import { useState, ReactNode } from 'react';
import { useLanguage } from '../context/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import { useFavorite } from '@/context/FavoriteContext';

interface HeaderProps {
  userMenu?: ReactNode;
}

const Header = ({ userMenu }: HeaderProps) => {
  const { favorite } = useFavorite();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <header className="sticky top-0 bg-white border-b border-gray-100 shadow-sm z-40">
      <div className="bloom-container">
        <div className="flex items-center justify-between py-4">
          <Link to="/" className="flex items-center">
            <Flower className="h-6 w-6 text-bloom-green mr-2 animate-spin-slow" />
            <span className="text-2xl font-bold text-bloom-green">{t('app.name')}</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-bloom-pink transition-colors hover:scale-105 transform duration-200">
              {t('nav.home')}
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-bloom-pink transition-colors hover:scale-105 transform duration-200">
              {t('nav.shop')}
            </Link>
            <Link to="/stores" className="flex items-center text-gray-700 hover:text-bloom-pink transition-colors hover:scale-105 transform duration-200">
              <MapPin className="h-4 w-4 mr-1" />
              {t('nav.stores')}
            </Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            {/* Language Switcher */}
            <LanguageSwitcher />
            
            {/* User Menu */}
            {userMenu}
            
            {/* Favorite Icon */}
            <Link to="/favorite" className="relative hover:scale-110 transition-transform duration-200">
              <Heart className="h-6 w-6 text-gray-700 hover:text-bloom-pink transition-colors animate-pulse" />
              {favorite && favorite.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-bloom-pink text-white rounded-full w-5 h-5 flex items-center justify-center text-xs animate-bounce">
                  {favorite.length}
                </span>
              )}
            </Link>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-gray-700" />
              ) : (
                <Menu className="h-6 w-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 pt-2">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-bloom-pink transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('nav.home')}
              </Link>
              <Link 
                to="/products" 
                className="text-gray-700 hover:text-bloom-pink transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('nav.shop')}
              </Link>
              <Link 
                to="/stores" 
                className="flex items-center text-gray-700 hover:text-bloom-pink transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <MapPin className="h-4 w-4 mr-1" />
                {t('nav.stores')}
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
