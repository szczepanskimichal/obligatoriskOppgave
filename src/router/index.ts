import { createRouter, createWebHistory } from 'vue-router';
import ShopView from '../views/ShopView.vue';
import CartView from '../views/CartView.vue';
import ProductDetails from '../components/ProductDetails.vue';

const routes = [
  
    {
    path: '/',
    name: 'products',
    component: ShopView,
  },
  {
    path: '/product/:id',
    name: 'product-detail',
    component: ProductDetails,
  },
  {
    path: '/cart',
    name: 'cart',
    component: CartView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;