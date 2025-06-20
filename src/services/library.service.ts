import api from '../lib/axios';

export const libraryService = {
  getCategories: async () => {
    const response = await api.get('/library/productCategory');
    console.log(response);
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

