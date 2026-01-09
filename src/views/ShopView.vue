<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useShopStore } from '../stores/shop';
import ShopHeader from '../components/ShopHeader.vue';
import ProductList from '../components/ProductList.vue';
import Cart from '../components/Cart.vue';
import ProductDetails from '../components/ProductDetails.vue';

const route = useRoute();
const shop = useShopStore();

const currentProduct = computed(() => {
  if (route.name === 'product-detail' && route.params.id) {
    return shop.getProductById(Number(route.params.id)) ?? null;
  }
  return null;
});

onMounted(() => {
  shop.loadProducts();
});
</script>

<template>
  <div class="app-root">
    <ShopHeader :cart-count="shop.cartItemCount" />
    <main>
      <!-- Products View -->
      <ProductList 
        v-if="route.name === 'products'"
        :products="shop.products" 
        @add-to-cart="shop.addToCart"
      />

      <!-- Cart View -->
      <Cart 
        v-else-if="route.name === 'cart'"
        :items="shop.cart" 
        :total="shop.totalCartPrice" 
        @update-quantity="shop.updateCartItemQuantity"
        @remove-item="shop.removeFromCart"
      />

      <!-- Product Details View -->
      <ProductDetails 
        v-else-if="route.name === 'product-detail'"
        :product="currentProduct"
        @add-to-cart="shop.addToCart"
      />
    </main>
  </div>
</template>
