import type { Product } from '../types';

export const productService = {
  /**
   * Fetch all products from the API
   * @returns Promise with array of products
   * @throws Error if fetch fails
   */
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

  /**
   * Find a product by ID
   * @param products - Array of products to search
   * @param id - Product ID to find
   * @returns Product if found, undefined otherwise
   */
  findProductById(products: Product[], id: number): Product | undefined {
    return products.find(product => product.id === id);
  },

  /**
   * Filter products by search term
   * @param products - Array of products to filter
   * @param searchTerm - Term to search in product name and description
   * @returns Filtered array of products
   */
  filterProducts(products: Product[], searchTerm: string): Product[] {
    const term = searchTerm.toLowerCase().trim();
    
    if (!term) {
      return products;
    }
    
    return products.filter(product => 
      product.name.toLowerCase().includes(term) ||
      product.description.toLowerCase().includes(term)
    );
  },

  /**
   * Sort products by price
   * @param products - Array of products to sort
   * @param order - Sort order ('asc' or 'desc')
   * @returns Sorted array of products
   */
  sortProductsByPrice(products: Product[], order: 'asc' | 'desc' = 'asc'): Product[] {
    return [...products].sort((a, b) => 
      order === 'asc' ? a.price - b.price : b.price - a.price
    );
  }
};
