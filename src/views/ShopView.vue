<script setup lang="ts">
import ShopHeader from '../components/ShopHeader.vue';

</script>

<template>
   <div class="app-root">
    <ShopHeader/>

    <main>
      <ProductList/>
      <Cart/>
      <ProductDetail/>
    </main>
  </div>
</template>