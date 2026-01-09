<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useShopStore } from '../stores/shop';
import type { Product } from '../types';
import ShopHeader from './ShopHeader.vue';

const route = useRoute();
const router = useRouter();
const shop = useShopStore();

onMounted(() => {
  if (!shop.products.length) {
    shop.loadProducts();
  }
});

const product = computed <Product | null>(() => {
  const idParam = route.params.id as string;
  return shop.products.find(p => String(p.id) === idParam) ?? null;
});

const emit = defineEmits<{
  (e: 'add-to-cart', product: Product): void;
}>();

function handlerAddToCart(product: Product) {
 emit('add-to-cart', product);
 console.log('Aktualt produkt lagt til i handlevogn:', shop.cart);
}

function goBack() {
  router.push('/');
}
</script>
<template>
  <ShopHeader />
  <section v-if="!product" class="container not-found">
    <p>Produktet ble ikke funnet.</p>
    <button class="btn" @click="goBack">Tilbake til produkter</button>
  </section>

  <section v-else class="container detail">
    <div class="product-image">
      <img :src="product.image" :alt="product.name" />
    </div>
    <div class="product-info">
      <h2>{{ product.name }}</h2>
      <p class="price">{{ product.price }} NOK</p>
      <div class="description">
        <p>Dette er en fantastisk {{ product.name.toLowerCase() }}.</p>
      </div>
      <div class="actions">
        <button class="btn btn-primary" @click="handlerAddToCart(product)">
          Legg i handlevogn
        </button>
        <button class="btn btn-secondary" @click="goBack">
          Tilbake
        </button>
      </div>
    </div>
  </section>
</template>
<style scoped>
.container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
}

.not-found {
  text-align: center;
}

.detail {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

@media (max-width: 600px) {
  .detail {
    grid-template-columns: 1fr;
  }
}

.product-image img {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.product-info h2 {
  margin-top: 0;
  font-size: 2rem;
}

.price {
  font-size: 1.5rem;
  color: #2c3e50;
  font-weight: bold;
  margin: 1rem 0;
}

.description {
  line-height: 1.6;
  color: #666;
  margin-bottom: 2rem;
}

.actions {
  display: flex;
  gap: 1rem;
}

.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-weight: bold;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}
</style>
