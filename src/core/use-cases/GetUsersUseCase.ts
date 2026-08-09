// 📁 src/core/use-cases/GetUsersUseCase.ts
import { IUserRepository } from '@/core/interfaces/IUserRepository';
import { User } from '@/core/entities/User';

export type GetUsersResult = {
  success: boolean;
  data?: User[];
  error?: string;
  total?: number;
};

// ✅ استفاده از export default
export default class GetUsersUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(): Promise<GetUsersResult> {
    try {
      const users = await this.userRepository.getAll();
      return {
        success: true,
        data: Array.isArray(users) ? users : [],
        total: users.length
      };
    } catch (error) {
      console.error('❌ خطا در دریافت کاربران:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'خطا در دریافت کاربران',
        data: []
      };
    }
  }
}