

import api from "@/lib/axios";
import { ResponseProduct } from "@/models/Product.model";

export const favoriteService = {
    getAllFavorites: async () => {
      const response = await api.get('/favorite');
      return response.data as ResponseProduct[];
    },

    addToFavorite: async (productId: string) => {
      const response = await api.post('/favorite', { productId });
      return response.data;
    },

    removeFromFavorite: async (productId: string) => {
      const response = await api.delete(`/favorite/${productId}`);
      return response.data;
    },

    clearFavorite: async () => {
      const response = await api.delete('/favorite');
      return response.data;
    }
  }