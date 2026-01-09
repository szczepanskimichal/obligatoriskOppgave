import type { CartItem } from '../types';

const CART_STORAGE_KEY = 'shop_cart';

export const storageService = {
  saveCart(cart: CartItem[]): void {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (error) {
      console.error('Failed to save cart to localStorage:', error);
    }
  },

  loadCart(): CartItem[] {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored) as CartItem[];
      }
    } catch (error) {
      console.error('Failed to load cart from localStorage:', error);
    }
    return [];
  },

  clearCart(): void {
    try {
      localStorage.removeItem(CART_STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear cart from localStorage:', error);
    }
  }
};
