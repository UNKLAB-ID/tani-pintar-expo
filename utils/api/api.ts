import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import * as SecureStore from 'expo-secure-store';

interface ApiResponse<T = any> {
  success: boolean;
  status: number;
  data: T | null;
  message: string;
  error?: any;
}

const API = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 10000,
  headers: {},
});

// Token management
const TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

const getAccessToken = async (): Promise<string | null> => {
  try {
    return await SecureStore.getItemAsync(TOKEN_KEY);
  } catch (error) {
    console.error('Error getting access token:', error);
    return null;
  }
};

const getRefreshToken = async (): Promise<string | null> => {
  try {
    return await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
  } catch (error) {
    console.error('Error getting refresh token:', error);
    return null;
  }
};

const setTokens = async (accessToken: string, refreshToken: string): Promise<void> => {
  try {
    await SecureStore.setItemAsync(TOKEN_KEY, accessToken);
    await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, refreshToken);
  } catch (error) {
    console.error('Error setting tokens:', error);
  }
};

const clearTokens = async (): Promise<void> => {
  try {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
  } catch (error) {
    console.error('Error clearing tokens:', error);
  }
};

const refreshAccessToken = async (): Promise<string | null> => {
  try {
    const refreshToken = await getRefreshToken();
    if (!refreshToken) return null;

    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_API_URL}/accounts/refresh-token/`,
      { refresh: refreshToken }
    );

    if (response.data?.access) {
      await SecureStore.setItemAsync(TOKEN_KEY, response.data.access);
      return response.data.access;
    }
    return null;
  } catch (error) {
    console.error('Error refreshing token:', error);
    await clearTokens();
    return null;
  }
};

// Request interceptor to add token
API.interceptors.request.use(
  async (
    config: InternalAxiosRequestConfig
  ): Promise<InternalAxiosRequestConfig> => {
    const token = await getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// Response interceptor to handle token refresh
API.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const newToken = await refreshAccessToken();
      if (newToken) {
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return API(originalRequest);
      } else {
        // Redirect to login or handle auth failure
        await clearTokens();
      }
    }

    return Promise.reject(error);
  }
);

// Response handler
const handleResponse = <T = any>(res: AxiosResponse<T>): ApiResponse<T> => {
  return {
    success: true,
    status: res.status,
    data: res.data,
    message: (res.data as any)?.message || 'Success',
  };
};

const handleError = (err: AxiosError): ApiResponse => {
  const status = err.response?.status || 500;
  const message =
    (err.response?.data as any)?.message ||
    err.message ||
    'Something went wrong';
  const errorData = err.response?.data;

  return {
    success: false,
    status,
    data: null,
    message,
    error: errorData || err,
  };
};

const api = {
  get: async <T = any>(
    url: string,
    params: Record<string, any> = {}
  ): Promise<ApiResponse<T>> => {
    try {
      const res = await API.get<T>(url, { params });
      return handleResponse<T>(res);
    } catch (err) {
      return handleError(err as AxiosError);
    }
  },

  post: async <T = any>(
    url: string,
    data: any = {},
    config: any = {}
  ): Promise<ApiResponse<T>> => {
    try {
      const res = await API.post<T>(url, data, config);
      return handleResponse<T>(res);
    } catch (err) {
      return handleError(err as AxiosError);
    }
  },

  put: async <T = any>(
    url: string,
    data: any = {},
    config: any = {}
  ): Promise<ApiResponse<T>> => {
    try {
      const res = await API.put<T>(url, data, config);
      return handleResponse<T>(res);
    } catch (err) {
      return handleError(err as AxiosError);
    }
  },
  delete: async <T = any>(url: string): Promise<ApiResponse<T>> => {
    try {
      const res = await API.delete<T>(url);
      return handleResponse<T>(res);
    } catch (err) {
      return handleError(err as AxiosError);
    }
  },

  // Token management functions
  auth: {
    setTokens,
    clearTokens,
    getAccessToken,
    getRefreshToken,
  },
};

export default api;
