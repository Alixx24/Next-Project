'use client';

import Container from '@/components/Container';
import ConfirmDialog from '@/components/ConfirmDialog';
import UserList from '@/components/UserList';
import { User } from '@/core/entities/User';
import GetUsersUseCase from '@/core/use-cases/GetUsersUseCase';
import DeleteUserUseCase from '@/core/use-cases/DeleteUserUseCase';
import { UserRepositoryFactory } from '@/infrastructure/repositories/UserRepositoryFactory';
import { useEffect, useState } from 'react';

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingUserId, setDeletingUserId] = useState<number | null>(null);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadUsers() {
      setLoading(true);

      try {
        const repository = UserRepositoryFactory.create();
        const useCase = new GetUsersUseCase(repository);
        const result = await useCase.execute();

        if (isMounted) {
          setUsers(result.success ? result.data || [] : []);
        }
      } catch (error) {
        console.error('❌ خطا در دریافت کاربران:', error);

        if (isMounted) {
          setUsers([]);
          setFeedback({
            type: 'error',
            message: 'دریافت لیست کاربران با خطا مواجه شد',
          });
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadUsers();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!feedback) return;

    const timer = setTimeout(() => setFeedback(null), 4000);
    return () => clearTimeout(timer);
  }, [feedback]);

  const handleEdit = (user: User) => {
    console.log('✏️ ویرایش کاربر:', user);
  };

  const handleDeleteRequest = (user: User) => {
    setUserToDelete(user);
  };

  const handleDeleteCancel = () => {
    if (deletingUserId !== null) return;
    setUserToDelete(null);
  };

  const handleDeleteConfirm = async () => {
    if (!userToDelete) return;

    setDeletingUserId(userToDelete.id);

    try {
      const repository = UserRepositoryFactory.create();
      const useCase = new DeleteUserUseCase(repository);
      const result = await useCase.execute(userToDelete.id);

      if (!result.success) {
        setFeedback({
          type: 'error',
          message: result.error || 'حذف کاربر انجام نشد',
        });
        return;
      }

      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userToDelete.id));
      setFeedback({
        type: 'success',
        message: `کاربر «${userToDelete.name}» با موفقیت حذف شد`,
      });
      setUserToDelete(null);
    } catch (error) {
      console.error('❌ خطا در حذف کاربر:', error);
      setFeedback({
        type: 'error',
        message: 'حذف کاربر با خطا مواجه شد',
      });
    } finally {
      setDeletingUserId(null);
    }
  };

  if (loading) {
    return (
      <Container>
        <div className="text-center py-12">⏳ در حال بارگذاری...</div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="flex justify-between items-center py-6 border-b mb-6">
        <h1 className="text-2xl font-bold text-gray-800">👥 مدیریت کاربران</h1>
        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
          {users.length} کاربر
        </span>
      </div>

      {feedback && (
        <div
          className={`mb-4 rounded-xl px-4 py-3 text-sm ${
            feedback.type === 'success'
              ? 'bg-green-50 text-green-700 border border-green-200'
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}
        >
          {feedback.message}
        </div>
      )}

      <UserList
        users={users}
        viewMode="grid"
        showActions
        onEdit={handleEdit}
        onDelete={handleDeleteRequest}
        deletingUserId={deletingUserId}
      />

      <ConfirmDialog
        isOpen={userToDelete !== null}
        title="حذف کاربر"
        message={
          userToDelete
            ? `آیا از حذف کاربر «${userToDelete.name}» مطمئن هستید؟ این عملیات قابل بازگشت نیست.`
            : ''
        }
        confirmLabel="حذف"
        isLoading={deletingUserId !== null}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </Container>
  );
}
