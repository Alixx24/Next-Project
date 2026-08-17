'use client';

import { User } from '@/core/entities/User';
import Image from 'next/image';
import Link from 'next/link';
import { FaUser, FaEnvelope, FaPhone, FaUserTag, FaCircle } from 'react-icons/fa';

interface UserCardProps {
  user: User;
  showActions?: boolean;
  isDeleting?: boolean;
  onEdit?: (user: User) => void;
  onDelete?: (user: User) => void;
}

const roleColors = {
  admin: 'bg-red-100 text-red-700 border-red-300',
  user: 'bg-blue-100 text-blue-700 border-blue-300',
  guest: 'bg-gray-100 text-gray-700 border-gray-300',
};

const roleLabels = {
  admin: 'مدیر',
  user: 'کاربر',
  guest: 'میهمان',
};

export default function UserCard({ 
  user, 
  showActions = false,
  isDeleting = false,
  onEdit,
  onDelete 
}: UserCardProps) {
  const { id, name, email, phone, role, is_active, avatar, last_login } = user;

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200 group">
      {/* هدر با آواتار و وضعیت */}
      <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 h-24">
        <div className="absolute -bottom-12 left-4">
          <div className="relative">
            {avatar ? (
              <Image
                src={avatar}
                alt={name}
                width={72}
                height={72}
                className="rounded-full border-4 border-white shadow-lg"
              />
            ) : (
              <div className="w-[72px] h-[72px] rounded-full border-4 border-white shadow-lg bg-gray-300 flex items-center justify-center">
                <FaUser className="text-gray-500 text-2xl" />
              </div>
            )}
            {/* نشان وضعیت */}
            <span className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white ${
              is_active ? 'bg-green-500' : 'bg-red-500'
            }`} />
          </div>
        </div>
      </div>

      {/* محتوای کارت */}
      <div className="pt-14 px-4 pb-4">
        {/* نام و نقش */}
        <div className="flex justify-between items-start">
          <div>
            <Link href={`/users/${id}`}>
              <h3 className="font-bold text-lg text-gray-800 hover:text-blue-600 transition-colors">
                {name}
              </h3>
            </Link>
            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${roleColors[role]}`}>
              <FaUserTag className="text-xs" />
              {roleLabels[role]}
            </span>
          </div>
          
          {/* تاریخ آخرین ورود */}
          {last_login && (
            <span className="text-xs text-gray-400">
              آخرین ورود: {new Date(last_login).toLocaleDateString('fa-IR')}
            </span>
          )}
        </div>

        {/* اطلاعات تماس */}
        <div className="mt-3 space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <FaEnvelope className="text-blue-500" />
            <span className="truncate">{email}</span>
          </div>
          {phone && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <FaPhone className="text-blue-500" />
              <span>{phone}</span>
            </div>
          )}
        </div>

        {/* دکمه‌های عملیات */}
        {showActions && (
          <div className="mt-4 flex gap-2 pt-3 border-t border-gray-200">
            <button
              type="button"
              onClick={() => onEdit?.(user)}
              disabled={isDeleting}
              className="flex-1 bg-blue-500 text-white px-3 py-1.5 rounded-lg hover:bg-blue-600 transition-colors text-sm disabled:cursor-not-allowed disabled:opacity-50"
            >
              ویرایش
            </button>
            <button
              type="button"
              onClick={() => onDelete?.(user)}
              disabled={isDeleting}
              className="flex-1 bg-red-500 text-white px-3 py-1.5 rounded-lg hover:bg-red-600 transition-colors text-sm disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isDeleting ? 'در حال حذف...' : 'حذف'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}