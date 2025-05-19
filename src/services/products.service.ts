import axios from 'axios';
import api from '../lib/axios';
import { IProduct } from '../models/Product.model';

export const productService = {
  getAll: async (params?: any) => {
    const response = await api.get('/products', { params });
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  create: async (data: Partial<IProduct>) => {
    const response = await api.post('/products', data);
    return response.data;
  },

  update: async (id: string, data: Partial<IProduct>) => {
    const response = await api.put(`/products/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  },

  getFeatured: async () => {
    const response = await api.get('/products/featured/all');
    return response.data;
  },

  getBestSellers: async () => {
    const response = await api.get('/products/bestsellers/all');
    return response.data;
  },

  getByStoreId: async (storeId: string) => {
    const response = await api.get(`/products/byStoreId/${storeId}`);
    return response.data;
  },

  uploadImage: async (file: FormData) => {
    const response = await axios.post('http://localhost:3001/api/products/upload', file, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    });
    return response.data;
  },
}; 