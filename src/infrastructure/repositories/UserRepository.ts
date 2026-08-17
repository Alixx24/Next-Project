// 📁 src/infrastructure/repositories/UserRepository.ts
import { IUserRepository, DeleteUserRepositoryResult } from '@/core/interfaces/IUserRepository';
import { User, CreateUserDTO, UpdateUserDTO } from '@/core/entities/User';
import { LaravelApiClient } from '@/infrastructure/api/laravel-api';

// 📦 تعریف ساختار پاسخ Laravel
interface LaravelPaginatedResponse<T> {
  data: T[];
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
}

export class UserRepository implements IUserRepository {
  private apiClient: LaravelApiClient;

  constructor() {
    this.apiClient = new LaravelApiClient();
  }

  async getAll(): Promise<User[]> {
    try {
      // ✅ دریافت پاسخ با ساختار صحیح
      const response = await this.apiClient.get<LaravelPaginatedResponse<User>>('/users');
      
      // ✅ کاربران درون response.data.data هستند!
      return response.data?.data || [];
    } catch (error) {
      console.error('❌ خطا در دریافت همه کاربران:', error);
      return [];
    }
  }

  async getById(id: number): Promise<User | null> {
    try {
      const response = await this.apiClient.get<User>(`/users/${id}`);
      return response.data || null;
    } catch (error) {
      console.error(`❌ خطا در دریافت کاربر ${id}:`, error);
      return null;
    }
  }

  async create(user: CreateUserDTO): Promise<User> {
    try {
      const response = await this.apiClient.post<User>('/users', user);
      return response.data;
    } catch (error) {
      console.error('❌ خطا در ایجاد کاربر:', error);
      throw error;
    }
  }

  async update(id: number, user: UpdateUserDTO): Promise<User | null> {
    try {
      const response = await this.apiClient.put<User>(`/users/${id}`, user);
      return response.data;
    } catch (error) {
      console.error(`❌ خطا در ویرایش کاربر ${id}:`, error);
      return null;
    }
  }

  async delete(id: number): Promise<DeleteUserRepositoryResult> {
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.error || 'حذف کاربر با خطا مواجه شد',
          statusCode: data.statusCode ?? response.status,
        };
      }

      return {
        success: true,
        method: data.method,
      };
    } catch (error) {
      console.error(`❌ خطا در حذف کاربر ${id}:`, error);
      return {
        success: false,
        error: 'اتصال به سرور برقرار نشد',
      };
    }
  }

  async getByRole(role: User['role']): Promise<User[]> {
    try {
      const response = await this.apiClient.get<LaravelPaginatedResponse<User>>(`/users/role/${role}`);
      return response.data?.data || [];
    } catch (error) {
      console.error(`❌ خطا در دریافت کاربران با نقش ${role}:`, error);
      return [];
    }
  }

  async getActiveUsers(): Promise<User[]> {
    try {
      const response = await this.apiClient.get<LaravelPaginatedResponse<User>>('/users/active');
      return response.data?.data || [];
    } catch (error) {
      console.error('❌ خطا در دریافت کاربران فعال:', error);
      return [];
    }
  }

  async searchUsers(query: string): Promise<User[]> {
    try {
      const response = await this.apiClient.get<LaravelPaginatedResponse<User>>(
        `/users/search?q=${encodeURIComponent(query)}`
      );
      return response.data?.data || [];
    } catch (error) {
      console.error(`❌ خطا در جستجوی کاربران با ${query}:`, error);
      return [];
    }
  }

  async getUsersWithPagination(page: number, limit: number): Promise<{ users: User[]; total: number }> {
    try {
      const response = await this.apiClient.get<LaravelPaginatedResponse<User>>(
        `/users?page=${page}&per_page=${limit}`
      );
      return {
        users: response.data?.data || [],
        total: response.data?.meta?.total || 0
      };
    } catch (error) {
      console.error('❌ خطا در دریافت کاربران با صفحه‌بندی:', error);
      return { users: [], total: 0 };
    }
  }
}