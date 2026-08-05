// 📁 src/context/ShoppingCartContext.tsx
'use client';

import { createContext, useState, useContext, useMemo, useCallback } from 'react';
import { Product } from '@/core/entities/Product';

// ============================================
// تایپ‌ها
// ============================================

type ShoppingCartContextProviderProps = {
  children: React.ReactNode;
};

export interface CartItem {
  id: number;
  quantity: number;
  product?: Product; // اطلاعات کامل محصول (اختیاری)
}

interface ShoppingCartContextType {
  // حالت‌ها
  cartItems: CartItem[];
  totalItems: number;
  totalPrice: number;
  isEmpty: boolean;

  // عملیات‌ها
  addItem: (productId: number) => void;
  removeItem: (productId: number) => void;
  deleteItem: (productId: number) => void;
  getItemQuantity: (productId: number) => number;
  clearCart: () => void;
  isInCart: (productId: number) => boolean;
}

// ============================================
// Context
// ============================================

const ShoppingCartContext = createContext<ShoppingCartContextType | undefined>(
  undefined
);

// ============================================
// Provider
// ============================================

export function ShoppingCartContextProvider({
  children,
}: ShoppingCartContextProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // ---------- عملیات‌های اصلی ----------

  const addItem = useCallback((id: number) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === id);

      if (!existingItem) {
        return [...prevItems, { id, quantity: 1 }];
      }

      return prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    });
  }, []);

  const removeItem = useCallback((id: number) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === id);

      if (!existingItem) return prevItems;

      if (existingItem.quantity === 1) {
        return prevItems.filter((item) => item.id !== id);
      }

      return prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    });
  }, []);

  const deleteItem = useCallback((id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  // ---------- توابع کمکی ----------

  const getItemQuantity = useCallback(
    (id: number) => {
      const item = cartItems.find((item) => item.id === id);
      return item?.quantity ?? 0;
    },
    [cartItems]
  );

  const isInCart = useCallback(
    (id: number) => {
      return cartItems.some((item) => item.id === id);
    },
    [cartItems]
  );

  // ---------- مقادیر محاسبه‌شده ----------

  const totalItems = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);

  const totalPrice = useMemo(() => {
    // اگر محصولات کامل در context ذخیره شوند
    // فعلاً فقط تعداد را محاسبه می‌کنیم
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);

  const isEmpty = useMemo(() => {
    return cartItems.length === 0;
  }, [cartItems]);

  // ============================================
  // مقدار Context
  // ============================================

  const value = useMemo(
    () => ({
      cartItems,
      totalItems,
      totalPrice,
      isEmpty,
      addItem,
      removeItem,
      deleteItem,
      getItemQuantity,
      clearCart,
      isInCart,
    }),
    [
      cartItems,
      totalItems,
      totalPrice,
      isEmpty,
      addItem,
      removeItem,
      deleteItem,
      getItemQuantity,
      clearCart,
      isInCart,
    ]
  );

  return (
    <ShoppingCartContext.Provider value={value}>
      {children}
    </ShoppingCartContext.Provider>
  );
}

// ============================================
// Hook سفارشی
// ============================================

export function useShoppingCart() {
  const context = useContext(ShoppingCartContext);

  if (context === undefined) {
    throw new Error(
      'useShoppingCart must be used within a ShoppingCartContextProvider'
    );
  }

  return context;
}

// ============================================
// نام مستعار برای سازگاری با کدهای قبلی
// ============================================

// برای سازگاری با کدهایی که از نام قبلی استفاده می‌کنند
export const useShoppingCartContext = useShoppingCart;