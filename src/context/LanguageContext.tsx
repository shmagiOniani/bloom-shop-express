
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

type Language = 'en' | 'ka';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation dictionaries
const translations = {
  en: {
    // Common
    'app.name': 'Bloom Express',
    'language.english': 'English',
    'language.georgian': 'Georgian',
    
    // Navigation
    'nav.home': 'Home',
    'nav.shop': 'Shop',
    'nav.stores': 'Stores',
    'nav.cart': 'Cart',
    
    // Home page
    'home.hero.title': 'Fresh Blooms for Every Occasion',
    'home.hero.description': 'Discover beautiful bouquets and arrangements delivered with care.',
    'home.hero.shopNow': 'Shop Now',
    'home.hero.viewBouquets': 'View Bouquets',
    'home.categories.title': 'Shop by Category',
    'home.categories.bouquets': 'Bouquets',
    'home.categories.singles': 'Single Stems',
    'home.categories.arrangements': 'Arrangements',
    'home.categories.shopNow': 'Shop Now',
    'home.featured.title': 'Featured Flowers',
    'home.featured.viewAll': 'View All',
    'home.stores.title': 'Find Our Stores',
    'home.stores.viewAll': 'View All Locations',
    'home.stores.allLocations': 'All Store Locations',
    'home.bestSellers.title': 'Best Sellers',
    'home.whyChoose.title': 'Why Choose Bloom Express',
    'home.whyChoose.fresh.title': 'Fresh Flowers Daily',
    'home.whyChoose.fresh.description': 'Our blooms are sourced fresh each morning for maximum longevity and beauty.',
    'home.whyChoose.delivery.title': 'Same Day Delivery',
    'home.whyChoose.delivery.description': 'Order by 2pm for same-day delivery within our local delivery zones.',
    'home.whyChoose.freshness.title': '7-Day Freshness',
    'home.whyChoose.freshness.description': 'Our flowers are guaranteed to stay fresh for at least 7 days or we\'ll replace them.',
    
    // Footer
    'footer.description': 'Delivering fresh blooms daily for all your special moments.',
    'footer.shop': 'Shop',
    'footer.allFlowers': 'All Flowers',
    'footer.bouquets': 'Bouquets',
    'footer.singles': 'Single Stems',
    'footer.arrangements': 'Arrangements',
    'footer.help': 'Help',
    'footer.needAssistance': 'Need assistance with your order?',
    'footer.email': 'Email: support@bloomexpress.com',
    'footer.phone': 'Phone: (555) 123-4567',
    'footer.rights': 'All rights reserved.',
    
    // User Menu
    'user.login': 'Login',
    'user.account': 'My Account',
    'user.profile': 'Profile',
    'user.settings': 'Settings',
    'user.management': 'Management',
    'user.storeManagement': 'Store Management',
    'user.productManagement': 'Product Management',
    'user.adminPanel': 'Admin Panel',
    'user.logout': 'Log out',
    
    // Product detail
    'product.back': 'Back to Products',
    'product.quantity': 'Quantity',
    'product.addToCart': 'Add to Cart',
    'product.visitStore': 'Visit Store',
    'product.category': 'Category',
    'product.colors': 'Colors',
    'product.perfectFor': 'Perfect for',
    'product.notFound': 'Product Not Found',
    'product.notFoundDesc': 'Sorry, we couldn\'t find the product you\'re looking for.',
    'product.continueShopping': 'Continue Shopping',
    
    // Product Management
    'productManagement.title': 'Product Management',
    'productManagement.addNew': 'Add New Product',
    'productManagement.edit': 'Edit Product',
    'productManagement.updateDesc': 'Update the product information below.',
    'productManagement.addDesc': 'Fill in the details to add a new product to the catalog.',
    'productManagement.productName': 'Product Name',
    'productManagement.category': 'Category',
    'productManagement.price': 'Price ($)',
    'productManagement.imageUrl': 'Image URL',
    'productManagement.description': 'Description',
    'productManagement.cancel': 'Cancel',
    'productManagement.update': 'Update Product',
    'productManagement.add': 'Add Product',
    'productManagement.catalog': 'Product Catalog',
    'productManagement.catalogDesc': 'Current products in the Bloom Express catalog',
    'productManagement.image': 'Image',
    'productManagement.name': 'Name',
    'productManagement.actions': 'Actions',
    'productManagement.noProducts': 'No products available.',
    'productManagement.addFirst': 'Add Your First Product',
    'productManagement.accessDenied': 'Access Denied',
    'productManagement.noPermission': 'You don\'t have permission to manage products.',
    'productManagement.contactAdmin': 'Please contact an administrator if you believe this is an error.',
    'productManagement.returnHome': 'Return to Home',

    // Admin panel
    'admin.title': 'Admin Panel',
    'admin.description': 'Manage sales, view analytics, and control system settings',
    'admin.salesManagement': 'Sales Management',
    'admin.analytics': 'Analytics',
    'admin.salesHistory': 'Sales History',
    'admin.accessDenied': 'Access Denied',
    'admin.noPermission': 'You don\'t have permission to access the admin panel.',
    'admin.overview': 'Overview',
    'admin.recentSales': 'Recent Sales',
    'admin.salesByCategory': 'Sales by Category',
    'admin.totalRevenue': 'Total Revenue',
    'admin.orderStatus': 'Order Status',
    'admin.filter': 'Filter',
    'admin.all': 'All',
    'admin.today': 'Today',
    'admin.thisWeek': 'This Week',
    'admin.thisMonth': 'This Month',
    'admin.dateRange': 'Date Range',
    'admin.orderId': 'Order ID',
    'admin.customer': 'Customer',
    'admin.date': 'Date',
    'admin.status': 'Status',
    'admin.amount': 'Amount',
    'admin.viewDetails': 'View Details',
    'admin.systemSettings': 'System Settings'
  },
  ka: {
    // Common
    'app.name': 'ბლუმ ექსპრესი',
    'language.english': 'ინგლისური',
    'language.georgian': 'ქართული',
    
    // Navigation
    'nav.home': 'მთავარი',
    'nav.shop': 'მაღაზია',
    'nav.stores': 'მაღაზიები',
    'nav.cart': 'კალათა',
    
    // Home page
    'home.hero.title': 'ახალი ყვავილები ნებისმიერი შემთხვევისთვის',
    'home.hero.description': 'აღმოაჩინეთ ლამაზი თაიგულები და კომპოზიციები, რომლებიც მიეწოდება ზრუნვით.',
    'home.hero.shopNow': 'ახლავე შეძენა',
    'home.hero.viewBouquets': 'თაიგულების ნახვა',
    'home.categories.title': 'კატეგორიით შოპინგი',
    'home.categories.bouquets': 'თაიგულები',
    'home.categories.singles': 'ცალკეული ღერები',
    'home.categories.arrangements': 'კომპოზიციები',
    'home.categories.shopNow': 'ახლავე შეძენა',
    'home.featured.title': 'გამორჩეული ყვავილები',
    'home.featured.viewAll': 'ყველას ნახვა',
    'home.stores.title': 'იპოვნეთ ჩვენი მაღაზიები',
    'home.stores.viewAll': 'ყველა ლოკაციის ნახვა',
    'home.stores.allLocations': 'ყველა მაღაზიის ლოკაცია',
    'home.bestSellers.title': 'ბესტსელერები',
    'home.whyChoose.title': 'რატომ აირჩიოთ ბლუმ ექსპრესი',
    'home.whyChoose.fresh.title': 'ახალი ყვავილები ყოველდღე',
    'home.whyChoose.fresh.description': 'ჩვენი ყვავილები მოგვაქვს ახალი ყოველ დილით მაქსიმალური სიცოცხლისუნარიანობისა და სილამაზისთვის.',
    'home.whyChoose.delivery.title': 'იმავე დღეს მიწოდება',
    'home.whyChoose.delivery.description': 'შეუკვეთეთ 14:00-მდე იმავე დღეს მიწოდებით ჩვენი ადგილობრივი მიწოდების ზონებში.',
    'home.whyChoose.freshness.title': '7-დღიანი სიახლე',
    'home.whyChoose.freshness.description': 'ჩვენი ყვავილები გარანტირებულია, რომ დარჩება ახალი სულ მცირე 7 დღის განმავლობაში ან ჩვენ შევცვლით მათ.',
    
    // Footer
    'footer.description': 'ახალი ყვავილების მიწოდება ყოველდღე თქვენი ყველა განსაკუთრებული მომენტისთვის.',
    'footer.shop': 'მაღაზია',
    'footer.allFlowers': 'ყველა ყვავილი',
    'footer.bouquets': 'თაიგულები',
    'footer.singles': 'ცალკეული ღერები',
    'footer.arrangements': 'კომპოზიციები',
    'footer.help': 'დახმარება',
    'footer.needAssistance': 'გჭირდებათ დახმარება თქვენი შეკვეთით?',
    'footer.email': 'ელფოსტა: support@bloomexpress.com',
    'footer.phone': 'ტელეფონი: (555) 123-4567',
    'footer.rights': 'ყველა უფლება დაცულია.',
    
    // User Menu
    'user.login': 'შესვლა',
    'user.account': 'ჩემი ანგარიში',
    'user.profile': 'პროფილი',
    'user.settings': 'პარამეტრები',
    'user.management': 'მართვა',
    'user.storeManagement': 'მაღაზიების მართვა',
    'user.productManagement': 'პროდუქტების მართვა',
    'user.adminPanel': 'ადმინ პანელი',
    'user.logout': 'გასვლა',
    
    // Product detail
    'product.back': 'პროდუქტებზე დაბრუნება',
    'product.quantity': 'რაოდენობა',
    'product.addToCart': 'კალათაში დამატება',
    'product.visitStore': 'მაღაზიის მონახულება',
    'product.category': 'კატეგორია',
    'product.colors': 'ფერები',
    'product.perfectFor': 'იდეალურია',
    'product.notFound': 'პროდუქტი ვერ მოიძებნა',
    'product.notFoundDesc': 'სამწუხაროდ, ვერ ვიპოვეთ თქვენს მიერ მოძებნილი პროდუქტი.',
    'product.continueShopping': 'შოპინგის გაგრძელება',

    // Product Management
    'productManagement.title': 'პროდუქტების მართვა',
    'productManagement.addNew': 'ახალი პროდუქტის დამატება',
    'productManagement.edit': 'პროდუქტის რედაქტირება',
    'productManagement.updateDesc': 'განაახლეთ პროდუქტის ინფორმაცია ქვემოთ.',
    'productManagement.addDesc': 'შეავსეთ დეტალები კატალოგში ახალი პროდუქტის დასამატებლად.',
    'productManagement.productName': 'პროდუქტის სახელი',
    'productManagement.category': 'კატეგორია',
    'productManagement.price': 'ფასი ($)',
    'productManagement.imageUrl': 'სურათის URL',
    'productManagement.description': 'აღწერა',
    'productManagement.cancel': 'გაუქმება',
    'productManagement.update': 'პროდუქტის განახლება',
    'productManagement.add': 'პროდუქტის დამატება',
    'productManagement.catalog': 'პროდუქტების კატალოგი',
    'productManagement.catalogDesc': 'მიმდინარე პროდუქტები ბლუმ ექსპრესის კატალოგში',
    'productManagement.image': 'სურათი',
    'productManagement.name': 'სახელი',
    'productManagement.actions': 'ქმედებები',
    'productManagement.noProducts': 'პროდუქტები არ არის ხელმისაწვდომი.',
    'productManagement.addFirst': 'დაამატეთ თქვენი პირველი პროდუქტი',
    'productManagement.accessDenied': 'წვდომა აკრძალულია',
    'productManagement.noPermission': 'თქვენ არ გაქვთ პროდუქტების მართვის უფლება.',
    'productManagement.contactAdmin': 'გთხოვთ დაუკავშირდეთ ადმინისტრატორს, თუ ფიქრობთ, რომ ეს შეცდომაა.',
    'productManagement.returnHome': 'მთავარ გვერდზე დაბრუნება',

    // Admin panel
    'admin.title': 'ადმინ პანელი',
    'admin.description': 'მართეთ გაყიდვები, ნახეთ ანალიტიკა და აკონტროლეთ სისტემის პარამეტრები',
    'admin.salesManagement': 'გაყიდვების მართვა',
    'admin.analytics': 'ანალიტიკა',
    'admin.salesHistory': 'გაყიდვების ისტორია',
    'admin.accessDenied': 'წვდომა აკრძალულია',
    'admin.noPermission': 'თქვენ არ გაქვთ ადმინ პანელზე წვდომის უფლება.',
    'admin.overview': 'მიმოხილვა',
    'admin.recentSales': 'ბოლო გაყიდვები',
    'admin.salesByCategory': 'გაყიდვები კატეგორიების მიხედვით',
    'admin.totalRevenue': 'მთლიანი შემოსავალი',
    'admin.orderStatus': 'შეკვეთის სტატუსი',
    'admin.filter': 'ფილტრი',
    'admin.all': 'ყველა',
    'admin.today': 'დღეს',
    'admin.thisWeek': 'ამ კვირაში',
    'admin.thisMonth': 'ამ თვეში',
    'admin.dateRange': 'თარიღის დიაპაზონი',
    'admin.orderId': 'შეკვეთის ID',
    'admin.customer': 'მომხმარებელი',
    'admin.date': 'თარიღი',
    'admin.status': 'სტატუსი',
    'admin.amount': 'რაოდენობა',
    'admin.viewDetails': 'დეტალების ნახვა',
    'admin.systemSettings': 'სისტემის პარამეტრები'
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    // Try to get the language from localStorage, default to 'en'
    const savedLanguage = localStorage.getItem('language');
    return (savedLanguage === 'en' || savedLanguage === 'ka') ? savedLanguage : 'en';
  });

  // Update localStorage when language changes
  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }, [language]);

  // Translation function
  const t = (key: string): string => {
    const currentTranslations = translations[language];
    // Using type assertion to tell TypeScript that we're accessing a property of the translations object
    return (currentTranslations as Record<string, string>)[key] || key;
  };

  // Set language function
  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
