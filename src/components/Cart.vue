<script setup lang="ts">
import { useRouter } from 'vue-router';
import type { CartItem } from '../types';

interface Props {
  items: CartItem[];
  total: number;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: 'update-quantity', itemId: number, newQuantity: number): void;
  (e: 'remove-item', itemId: number): void;
}>();

const router = useRouter();

function goBack() {
  router.push('/');
}

function updateQuantity(itemId: number, quantity: number) {
  if (quantity >= 1) {
    emit('update-quantity', itemId, quantity);
  }
}

function handleInput(itemId: number, event: Event) {
  const target = event.target as HTMLInputElement;
  const value = parseInt(target.value);
  if (!isNaN(value) && value >= 1) {
    updateQuantity(itemId, value);
  }
}

function removeItem(itemId: number) {
  emit('remove-item', itemId);
}

function checkout() {
  alert('Checkout funksjonalitet er ikke implementert ennå.');
}
</script>

<template>
  <section class="container" v-if="props.items.length === 0">
    <h2>Your Cart is Empty</h2>
    <a href="#" @click.prevent="goBack">Go back to shopping</a>
  </section>

  <section class="container" v-else>
    <h2>Your Cart</h2>
    <div class="cart-items">
      <div
        v-for="item in props.items"
        :key="item.id"
        class="cart-item"
      >
        <div>
          <h4>{{ item.name }}</h4>
          <p>{{ item.price }} NOK</p>
        </div>
        <div class="quantity-controls">
          <button
            class="btn btn-small btn-minus" @click="updateQuantity(item.id, item.quantity - 1)"         >
            -
          </button>
          <input
            type="number"
            class="quantity-input"
            :value="item.quantity"
            @input="handleInput(item.id, $event)"
            readonly
          />
          <button
            class="btn btn-small btn-plus" @click="updateQuantity(item.id, item.quantity +1)"
          >
            +
          </button>
        </div>
        <button class="btn btn-danger" @click="removeItem(item.id)">
          Remove
        </button>
      </div>
    </div>
    <div class="cart-total">
      <h3>Total: {{ props.total }} NOK</h3>
      <button class="btn" id="checkout" @click="checkout" >Checkout</button>
    </div>
  </section>
</template>

<style scoped>
.container {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
}
a {
  color: #007bff;
  cursor: pointer;
}
a:hover {
  text-decoration: underline;
}
.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 4px;
}
.quantity-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.quantity-input {
  width: 40px;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 0.25rem;
}

/* Remove arrows from number input */
.quantity-input::-webkit-outer-spin-button,
.quantity-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.quantity-input[type=number] {
  -moz-appearance: textfield;
}
.btn-small {
  padding: 0.25rem 0.5rem;
  font-size: 0.8rem;
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
.btn-danger {
  background-color: #dc3545;
}
.btn-danger:hover {
  background-color: #a71d2a;
}
.cart-total {
  margin-top: 1rem;
}
</style>
