'use client';

import { User } from '@/core/entities/User';
import Link from 'next/link';
import { FaUser, FaEnvelope, FaCircle } from 'react-icons/fa';

interface UserItemProps {
  user: User;
  compact?: boolean;
  showActions?: boolean;
  isDeleting?: boolean;
  onEdit?: (user: User) => void;
  onDelete?: (user: User) => void;
}

const roleColors = {
  admin: 'bg-red-500',
  user: 'bg-blue-500',
  guest: 'bg-gray-500',
};

export default function UserItem({
  user,
  compact = false,
  showActions = false,
  isDeleting = false,
  onEdit,
  onDelete,
}: UserItemProps) {
  const { id, name, email, role, is_active } = user;

  if (compact) {
    return (
      <Link href={`/users/${id}`}>
        <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors group">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center text-white font-bold">
            {name.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-gray-800 group-hover:text-blue-600 truncate">
              {name}
            </p>
            <p className="text-sm text-gray-500 truncate">{email}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
              {role}
            </span>
            <FaCircle className={`text-xs ${is_active ? 'text-green-500' : 'text-red-400'}`} />
          </div>
        </div>
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-4 p-4 hover:bg-blue-50 rounded-xl transition-all duration-300 border border-transparent hover:border-blue-200 group">
      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg ${roleColors[role]}`}>
        {name.charAt(0).toUpperCase()}
      </div>
      <div className="flex-1">
        <Link href={`/users/${id}`}>
          <h3 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
            {name}
          </h3>
        </Link>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <FaEnvelope className="text-xs" />
            {email}
          </span>
          <span className="flex items-center gap-1">
            <FaCircle className={`text-xs ${is_active ? 'text-green-500' : 'text-red-400'}`} />
            {is_active ? 'فعال' : 'غیرفعال'}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="text-sm text-gray-400 group-hover:text-blue-600 transition-colors">
          {role}
        </div>
        {showActions && (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => onEdit?.(user)}
              disabled={isDeleting}
              className="rounded-lg bg-blue-500 px-3 py-1.5 text-sm text-white transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              ویرایش
            </button>
            <button
              type="button"
              onClick={() => onDelete?.(user)}
              disabled={isDeleting}
              className="rounded-lg bg-red-500 px-3 py-1.5 text-sm text-white transition-colors hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isDeleting ? 'در حال حذف...' : 'حذف'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
