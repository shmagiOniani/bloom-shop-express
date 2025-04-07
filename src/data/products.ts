
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: "bouquets" | "singles" | "arrangements";
  image: string;
  featured: boolean;
  bestSeller?: boolean;
  colors?: string[];
  occasion?: string[];
  city?: string; // Added city property
}

export const products: Product[] = [
  {
    id: 1,
    name: "Romantic Rose Bouquet",
    description: "A stunning arrangement of premium red roses. Perfect for expressing love and admiration. Each bouquet contains a dozen fresh roses with eucalyptus accents.",
    price: 59.99,
    category: "bouquets",
    image: "https://images.unsplash.com/photo-1561181286-d5b4822d9d8d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    featured: true,
    bestSeller: true,
    colors: ["red", "green"],
    occasion: ["anniversary", "valentines"],
    city: "New York"
  },
  {
    id: 2,
    name: "Sunshine Daisy Mix",
    description: "Brighten someone's day with this cheerful arrangement of fresh daisies and sunflowers. A perfect gift to bring joy and warmth.",
    price: 44.99,
    category: "bouquets",
    image: "https://images.unsplash.com/photo-1531058020387-3be344556be6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    featured: true,
    colors: ["yellow", "white", "green"],
    occasion: ["birthday", "congratulations"],
    city: "Los Angeles"
  },
  {
    id: 3,
    name: "Elegant White Lily",
    description: "A sophisticated single stem lily, known for its elegant appearance and subtle fragrance. A classic choice for any occasion.",
    price: 12.99,
    category: "singles",
    image: "https://images.unsplash.com/photo-1585226339229-20c99abed4c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    featured: false,
    colors: ["white", "green"],
    occasion: ["sympathy", "wedding"],
    city: "Chicago"
  },
  {
    id: 4,
    name: "Lavender Dreams",
    description: "A beautiful bundle of fresh lavender stems, known for their calming scent and purple hue. Perfect for adding a touch of tranquility to any space.",
    price: 18.99,
    category: "singles",
    image: "https://images.unsplash.com/photo-1611745179863-d85981548d51?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    featured: true,
    colors: ["purple", "green"],
    occasion: ["housewarming", "self-care"],
    city: "Seattle"
  },
  {
    id: 5,
    name: "Classic Vase Arrangement",
    description: "A professionally designed floral arrangement in a complimentary glass vase. Features seasonal blooms in harmonious colors.",
    price: 69.99,
    category: "arrangements",
    image: "https://images.unsplash.com/photo-1599789182843-c11e8bbd7d63?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    featured: false,
    bestSeller: true,
    colors: ["mixed", "green"],
    occasion: ["birthday", "congratulations", "thank you"],
    city: "Boston"
  },
  {
    id: 6,
    name: "Spring Tulip Collection",
    description: "Embrace the season with this vibrant mix of colorful tulips. A fresh and lively arrangement that celebrates spring.",
    price: 39.99,
    category: "bouquets",
    image: "https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    featured: true,
    colors: ["mixed", "green"],
    occasion: ["spring", "birthday"],
    city: "Portland"
  },
  {
    id: 7,
    name: "Orchid Elegance",
    description: "A stunning orchid plant that brings long-lasting beauty and exotic flair to any interior. Comes in a decorative pot.",
    price: 54.99,
    category: "arrangements",
    image: "https://images.unsplash.com/photo-1566836610593-62a64888a216?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    featured: false,
    colors: ["purple", "white"],
    occasion: ["housewarming", "congratulations"],
    city: "San Francisco"
  },
  {
    id: 8,
    name: "Single Sunflower",
    description: "A cheerful single sunflower stem to brighten any day. This sunny bloom symbolizes adoration and loyalty.",
    price: 9.99,
    category: "singles",
    image: "https://images.unsplash.com/photo-1551927411-95e412943b58?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    featured: false,
    colors: ["yellow", "green"],
    occasion: ["birthday", "cheer up"],
    city: "Denver"
  },
  {
    id: 9,
    name: "Wildflower Basket",
    description: "A rustic basket filled with seasonal wildflowers, creating a natural, garden-inspired arrangement that feels fresh-picked.",
    price: 49.99,
    category: "arrangements",
    image: "https://images.unsplash.com/photo-1515864157334-03512f4c1eba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    featured: true,
    colors: ["mixed", "green"],
    occasion: ["birthday", "thank you"],
    city: "Austin"
  },
  {
    id: 10,
    name: "Luxury Peony Bouquet",
    description: "A luxurious arrangement featuring seasonal peonies in soft pink hues. Known for their fluffy blooms and sweet fragrance.",
    price: 89.99,
    category: "bouquets",
    image: "https://images.unsplash.com/photo-1463554050456-f2ed7d3fec09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    featured: true,
    bestSeller: true,
    colors: ["pink", "green"],
    occasion: ["anniversary", "wedding", "luxury"],
    city: "New York"
  },
  {
    id: 11,
    name: "Single Rose Stem",
    description: "A classic gesture of affection, this single rose stem is perfect for expressing love or appreciation with simple elegance.",
    price: 7.99,
    category: "singles",
    image: "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    featured: false,
    colors: ["red", "green"],
    occasion: ["valentines", "romance"],
    city: "Miami"
  },
  {
    id: 12,
    name: "Modern White & Green",
    description: "A contemporary arrangement featuring white blooms and varied greenery. Clean, fresh, and perfect for modern interiors.",
    price: 64.99,
    category: "arrangements",
    image: "https://images.unsplash.com/photo-1612360426531-bdaddbe646bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    featured: false,
    colors: ["white", "green"],
    occasion: ["business", "modern"],
    city: "Chicago"
  }
];

export const getProductById = (id: number): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getBestSellers = (): Product[] => {
  return products.filter(product => product.bestSeller);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};
