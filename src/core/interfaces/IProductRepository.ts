// src/core/interfaces/IProductRepository.ts
import { Product } from "@/core/entities/Product";

export interface IProductRepository {
  getAll(): Promise<Product[]>;
  getById(id: number): Promise<Product | null>;
  getByCategory(category: string): Promise<Product[]>;
  // متدهای دیگر...
}