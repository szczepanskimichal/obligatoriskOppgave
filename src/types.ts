  export interface Product {
     id: number;
     name: string;
     price: number;
     image: string;
      description: string;
   }

   export interface CartItem extends Product {
     quantity: number;
   }

  //  export type ViewName = 'products' | 'cart';

  //  export interface AppState {
  //    products: Product[];
  //    cart: CartItem[];
  //    currentView: ViewName;
  //  }
