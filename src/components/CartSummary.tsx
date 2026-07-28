// 📁 src/components/CartSummary.tsx
"use client"

import { useShoppingCartContext } from "@/context/ShoppingCartContext";

export default function CartSummary() {
  const { cartItems } = useShoppingCartContext();
  
  const totalItems = cartItems.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.qty * 20), 0); 
  
  return (
    <div className="border shadow-md text-right p-4 rounded-lg h-fit sticky top-4">
      <h3 className="font-bold text-lg mb-2">خلاصه سبد خرید</h3>
      <p>تعداد آیتم‌ها: {totalItems}</p>
      <p>مجموع قیمت: {totalPrice}$</p>
      <button 
        className="w-full mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={cartItems.length === 0}
      >
        ثبت سفارش
      </button>
    </div>
  );
}