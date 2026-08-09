export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  role: 'admin' | 'user' | 'guest';
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
  avatar?: string;
  last_login?: string;
}

// برای ایجاد کاربر جدید (بدون id)
export type CreateUserDTO = Omit<User, 'id' | 'created_at' | 'updated_at'>;

// برای ویرایش کاربر
export type UpdateUserDTO = Partial<Omit<User, 'id' | 'created_at' | 'updated_at'>>;