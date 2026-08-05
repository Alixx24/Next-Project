// src/infrastructure/repositories/ProductRepositoryFactory.ts
import { ProductRepository } from "./ProductRepository";
import { LaravelApiClient } from "@/infrastructure/api/laravel-api";

export class ProductRepositoryFactory {
  static create() {
    const apiClient = new LaravelApiClient();
    return new ProductRepository(apiClient);
  }
}