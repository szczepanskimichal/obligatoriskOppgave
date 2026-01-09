<script setup lang="ts">
import type { Product } from '../types';
import { useRouter } from 'vue-router';

interface Props {
  products: Product[];
}
const props = defineProps<Props>();

const router = useRouter();
const emit = defineEmits<{
  (e: 'view-details', id: number): void;
  (e: 'add-to-cart', product: Product): void;
}>();

function handlerAddToCart(product: Product) {
 emit('add-to-cart', product);
}

function goToDetails(id: number) {
  router.push({ name: 'product-detail', params: { id } });
}

</script>
<template>
  <section class="container">
    <h2>Our Products</h2>
    <div class="product-grid">
      <div
        v-for="product in props.products"
        :key="product.id"
        class="product-card"
      >
        <img :src="product.image" :alt="product.name" />
        <h3>{{ product.name }}</h3>
        <p>{{ product.price }} NOK</p>
        <button class="btn" @click="handlerAddToCart(product)" >
          Legg i handlevogn
        </button>
        <button class="btn btn-secondary" @click="goToDetails(product.id)">
          Detaljer
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.container {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
}
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
}
.product-card {
  background: white;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  text-align: center;
}
.product-card img {
  max-width: 100%;
  border-radius: 4px;
}
.btn {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 0.5rem;
}
.btn:hover {
  background-color: #0056b3;
}
.btn-secondary {
  background-color: #6c757d;
}
.btn-secondary:hover {
  background-color: #545b62;
}
</style>
