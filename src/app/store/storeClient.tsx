// src/app/store/StoreClient.tsx
'use client';

import { useState, useMemo } from 'react';
import { Product } from '@/core/entities/Product';
import ProductCard from '@/components/ProductCard';
import ProductFilters from '@/components/ProductFilters';
import ProductSearch from '@/components/ProductSearch';

interface StoreClientProps {
  initialProducts: Product[];
}

export default function StoreClient({ initialProducts }: StoreClientProps) {
  const [products] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // فیلتر و جستجو
  const filteredProducts = useMemo(() => {
    let result = products;

    // جستجو بر اساس نام و توضیحات
    if (searchTerm) {
      result = result.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // فیلتر بر اساس دسته‌بندی (اگر دسته‌بندی دارید)
    if (selectedCategory !== 'all') {
      // result = result.filter(product => product.category === selectedCategory);
    }

    // مرتب‌سازی
    switch (sortBy) {
      case 'price-asc':
        result = [...result].sort((a, b) => Number(a.price) - Number(b.price));
        break;
      case 'price-desc':
        result = [...result].sort((a, b) => Number(b.price) - Number(a.price));
        break;
      case 'name':
        result = [...result].sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return result;
  }, [products, searchTerm, selectedCategory, sortBy]);

  // صفحه‌بندی
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredProducts.slice(start, end);
  }, [filteredProducts, currentPage]);

  return (
    <div>
      {/* سرچ و فیلترها */}
      <div className="mb-8 space-y-4">
        <ProductSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        
        <div className="flex flex-wrap gap-4">
          <ProductFilters
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
        </div>
        
        <div className="text-sm text-gray-600">
          {filteredProducts.length} محصول یافت شد
        </div>
      </div>

      {/* لیست محصولات */}
      {paginatedProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">هیچ محصولی یافت نشد</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* صفحه‌بندی */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border rounded disabled:opacity-50"
                >
                  قبلی
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 py-2 border rounded ${
                      currentPage === page
                        ? 'bg-blue-600 text-white'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border rounded disabled:opacity-50"
                >
                  بعدی
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}