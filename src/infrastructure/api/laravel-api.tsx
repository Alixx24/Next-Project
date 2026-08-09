// src/infrastructure/api/laravel-api.ts
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export class LaravelApiClient {
  private client: AxiosInstance;

  constructor(baseURL: string = process.env.LARAVEL_API_URL || 'http://127.0.0.1:8000/api') {
    this.client = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    // اینترسپتور برای مدیریت خطاها
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        // مدیریت خطاهای API
        if (error.response?.status === 401) {
          // هدایت به لاگین
        }
        return Promise.reject(error);
      }
    );
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<{ data: T }> {
    const response = await this.client.get<T>(url, config);
    return { data: response.data };
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<{ data: T }> {
    const response = await this.client.post<T>(url, data, config);
    return { data: response.data };
  }

   // اضافه کنید به کلاس LaravelApiClient

async delete<T>(url: string, config?: AxiosRequestConfig): Promise<{ data: T }> {
  const response = await this.client.delete<T>(url, config);
  return { data: response.data };
}

async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<{ data: T }> {
  const response = await this.client.put<T>(url, data, config);
  return { data: response.data };
}

async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<{ data: T }> {
  const response = await this.client.patch<T>(url, data, config);
  return { data: response.data };
}
}