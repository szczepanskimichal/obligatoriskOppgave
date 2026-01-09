import { defineStore } from "pinia"
import { ref, computed, watch } from 'vue'
import type { CartItem, Product } from "../types"

const CART_STORAGE_KEY = 'shop_cart'

export const useShopStore = defineStore('shop', () => {
  // Helper functions for localStorage
  const loadCart = (): CartItem[] => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY)
      if (stored) {
        return JSON.parse(stored) as CartItem[]
      }
    } catch (error) {
      console.error('Failed to load cart from localStorage:', error)
    }
    return []
  }

  const saveCart = (cart: CartItem[]): void => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
    } catch (error) {
      console.error('Failed to save cart to localStorage:', error)
    }
  }

  // State
  const products = ref<Product[]>([])
  const cart = ref<CartItem[]>(loadCart())
  const currentView = ref<'products' | 'cart'>('products')
  const error = ref<string | null>(null)
  const currentRouteName = ref<string>('products')
  const currentRouteParams = ref<Record<string, string>>({})

  // Watch cart and save to localStorage
  watch(cart, (newCart) => {
    saveCart(newCart)
  }, { deep: true })

  // Getters
  const currentProducts = computed(() => products.value)
  
  const cartItemCount = computed(() => 
    cart.value.reduce((total, item) => total + item.quantity, 0)
  )
  
  const totalCartPrice = computed(() => 
    cart.value.reduce((total, item) => total + item.price * item.quantity, 0)
  )

  const currentViewName = computed(() => currentRouteName.value)

  const currentProduct = computed(() => {
    if (currentRouteName.value === 'product-detail') {
      const idParam = currentRouteParams.value.id
      if (idParam) {
        return getProductById(Number(idParam)) ?? null
      }
    }
    return null
  })

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

  function setCurrentRoute(name: string, params: Record<string, string> = {}) {
    currentRouteName.value = name
    currentRouteParams.value = params
  }

  return {
    // State
    products,
    cart,
    currentView,
    error,
    // Getters
    currentProducts,
    cartItemCount,
    totalCartPrice,
    currentViewName,
    currentProduct,
    // Actions
    loadProducts,
    addToCart,
    updateCartItemQuantity,
    removeFromCart,
    getProductById,
    setCurrentRoute,
  }
})

