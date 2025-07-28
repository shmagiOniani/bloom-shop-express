import api from '../lib/axios';

export const productCategoriesService = {
  getCategories: async () => {
    const response = await api.get('/product-categories/productCategory');
    return response.data;
  },

  deleteCategory: async (categoryId: string) => {
    const response = await api.delete(`/product-categories/productCategory/${categoryId}`);
    return response.data;
  },

  addCategory: async (category: any) => {
    const response = await api.post('/product-categories/productCategory', category);
    return response.data;
  },

  updateCategory: async (categoryId: string, category: any) => {
    const response = await api.put(`/product-categories/productCategory/${categoryId}`, category);
    return response.data;
  },

  // getCities: async () => {
  //   const response = await api.get('/library/cities');
  //   return response.data;
  // },

  // getOccasions: async () => {
  //   const response = await api.get('/library/occasions');
  //   return response.data;
  // },
}; 

