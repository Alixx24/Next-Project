import { User, CreateUserDTO, UpdateUserDTO } from '@/core/entities/User';

export type DeleteUserRepositoryResult = {
  success: boolean;
  method?: 'hard' | 'soft';
  error?: string;
  statusCode?: number;
};

export interface IUserRepository {
  // عملیات اصلی
  getAll(): Promise<User[]>;
  getById(id: number): Promise<User | null>;
  create(user: CreateUserDTO): Promise<User>;
  update(id: number, user: UpdateUserDTO): Promise<User | null>;
  delete(id: number): Promise<DeleteUserRepositoryResult>;
  
  // فیلترها
  getByRole(role: User['role']): Promise<User[]>;
  getActiveUsers(): Promise<User[]>;
  searchUsers(query: string): Promise<User[]>;
  getUsersWithPagination(page: number, limit: number): Promise<{ users: User[]; total: number }>;
}