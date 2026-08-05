// src/components/ProductCard.tsx
'use client';

import { Product } from '@/core/entities/Product';
import Image from 'next/image';
import Link from 'next/link';
import { useShoppingCart } from '@/context/ShoppingCartContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useShoppingCart();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* تصویر محصول */}
      <div className="relative h-48 bg-gray-200">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            بدون تصویر
          </div>
        )}
        {product.is_active === 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs">
            غیرفعال
          </div>
        )}
      </div>

      {/* اطلاعات محصول */}
      <div className="p-4">
        <Link href={`/product/${product.id}`}>
          <h3 className="text-lg font-semibold hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-gray-600 text-sm mt-1 line-clamp-2">
          {product.description || 'توضیحاتی موجود نیست'}
        </p>
        
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xl font-bold text-green-600">
            {Number(product.price).toLocaleString()} تومان
          </span>
          <span className="text-sm text-gray-500">
            موجودی: {product.stock ?? 0}
          </span>
        </div>

        <button
          onClick={() => addToCart(product)}
          disabled={!product.is_active || product.stock === 0}
          className={`mt-4 w-full py-2 rounded transition-colors ${
            product.is_active && product.stock !== 0
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {!product.is_active
            ? 'غیرفعال'
            : product.stock === 0
            ? 'ناموجود'
            : 'افزودن به سبد خرید'}
        </button>
      </div>
    </div>
  );
}