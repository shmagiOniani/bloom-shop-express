
import { Link } from 'react-router-dom';
import { useFavorite } from '@/context/FavoriteContext';
import { Button } from '../components/ui/button';
import { Trash2, ShoppingBag, Plus, Minus } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const FavoritePage = () => {
  const { favorite, removeFromFavorite, clearFavorite } = useFavorite();
  const { t } = useLanguage();
  if (favorite && favorite.length === 0) {
    return (
      <div className="bloom-container py-16 text-center">
        <div className="max-w-md mx-auto">
          <div className="flex justify-center mb-6">
            <ShoppingBag className="h-16 w-16 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold mb-2">{t('favorite.empty')}</h2>
          <p className="text-gray-600 mb-8">
            {t('favorite.emptyDesc')}
          </p>
          <Link to="/products" className="bloom-button inline-flex">
            {t('favorite.continueShopping')}
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="py-8">
      <div className="bloom-container">
        <h1 className="text-3xl font-bold mb-8">{t('favorite.title')}</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="p-6">
                <div className="flow-root">
                  <ul className="-my-6 divide-y divide-gray-200">
                    {favorite && favorite.map((item) => (
                      <li key={item._id} className="py-6 flex">
                        <div className="flex-shrink-0 w-24 h-24 overflow-hidden rounded-md border border-gray-200">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="ml-4 flex-1 flex flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>
                                <Link to={`/products/${item._id}`}>{item.name}</Link>
                              </h3>
                              <p className="ml-4">${(item.price).toFixed(2)}</p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">{item.category}</p>
                          </div>
                          
                          <div className="flex-1 flex items-end justify-between text-sm">
                            <div className="flex items-center border rounded">
                              {/* <button
                                // onClick={() => updateQuantity(item._id, 1)}
                                className="p-2 hover:bg-gray-100 transition-colors"
                                disabled={1 <= 1}
                              >
                                <Minus className="h-4 w-4" />
                              </button> */}
                              {/* <span className="px-4 py-2">1</span> */}
                              {/* <button
                                onClick={() => updateQuantity(item._id, 1)}
                                className="p-2 hover:bg-gray-100 transition-colors"
                              >
                                <Plus className="h-4 w-4" />
                              </button> */}
                            </div>
                            
                            <button
                              type="button"
                              className="font-medium text-red-600 hover:text-red-500"
                              onClick={() => removeFromFavorite(item._id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="border-t border-gray-200 px-6 py-4 flex justify-between">
                <button
                  type="button"
                  className="text-sm text-red-600 hover:text-red-500"
                  onClick={clearFavorite}
                >
                  {t('favorite.clearFavorite')}
                </button>
                {/* <Link to="/products" className="text-sm text-bloom-green hover:text-bloom-pink">
                  {t('favorite.continueShopping')}
                </Link> */}
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          {/* <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 sticky top-24">
              <h2 className="text-lg font-medium text-gray-900 mb-4">{t('favorite.orderSummary')}</h2>
              
              <div className="flow-root">
                <div className="border-t border-b py-4">
                  <div className="flex justify-between text-base">
                    <p>{t('favorite.subtotal')}</p>
                    <p>${subtotal.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between text-base mt-2">
                    <p>{t('favorite.shipping')}</p>
                    <p>{t('favorite.calculatedAtCheckout')}</p>
                  </div>
                </div>
                
                <div className="flex justify-between text-lg font-medium my-4">
                  <p>{t('favorite.total')}</p>
                  <p>${subtotal.toFixed(2)}</p>
                </div>
                
                <div className="mt-6">
                  <Link to="/checkout" className="bloom-button w-full text-center">
                    {t('favorite.proceedToCheckout')}
                  </Link>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default FavoritePage;
