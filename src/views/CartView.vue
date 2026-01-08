<script setup lang="ts">
import { computed } from 'vue';
import { useShopStore } from '../stores/shop';
import Cart from '../components/Cart.vue';
import ShopHeader from '../components/ShopHeader.vue';

const shop = useShopStore();

const cartItems = shop.cart;
const cartTotal = computed(() => 
  shop.cart.reduce((total, item) => total + item.price * item.quantity, 0)
);

function handlerUpdateQuantity(itemId: number, newQuantity: number) {
  shop.updateCartItemQuantity(itemId, newQuantity);
}

function handlerRemoveItem(itemId: number) {
  shop.removeFromCart(itemId);
}
</script>

<template>
  <div class="app-root">
    <ShopHeader />

    <main>
      <Cart 
        :items="cartItems" 
        :total="cartTotal" 
        @update-quantity="handlerUpdateQuantity"
        @remove-item="handlerRemoveItem"
      />
    </main>
  </div>
</template>
