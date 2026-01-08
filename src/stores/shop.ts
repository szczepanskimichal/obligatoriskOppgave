import { defineStore } from "pinia"
import  type {AppState, CartItem, Product, ViewName, ErrorState} from "../types"

export const useShopStore = defineStore('shop', {
  state: (): AppState => ({
    products: [],
    cart: [],
    currentView: 'products',
    error: null as string | null,
  }),
  getters: {
  currentProducts: (state) => state.products,
  cartItemCount : (state) => state.cart.reduce((total, item) => total + item.quantity, 0),
  totalCartPrice: (state) => state.cart.reduce((total, item) => total + item.price * item.quantity, 0),
  },
  actions: {
    setProducts(products: Product[]) {},
    async loadProducts(){
      try {
      const response = await fetch('/products.json');
      if(!response.ok){
        throw new Error(`Failed to load products: ${response.status} ${response.statusText}`);
      }
      const data: Product[] = (await response.json() as Product[]);
      this.products = data;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      this.error = message;
      console.error("Error loading products:", message);
    }
  },
  addToCart(product: Product) {
      const existingItem = this.cart.find(item => item.id === product.id);
      if(existingItem){
        existingItem.quantity +=1;
      }else{
        this.cart.push({...product, quantity: 1});
      }
      }
  },
});

