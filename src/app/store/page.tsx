// 📁 src/app/store/page.tsx (موقتاً برای دیباگ)
import Container from '@/components/Container';
import ProductItem from '@/components/ProductItem';
import { ProductRepositoryFactory } from '@/infrastructure/repositories/ProductRepositoryFactory';
import { GetProductsUseCase } from '@/core/use-cases/GetProductsUseCase';
import { Product } from '@/core/entities/Product';

async function fetchProducts(): Promise<Product[]> {
  try {
    const repository = ProductRepositoryFactory.create();
    const useCase = new GetProductsUseCase(repository);
    const result = await useCase.execute();
    
    // ✅ دیباگ: لاگ بگیرید
    console.log('📦 تعداد محصولات دریافتی:', result?.length);
    console.log('📦 اولین محصول:', result?.[0]);
    
    return Array.isArray(result) ? result : [];
  } catch (error) {
    console.error('❌ خطا در دریافت محصولات:', error);
    return [];
  }
}

export default async function Store() {
  const products = await fetchProducts();
  
  // ✅ دیباگ در صفحه
  console.log('📦 محصولات در صفحه:', products);
  
  return (
    <Container>
      <h1 className="text-right text-2xl font-bold py-6 border-b mb-6">
        🛍️ فروشگاه
      </h1>
      
      {/* ✅ نمایش تعداد محصولات برای دیباگ */}
      <div className="bg-yellow-100 p-2 mb-4 rounded text-center">
        تعداد محصولات: {products.length}
      </div>

      {products.length === 0 ? (
        <div className="text-center py-12 text-red-500">
          <p>⚠️ هیچ محصولی یافت نشد</p>
          <p className="text-sm text-gray-400">لطفاً اتصال به API را بررسی کنید</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      )}
    </Container>
  );
}