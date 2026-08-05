// 📁 src/components/ProductItem.tsx
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/core/entities/Product';

interface ProductItemProps {
  product: Product;
}

export default function ProductItem({ product }: ProductItemProps) {
  const { id, name, price, image, description, is_active, stock } = product;

  return (
    <Link href={`/store/${id}`} className="block group">
      <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col">
        {/* تصویر محصول */}
        <div className="relative w-full h-56 bg-gray-100">
          {image ? (
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400 text-sm">
              بدون تصویر
            </div>
          )}
          
          {/* نشان‌های وضعیت */}
          {!is_active && (
            <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              غیرفعال
            </span>
          )}
          {stock === 0 && is_active && (
            <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
              ناموجود
            </span>
          )}
        </div>

        {/* اطلاعات محصول */}
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="font-bold text-lg text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-1">
            {name}
          </h3>
          
          {description && (
            <p className="text-gray-500 text-sm mt-1 line-clamp-2 flex-grow">
              {description}
            </p>
          )}

          <div className="mt-3 flex items-center justify-between">
            <span className="text-xl font-bold text-green-600">
              {Number(price).toLocaleString()} تومان
            </span>
            <span className="text-sm text-gray-400">
              {stock !== undefined && stock > 0 ? `${stock} عدد` : ''}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}