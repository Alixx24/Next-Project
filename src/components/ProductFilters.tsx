// src/components/ProductFilters.tsx
'use client';

interface ProductFiltersProps {
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
}

export default function ProductFilters({
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
}: ProductFiltersProps) {
  // اگر دسته‌بندی در دیتابیس دارید، این لیست را از API دریافت کنید
  const categories = [
    { id: 'all', name: 'همه محصولات' },
    { id: 'electronics', name: 'الکترونیک' },
    { id: 'clothing', name: 'پوشاک' },
    { id: 'books', name: 'کتاب' },
  ];

  const sortOptions = [
    { id: 'default', name: 'پیش‌فرض' },
    { id: 'price-asc', name: 'قیمت: کم به زیاد' },
    { id: 'price-desc', name: 'قیمت: زیاد به کم' },
    { id: 'name', name: 'نام' },
  ];

  return (
    <div className="flex flex-wrap gap-4">
      {/* فیلتر دسته‌بندی */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-lg border transition-colors ${
              selectedCategory === category.id
                ? 'bg-blue-600 text-white border-blue-600'
                : 'hover:bg-gray-100'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* مرتب‌سازی */}
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {sortOptions.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}