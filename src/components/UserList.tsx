'use client';

import { User } from '@/core/entities/User';
import UserCard from './UserCard';
import UserItem from './UserItem';
import { useState } from 'react';

interface UserListProps {
  users: User[];
  viewMode?: 'grid' | 'list';
  showActions?: boolean;
  onEdit?: (user: User) => void;
  onDelete?: (user: User) => void;
}

export default function UserList({ 
  users, 
  viewMode = 'grid',
  showActions = false,
  onEdit,
  onDelete 
}: UserListProps) {
  const [currentView, setCurrentView] = useState<'grid' | 'list'>(viewMode);

  if (!users || users.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-2xl">
        <p className="text-gray-500">👤 هیچ کاربری یافت نشد</p>
      </div>
    );
  }

  return (
    <div>
      {/* کنترل‌های نمایش */}
      <div className="flex justify-end gap-2 mb-4">
        <button
          onClick={() => setCurrentView('grid')}
          className={`px-3 py-1 rounded-lg text-sm transition-colors ${
            currentView === 'grid' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
          }`}
        >
          📊 کارتی
        </button>
        <button
          onClick={() => setCurrentView('list')}
          className={`px-3 py-1 rounded-lg text-sm transition-colors ${
            currentView === 'list' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
          }`}
        >
          📋 لیستی
        </button>
      </div>

      {/* نمایش کاربران */}
      {currentView === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {users.map((user) => (
            <UserCard 
              key={user.id} 
              user={user} 
              showActions={showActions}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden divide-y divide-gray-100">
          {users.map((user) => (
            <UserItem key={user.id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
}