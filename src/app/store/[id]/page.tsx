// 📁 src/app/store/[id]/page.tsx
import { ProductRepositoryFactory } from '@/infrastructure/repositories/ProductRepositoryFactory';
import { GetProductsUseCase } from '@/core/use-cases/GetProductsUseCase';
import { Product } from '@/core/entities/Product';
import ProductDetail from './ProductDetail';
import { notFound } from 'next/navigation';

// ✅ دریافت محصول با استفاده از ریپازیتوری
async function getProduct(id: string): Promise<Product | null> {
  try {
    console.log(`🔍 جستجوی محصول با id: ${id}`);
    
    const repository = ProductRepositoryFactory.create();
    const useCase = new GetProductsUseCase(repository);
    const products = await useCase.execute();
    
    const product = products.find(p => p.id === Number(id));
    
    if (!product) {
      console.warn(`⚠️ محصول با id ${id} یافت نشد`);
      return null;
    }
    
    return product;
  } catch (error) {
    console.error('❌ خطا در دریافت محصول:', error);
    return null;
  }
}

// ✅ راه‌حل اصلی: استفاده از await برای params
export default async function ProductPage({ 
  params 
}: { 
  params: Promise<{ id: string }>  // ✅ توجه: params یک Promise است
}) {
  // ✅ باید از await استفاده کنیم
  const { id } = await params;
  
  console.log(`📄 دریافت صفحه محصول با id: ${id}`);
  
  if (!id) {
    console.error('❌ id در params وجود ندارد');
    notFound();
  }
  
  const product = await getProduct(id);
  
  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}