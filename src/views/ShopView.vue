<script setup lang="ts">
import { onMounted } from 'vue';
import ProductList from '../components/ProductList.vue';
import { useShopStore } from '../stores/shop';
import type { Product } from '../types';
import ShopHeader from '../components/ShopHeader.vue';

const shop = useShopStore();

onMounted(() => {
  shop.loadProducts();
});

function handlerAddToCart(product: Product) {
  shop.addToCart(product);
  console.log(`Produktet "${product.name}" ble lagt til i handlevognen.`);
}
</script>

<template>
  <div class="app-root">
    <ShopHeader />
    <main>
      <ProductList :products="shop.products" 
      @add-to-cart="handlerAddToCart" />
    </main>
  </div>
</template>