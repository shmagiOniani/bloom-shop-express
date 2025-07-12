import api from '../lib/axios';
import { ApiError } from '../lib/error-handling';

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface GoogleLoginData {
  token: string;
}

export const authService = {
  register: async (data: RegisterData) => {
    try {
      const response = await api.post('/auth/register', data);
      return response.data;
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(apiError.message || 'Registration failed');
    }
  },

  login: async (data: LoginData) => {
    try {
      const response = await api.post('/auth/login', data);
      return response.data;
    } catch (error) {
      const apiError = error as ApiError;
      if (apiError.status === 401) {
        throw new Error('Invalid email or password');
      }
      throw new Error(apiError.message || 'Login failed');
    }
  },

  googleLogin: async (data: GoogleLoginData) => {
    try {
      const response = await api.post('/auth/google/callback', data);
      return response.data;
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(apiError.message || 'Google login failed');
    }
  },
  getCurrentUser: async () => {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(apiError.message || 'Failed to fetch user data');
    }
  }
}; 