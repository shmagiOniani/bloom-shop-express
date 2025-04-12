export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}

export class CustomError extends Error {
  code?: string;
  status?: number;

  constructor(message: string, code?: string, status?: number) {
    super(message);
    this.code = code;
    this.status = status;
    this.name = 'CustomError';
  }
}

export const handleApiError = (error: any): ApiError => {
  if (error.response) {
    // Server responded with error status
    return {
      message: error.response.data.message || 'An error occurred with the server',
      code: error.response.data.code,
      status: error.response.status
    };
  } else if (error.request) {
    // Request made but no response
    return {
      message: 'Unable to connect to the server',
      code: 'NETWORK_ERROR',
      status: 503
    };
  } else {
    // Error in request setup
    return {
      message: error.message || 'An unexpected error occurred',
      code: 'CLIENT_ERROR',
      status: 400
    };
  }
}; 