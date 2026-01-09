<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useShopStore } from '../stores/shop';
import ShopHeader from '../components/ShopHeader.vue';
import ProductList from '../components/ProductList.vue';
import Cart from '../components/Cart.vue';
import ProductDetails from '../components/ProductDetails.vue';

const route = useRoute();
const shop = useShopStore();

onMounted(() => {
  shop.loadProducts();
  shop.setCurrentRoute(route.name as string, route.params as Record<string, string>);
});

watch(() => route.name, () => {
  shop.setCurrentRoute(route.name as string, route.params as Record<string, string>);
});
</script>

<template>
  <div class="app-root">
    <ShopHeader :cart-count="shop.cartItemCount" />
    <main>
      <!-- Products View -->
      <ProductList 
        v-if="shop.currentViewName === 'products'"
        :products="shop.products" 
        @add-to-cart="shop.addToCart"
      />

      <!-- Cart View -->
      <Cart 
        v-else-if="shop.currentViewName === 'cart'"
        :items="shop.cart" 
        :total="shop.totalCartPrice" 
        @update-quantity="shop.updateCartItemQuantity"
        @remove-item="shop.removeFromCart"
      />

      <!-- Product Details View -->
      <ProductDetails 
        v-else-if="shop.currentViewName === 'product-detail'"
        :product="shop.currentProduct"
        @add-to-cart="shop.addToCart"
      />
    </main>
  </div>
</template>
