
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-bloom-beige py-8">
      <div className="bloom-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold text-lg text-bloom-green mb-4">{t('app.name')}</h3>
            <p className="text-gray-600">
              {t('footer.description')}
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg text-bloom-green mb-4">{t('footer.shop')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="text-gray-600 hover:text-bloom-pink">
                  {t('footer.allFlowers')}
                </Link>
              </li>
              <li>
                <Link to="/products?category=bouquets" className="text-gray-600 hover:text-bloom-pink">
                  {t('footer.bouquets')}
                </Link>
              </li>
              <li>
                <Link to="/products?category=singles" className="text-gray-600 hover:text-bloom-pink">
                  {t('footer.singles')}
                </Link>
              </li>
              <li>
                <Link to="/products?category=arrangements" className="text-gray-600 hover:text-bloom-pink">
                  {t('footer.arrangements')}
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg text-bloom-green mb-4">{t('footer.help')}</h3>
            <p className="text-gray-600 mb-2">
              {t('footer.needAssistance')}
            </p>
            <p className="text-gray-600">
              {t('footer.email')}
            </p>
            <p className="text-gray-600">
              {t('footer.phone')}
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t border-gray-200 text-center text-gray-500 text-sm">
          © {currentYear} {t('app.name')}. {t('footer.rights')}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
