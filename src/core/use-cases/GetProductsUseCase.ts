// 📁 src/core/use-cases/GetProductsUseCase.ts
import { IProductRepository } from "@/core/interfaces/IProductRepository";
import { Product } from "@/core/entities/Product";

export class GetProductsUseCase {
  constructor(private productRepository: IProductRepository) {}

  async execute(): Promise<Product[]> {
    try {
      const products = await this.productRepository.getAll();
      // ✅ اطمینان از اینکه همیشه آرایه برمی‌گرداند
      return Array.isArray(products) ? products : [];
    } catch (error) {
      console.error('❌ خطا در GetProductsUseCase:', error);
      return [];
    }
  }

  async executeWithFilter(category?: string): Promise<Product[]> {
    try {
      if (category) {
        const products = await this.productRepository.getByCategory(category);
        return Array.isArray(products) ? products : [];
      }
      return this.execute();
    } catch (error) {
      console.error('❌ خطا در GetProductsUseCase با فیلتر:', error);
      return [];
    }
  }
}