import axios from 'axios';
import { handleApiError } from './error-handling';
import { toast } from '@/components/ui/use-toast';

const api = axios.create({
  baseURL: 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
});

// Add a request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(handleApiError(error));
  }
);

// Add a response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const processedError = handleApiError(error);

    // Handle authentication errors
    if (processedError.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }

    // Show toast for server errors
    if (processedError.status >= 500) {
      toast({
        title: "Server Error",
        description: processedError.message,
        variant: "destructive"
      });
    }

    return Promise.reject(processedError);
  }
);

export default api; 