<script setup lang="ts">
import { useShopStore } from '../stores/shop';

const shop = useShopStore();
</script>
<template>
  <header class="header">
    <div class="header-content">
      <div class="logo">Legacy Shop</div>
      <nav>
        <RouterLink to="/">Produkter</RouterLink>
        <RouterLink to="/cart">Handlekurv ({{ shop.cartItemCount }})</RouterLink>
      </nav>
    </div>
  </header>
</template>
<style scoped>
.header {
  display: block;
  background-color: #333;
  color: white;
  padding: 1rem;
}
.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.logo {
  font-size: 1.5rem;
  font-weight: bold;
}
nav a {
  color: white;
  text-decoration: none;
  margin-left: 1rem;
  cursor: pointer;
}
nav a:hover {
  text-decoration: underline;
}
nav a.active {
  font-weight: bold;
}
</style>