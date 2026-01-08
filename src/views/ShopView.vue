<script setup lang="ts">
import { onMounted } from 'vue';
import ProductList from '../components/ProductList.vue';
import ShopHeader from '../components/ShopHeader.vue';
import { useShopStore } from '../stores/shop';

const shop = useShopStore();

onMounted(() => {
  shop.loadProducts();
});
</script>

<template>
  <div class="app-root">
    <ShopHeader />

    <main>
      <ProductList :products="shop.products" />
    </main>
  </div>
</template>