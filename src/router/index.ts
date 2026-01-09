import { createRouter, createWebHistory } from 'vue-router';
import ShopView from '../views/ShopView.vue';

const routes = [
  {
    path: '/',
    name: 'products',
    component: ShopView,
  },
  {
    path: '/product/:id',
    name: 'product-detail',
    component: ShopView,
  },
  {
    path: '/cart',
    name: 'cart',
    component: ShopView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;