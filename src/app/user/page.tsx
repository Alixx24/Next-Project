// 📁 src/app/user/page.tsx
'use client';  // ✅ اضافه کردن این خط

import Container from '@/components/Container';
import UserList from '@/components/UserList';
import { User } from '@/core/entities/User';
import { useState, useEffect } from 'react';
import { UserRepositoryFactory } from '@/infrastructure/repositories/UserRepositoryFactory';
// ✅ اصلاح: حذف آکولاد برای import پیش‌فرض
import GetUsersUseCase from '@/core/use-cases/GetUsersUseCase';
export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  // دریافت کاربران در سمت کلاینت
  useEffect(() => {
    async function fetchUsers() {
      try {
        const repository = UserRepositoryFactory.create();
        const useCase = new GetUsersUseCase(repository);
        const result = await useCase.execute();
        setUsers(result.success ? (result.data || []) : []);
      } catch (error) {
        console.error('❌ خطا در دریافت کاربران:', error);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  // ✅ Event handlerها در کلاینت تعریف می‌شوند
  const handleEdit = (user: User) => {
    console.log('✏️ ویرایش کاربر:', user);
    // منطق ویرایش
  };

  const handleDelete = (user: User) => {
    console.log('🗑️ حذف کاربر:', user);
    // منطق حذف
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
      <UserList 
        users={users} 
        viewMode="grid" 
        showActions={true}
        onEdit={handleEdit}     // ✅ حالا درست کار می‌کند
        onDelete={handleDelete} // ✅ حالا درست کار می‌کند
      />
    </Container>
  );
}