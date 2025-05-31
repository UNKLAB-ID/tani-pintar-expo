import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';

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
  headers: {}
});

// Interceptor (misalnya untuk token)
API.interceptors.request.use(
    async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
      // const token = await AsyncStorage.getItem('token');
      // if (token) {
      //   config.headers = {
      //     ...config.headers,
      //     Authorization: `Bearer ${token}`,
      //   };
      // }
      return config;
    },
    (error: AxiosError) => Promise.reject(error)
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
  const message =(err.response?.data as any)?.message || err.message || 'Something went wrong';
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
  get: async <T = any>(url: string, params: Record<string, any> = {}): Promise<ApiResponse<T>> => {
    try {
      const res = await API.get<T>(url, { params });
      return handleResponse<T>(res);
    } catch (err) {
      return handleError(err as AxiosError);
    }
  },

  post: async <T = any>(url: string, data: any = {}, config: any = {}): Promise<ApiResponse<T>> => {
    try {
      const res = await API.post<T>(url, data, config);
      return handleResponse<T>(res);
    } catch (err) {
      return handleError(err as AxiosError);
    }
  },  

  put: async <T = any>(url: string, data: any = {}, config: any = {}): Promise<ApiResponse<T>> => {
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
};

export default api;
