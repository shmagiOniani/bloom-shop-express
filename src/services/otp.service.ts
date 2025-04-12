import api from '../lib/axios';
import { ApiError } from '../lib/error-handling';

export interface OTPRequest {
  email: string;
  type: 'registration' | 'password-reset';
}

export interface OTPVerification {
  email: string;
  otp: string;
}

export const otpService = {
  sendOTP: async (data: OTPRequest) => {
    try {
      const response = await api.post('/auth/otp/send', data);
      return response.data;
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(apiError.message || 'Failed to send OTP');
    }
  },

  verifyOTP: async (data: OTPVerification) => {
    try {
      const response = await api.post('/auth/otp/verify', data);
      return response.data;
    } catch (error) {
      const apiError = error as ApiError;
      throw new Error(apiError.message || 'Failed to verify OTP');
    }
  }
}; 