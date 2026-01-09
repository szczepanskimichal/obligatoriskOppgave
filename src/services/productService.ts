import type { Product } from '../types';

export const productService = {
 
  async fetchProducts(): Promise<Product[]> {
    try {
      const response = await fetch('/products.json');
      
      if (!response.ok) {
        throw new Error(
          `Failed to load products: ${response.status} ${response.statusText}`
        );
      }
      
      const data: Product[] = await response.json();
      return data;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      console.error('Error loading products:', message);
      throw err;
    }
  },


  findProductById(products: Product[], id: number): Product | undefined {
    return products.find(product => product.id === id);
  }
};
