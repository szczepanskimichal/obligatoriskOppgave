<script setup lang="ts">
import { onMounted } from 'vue';
import { useShopStore } from '../stores/shop';
import Cart from '../components/Cart.vue';

const shop = useShopStore();

onMounted(() => {
  // Ensure products/cart are loaded if needed
  if (shop.products.length > 0) {
    shop.loadProducts();
  } else if (shop.cart.length === 0) {
    alert('Your cart is empty.');
  } 
});

const cartItems = shop.cart;
const cartTotal = computed(() => cartItems.reduce((total, item) => total + item.price * item.quantity, 0));
</script>

<template>
  <div class="app-root">
    <ShopHeader />

    <main>
      <Cart :items="cartItems" :total="cartTotal" />
    </main>
  </div>
</template>
