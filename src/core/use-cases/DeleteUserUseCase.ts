import { IUserRepository } from '@/core/interfaces/IUserRepository';

export type DeleteUserResult = {
  success: boolean;
  error?: string;
};

export default class DeleteUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(id: number): Promise<DeleteUserResult> {
    if (!id || id <= 0) {
      return {
        success: false,
        error: 'شناسه کاربر نامعتبر است',
      };
    }

    try {
      const existingUser = await this.userRepository.getById(id);

      if (!existingUser) {
        return {
          success: false,
          error: 'کاربر مورد نظر یافت نشد',
        };
      }

      if (existingUser.role === 'admin') {
        return {
          success: false,
          error: 'حذف کاربران مدیر مجاز نیست',
        };
      }

      const deleted = await this.userRepository.delete(id);

      if (!deleted) {
        return {
          success: false,
          error: 'حذف کاربر با خطا مواجه شد',
        };
      }

      return { success: true };
    } catch (error) {
      console.error(`❌ خطا در DeleteUserUseCase برای کاربر ${id}:`, error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'خطای ناشناخته در حذف کاربر',
      };
    }
  }
}
