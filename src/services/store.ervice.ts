import api from "@/lib/axios";
import { Store } from "@/pages/StoresPage";



export const storeService = {
    getAllStores: async () => {
      const response = await api.get('/stores');
      return response.data as Store[];
    },

    getMyStores: async () => {
      const response = await api.get('/stores/my');
      return response.data as Store[];
    },
  
    createStore: async (data: Store) => {
      const response = await api.post('/stores', data);
      return response.data;
    },

    updateStore: async (id: string, data: Store) => {
      const response = await api.put(`/stores/${id}`, data);
      return response.data;
    },

    deleteStore: async (id: string) => {
      const response = await api.delete(`/stores/${id}`);
      return response.data;
    },

    getStoreById: async (id: string) => {
      const response = await api.get(`/stores/${id}`);
      return response.data;
    }

  }