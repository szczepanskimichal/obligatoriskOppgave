import { defineStore } from "pinia"
import { ref, computed } from 'vue'
import type { CartItem, Product } from "../types"

export const useShopStore = defineStore('shop', () => {
  // State
  const products = ref<Product[]>([])
  const cart = ref<CartItem[]>([])
  const error = ref<string | null>(null)

  // Getters
  const cartItemCount = computed(() => 
    cart.value.reduce((total, item) => total + item.quantity, 0)
  )
  
  const totalCartPrice = computed(() => 
    cart.value.reduce((total, item) => total + item.price * item.quantity, 0)
  )

  // Actions
  async function loadProducts() {
    try {
      const response = await fetch('/products.json')
      
      if (!response.ok) {
        throw new Error(
          `Failed to load products: ${response.status} ${response.statusText}`
        )
      }
      
      const data: Product[] = await response.json()
      products.value = data
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err)
      error.value = message
      console.error('Error loading products:', message)
    }
  }

  function addToCart(product: Product) {
    const existingItem = cart.value.find(item => item.id === product.id)
    if (existingItem) {
      existingItem.quantity += 1
    } else {
      cart.value.push({ ...product, quantity: 1 })
    }
  }

  function updateCartItemQuantity(id: number, quantity: number) {
    const item = cart.value.find(item => item.id === id)
    if (item && quantity > 0) {
      item.quantity = quantity
    } else if (item && quantity <= 0) {
      removeFromCart(id)
    }
  }

  function removeFromCart(id: number) {
    const index = cart.value.findIndex(item => item.id === id)
    if (index !== -1) {
      cart.value.splice(index, 1)
    }
  }

  function getProductById(id: number): Product | undefined {
    return products.value.find(product => product.id === id)
  }

  return {
    // State
    products,
    cart,
    error,
    // Getters
    cartItemCount,
    totalCartPrice,
    // Actions
    loadProducts,
    addToCart,
    updateCartItemQuantity,
    removeFromCart,
    getProductById,
  }
})

