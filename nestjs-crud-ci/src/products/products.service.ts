import { Injectable } from '@nestjs/common';
import { Product } from './entities/products.entity';

@Injectable()
export class ProductsService {
  private products: Product[] = [];
  private idCounter = 1;

  create(product: Omit<Product, 'id'>): Product {
    const newProduct = { id: this.idCounter++, ...product };
    this.products.push(newProduct);
    return newProduct;
  }

  findAll(): Product[] {
    return this.products;
  }

  findOne(id: number): Product | undefined {
    return this.products.find((p) => p.id === id);
  }

  update(id: number, update: Partial<Product>): Product | null {
    const product = this.findOne(id);
    if (!product) return null;
    Object.assign(product, update);
    return product;
  }

  remove(id: number): boolean {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) return false;
    this.products.splice(index, 1);
    return true;
  }
}
