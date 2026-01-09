<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useShopStore } from '../stores/shop';
import type { Product } from '../types';
import ShopHeader from '../components/ShopHeader.vue';
import ProductList from '../components/ProductList.vue';
import Cart from '../components/Cart.vue';
import ProductDetails from '../components/ProductDetails.vue';

const route = useRoute();
const shop = useShopStore();

onMounted(() => {
  shop.loadProducts();
});

// Określ aktualny widok na podstawie route
const currentView = computed(() => route.name);

// Dla product details
const currentProduct = computed(() => {
  if (route.name === 'product-detail') {
    const idParam = route.params.id as string;
    return shop.getProductById(Number(idParam)) ?? null;
  }
  return null;
});

const cartTotal = computed(() => shop.totalCartPrice);

// Handlers
function handleAddToCart(product: Product) {
  shop.addToCart(product);
}

function handleUpdateQuantity(itemId: number, newQuantity: number) {
  shop.updateCartItemQuantity(itemId, newQuantity);
}

function handleRemoveItem(itemId: number) {
  shop.removeFromCart(itemId);
}
</script>

<template>
  <div class="app-root">
    <ShopHeader :cart-count="shop.cartItemCount" />
    <main>
      <!-- Products View -->
      <ProductList 
        v-if="currentView === 'products'"
        :products="shop.products" 
        @add-to-cart="handleAddToCart"
      />

      <!-- Cart View -->
      <Cart 
        v-else-if="currentView === 'cart'"
        :items="shop.cart" 
        :total="cartTotal" 
        @update-quantity="handleUpdateQuantity"
        @remove-item="handleRemoveItem"
      />

      <!-- Product Details View -->
      <ProductDetails 
        v-else-if="currentView === 'product-detail'"
        :product="currentProduct"
        @add-to-cart="handleAddToCart"
      />
    </main>
  </div>
</template>