
export interface Product {
  _id: string;
  storeId: number;
  name: string;
  description: string;
  price: number;
  category: {
    _id: string;
    name: string;
  };
  image: string[];
  featured: boolean;
  bestSeller?: boolean;
  colors?: string[];
  occasion?: string[];
  city?: string; // Added city property
}



// export const getProductById = (id: string): Product | undefined => {
//   return products.find(product => product._id === id);
// };

// export const getFeaturedProducts = (): Product[] => {
//   return products.filter(product => product.featured);
// };

// export const getBestSellers = (): Product[] => {
//   return products.filter(product => product.bestSeller);
// };

// export const getProductsByCategory = (category: string): Product[] => {
//   return products.filter(product => product.category === category);
// };
