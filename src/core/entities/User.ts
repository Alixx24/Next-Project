// 📁 src/core/entities/User.ts

/**
 * موجودیت (Entity) کاربر در سیستم
 * این فایل مشخص می‌کند که یک کاربر چه ویژگی‌هایی دارد
 */

export interface User {
  // ============ اطلاعات اصلی ============
  /** شناسه یکتا (ID) - اجباری */
  id: number;
  
  /** نام کامل کاربر - اجباری */
  name: string;
  
  /** ایمیل کاربر - اجباری و یکتا */
  email: string;
  
  /** شماره تلفن - اختیاری */
  phone?: string;
  
  /** آدرس - اختیاری */
  address?: string;
  
  /** نقش کاربر در سیستم - اجباری */
  role: 'admin' | 'user' | 'guest';
  
  /** وضعیت فعال/غیرفعال بودن حساب - اجباری */
  is_active: boolean;
  
  // ============ اطلاعات تکمیلی ============
  /** آدرس تصویر پروفایل - اختیاری */
  avatar?: string;
  
  /** تاریخ آخرین ورود - اختیاری */
  last_login?: string;
  
  /** تاریخ ایجاد (ثبت‌نام) - اختیاری (دیتابیس خودش می‌سازد) */
  created_at?: string;
  
  /** تاریخ آخرین ویرایش - اختیاری (دیتابیس خودش مدیریت می‌کند) */
  updated_at?: string;
  
  // ============ اطلاعات امنیتی (اختیاری) ============
  /** آیا ایمیل تأیید شده است؟ - اختیاری */
  email_verified_at?: string | null;
  
  /** توکن یادآوری رمز عبور - اختیاری */
  remember_token?: string | null;
}

// ============================================
// 📦 DTOها (Data Transfer Objects)
// برای انتقال داده بین لایه‌ها
// ============================================

/**
 * برای ایجاد کاربر جدید (ثبت‌نام)
 * ✅ این موارد را کاربر وارد می‌کند
 * ❌ id, created_at, updated_at را دیتابیس می‌سازد
 */
export type CreateUserDTO = Omit<User, 'id' | 'created_at' | 'updated_at'>;

/**
 * برای ویرایش کاربر
 * ✅ همه فیلدها اختیاری هستند
 * ✅ فقط فیلدهایی که می‌خواهیم تغییر دهیم را می‌فرستیم
 */
export type UpdateUserDTO = Partial<Omit<User, 'id' | 'created_at' | 'updated_at'>>;

/**
 * برای لاگین کاربر
 * فقط ایمیل و رمز عبور نیاز است
 */
export type LoginUserDTO = {
  email: string;
  password: string;
};

/**
 * برای ثبت‌نام کاربر
 * اطلاعات ضروری برای ثبت‌نام
 */
export type RegisterUserDTO = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  phone?: string;
};

// ============================================
// 🎯 Constants و Helpers
// ============================================

/** لیست نقش‌های مجاز */
export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
  GUEST: 'guest',
} as const;

/** لیبل (برچسب) نقش‌ها برای نمایش */
export const USER_ROLE_LABELS: Record<User['role'], string> = {
  admin: 'مدیر',
  user: 'کاربر',
  guest: 'میهمان',
};

/** رنگ نقش‌ها برای UI */
export const USER_ROLE_COLORS: Record<User['role'], string> = {
  admin: 'bg-red-100 text-red-700 border-red-300',
  user: 'bg-blue-100 text-blue-700 border-blue-300',
  guest: 'bg-gray-100 text-gray-700 border-gray-300',
};

/** ایموجی نقش‌ها برای UI */
export const USER_ROLE_EMOJIS: Record<User['role'], string> = {
  admin: '👑',
  user: '👤',
  guest: '🚶',
};

// ============================================
// 🛠️ توابع کمکی (Utility Functions)
// ============================================

/**
 * بررسی می‌کند که آیا کاربر مدیر است؟
 */
export function isAdmin(user: User): boolean {
  return user.role === 'admin';
}

/**
 * بررسی می‌کند که آیا کاربر فعال است؟
 */
export function isActive(user: User): boolean {
  return user.is_active;
}

/**
 * بررسی می‌کند که آیا کاربر می‌تواند وارد سیستم شود؟
 * (فعال باشد و نقش معتبر داشته باشد)
 */
export function canLogin(user: User): boolean {
  return user.is_active && user.role !== 'guest';
}

/**
 * دریافت نام کامل نمایشی کاربر
 */
export function getDisplayName(user: User): string {
  return user.name || user.email;
}

/**
 * دریافت حرف اول نام کاربر برای آواتار
 */
export function getInitials(user: User): string {
  return user.name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

/**
 * آیا کاربر پروفایل کامل دارد؟
 */
export function hasCompleteProfile(user: User): boolean {
  return !!(user.name && user.email && user.phone);
}

/**
 * گرفتن تاریخ به فرمت فارسی
 */
export function getPersianDate(dateString?: string): string {
  if (!dateString) return '-';
  return new Date(dateString).toLocaleDateString('fa-IR');
}

/**
 * گرفتن تاریخ به فرمت کامل فارسی با ساعت
 */
export function getPersianDateTime(dateString?: string): string {
  if (!dateString) return '-';
  return new Date(dateString).toLocaleString('fa-IR');
}