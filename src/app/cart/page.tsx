// src/app/cart/page.tsx
import { ShoppingCartContextProvider } from "@/context/ShoppingCartContext";
import CartList from "@/components/CartList";
import CartSummary from "@/components/CartSummary";
import { ProductRepositoryFactory } from "@/infrastructure/repositories/ProductRepositoryFactory";
import { GetProductsUseCase } from "@/core/use-cases/GetProductsUseCase";
import { Product } from "@/core/entities/Product";

// تابع کمکی برای دریافت دیتا در سرور
async function fetchProducts(): Promise<Product[]> {
  try {
    const repository = ProductRepositoryFactory.create();
    const useCase = new GetProductsUseCase(repository);
    const result = await useCase.execute();
    return Array.isArray(result) ? result : [];
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return [];
  }
}

// ✅ این قسمت مهم است - کامپوننت اصلی با export default
export default async function CartPage() {
  const products = await fetchProducts();
  
  return (
    <ShoppingCartContextProvider>
      <div className="grid grid-cols-3 gap-4 p-4">
        <div className="col-span-2">
          <CartList products={products} />
        </div>
        <div className="col-span-1">
          <CartSummary />
        </div>
      </div>
    </ShoppingCartContextProvider>
  );
}