// 📁 src/app/store/[id]/ProductDetail.tsx
'use client';

import { Product } from '@/core/entities/Product';
import Image from 'next/image';
import Link from 'next/link';
import { useShoppingCart } from '@/context/ShoppingCartContext';
import { useState } from 'react';

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const { addToCart } = useShoppingCart();
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 3000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* دکمه بازگشت */}
      <Link 
        href="/store" 
        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        بازگشت به فروشگاه
      </Link>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
          {/* تصویر محصول */}
          <div className="relative h-96 bg-gray-100 rounded-lg">
            {product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                <div className="text-center">
                  <svg className="w-20 h-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p>بدون تصویر</p>
                </div>
              </div>
            )}
          </div>

          {/* اطلاعات محصول */}
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-4 mb-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                product.is_active 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {product.is_active ? '✓ فعال' : '✗ غیرفعال'}
              </span>
              <span className="text-gray-500 text-sm">
                موجودی: {product.stock ?? 'نامحدود'}
              </span>
            </div>

            {product.description && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">توضیحات:</h3>
                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}

            {/* قیمت */}
            <div className="border-t border-b py-4 my-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">قیمت:</span>
                <span className="text-3xl font-bold text-green-600">
                  {Number(product.price).toLocaleString()} تومان
                </span>
              </div>
            </div>

            {/* انتخاب تعداد */}
            <div className="flex items-center gap-4 mb-6">
              <label className="text-gray-700 font-medium">تعداد:</label>
              <div className="flex items-center border rounded-lg overflow-hidden">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 transition-colors"
                  disabled={!product.is_active}
                >
                  -
                </button>
                <span className="px-6 py-2 min-w-[60px] text-center font-medium">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 transition-colors"
                  disabled={!product.is_active}
                >
                  +
                </button>
              </div>
            </div>

            {/* دکمه افزودن به سبد خرید */}
            <button
              onClick={handleAddToCart}
              disabled={!product.is_active || product.stock === 0}
              className={`w-full py-4 rounded-lg text-white font-bold text-lg transition-all duration-300 ${
                product.is_active && product.stock !== 0
                  ? 'bg-blue-600 hover:bg-blue-700 active:scale-95'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              {!product.is_active
                ? 'محصول غیرفعال است'
                : product.stock === 0
                ? 'ناموجود'
                : addedToCart
                ? '✓ افزوده شد!'
                : 'افزودن به سبد خرید'}
            </button>

            {addedToCart && (
              <div className="mt-3 p-3 bg-green-100 text-green-700 rounded-lg text-center animate-pulse">
                ✅ محصول با موفقیت به سبد خرید اضافه شد!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}