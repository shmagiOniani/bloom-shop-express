
export interface IProduct {
  name: string;
  description: string;
  price: number;
  image: string[];
  category: string;
  storeId: string;
  
}


export interface ResponseProduct {
  _id: string;
  storeId: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  featured: boolean;
  bestSeller: boolean;
  colors: string[];
  occasion: string[];
  __v: number;
}