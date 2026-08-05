// src/components/CartList.tsx
import { Product } from "@/core/entities/Product";

export default function CartList({ products }: { products?: Product[] }) {
  if (!products || !Array.isArray(products) || products.length === 0) {
    return (
      <div className="text-gray-500 text-center p-8">
        <p>هیچ محصولی یافت نشد</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {products.map((product) => (
        <div key={product.id} className="border p-4 rounded-lg shadow-sm">
          <h3 className="font-bold text-lg">{product.name}</h3> {/* ← name */}
          <p className="text-green-600 font-semibold">
            {Number(product.price).toLocaleString()} تومان
          </p>
          {product.description && (
            <p className="text-gray-600 text-sm mt-1">{product.description}</p>
          )}
          <div className="mt-2 text-sm">
            <span className={`px-2 py-1 rounded ${product.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {product.is_active ? 'فعال' : 'غیرفعال'}
            </span>
            <span className="mr-2 text-gray-500">موجودی: {product.stock ?? 0}</span>
          </div>
        </div>
      ))}
    </div>
  );
}