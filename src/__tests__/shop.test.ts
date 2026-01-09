import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useShopStore } from '../stores/shop'
import type { Product } from '../types'

describe('Shop Store - Unit Tests', () => {
  beforeEach(() => {
    // Utwórz nową instancję Pinia przed każdym testem
    setActivePinia(createPinia())
  })

  // Test 1: Sprawdź cartItemCount (liczba produktów w koszyku)
  it('should return correct number of items in cart (cartItemCount)', () => {
    const shop = useShopStore()
    
    const product1: Product = {
      id: 1,
      name: 'Keyboard',
      price: 1200,
      image: 'test.jpg'
    }
    const product2: Product = {
      id: 2,
      name: 'Mouse',
      price: 600,
      image: 'test.jpg'
    }

    // Dodaj produkty do koszyka
    shop.addToCart(product1)
    shop.addToCart(product1) // quantity = 2
    shop.addToCart(product2) // quantity = 1

    // Sprawdź czy cartItemCount zwraca sumę wszystkich quantity (2 + 1 = 3)
    expect(shop.cartItemCount).toBe(3)
  })

  // Test 2: Sprawdź totalCartPrice (suma cen)
  it('should calculate total cart price correctly (totalCartPrice)', () => {
    const shop = useShopStore()
    
    const product1: Product = {
      id: 1,
      name: 'Keyboard',
      price: 1200,
      image: 'test.jpg'
    }
    const product2: Product = {
      id: 2,
      name: 'Mouse',
      price: 600,
      image: 'test.jpg'
    }

    // Dodaj produkty
    shop.addToCart(product1) // 1200 * 1 = 1200
    shop.addToCart(product1) // 1200 * 2 = 2400
    shop.addToCart(product2) // 600 * 1 = 600

    // Suma: 2400 + 600 = 3000
    expect(shop.totalCartPrice).toBe(3000)
  })

  // Test 3: Sprawdź akcję updateCartItemQuantity
  it('should update quantity in cart correctly (updateCartItemQuantity)', () => {
    const shop = useShopStore()
    
    const product: Product = {
      id: 1,
      name: 'Keyboard',
      price: 1200,
      image: 'test.jpg'
    }

    // Dodaj produkt z quantity = 1
    shop.addToCart(product)
    expect(shop.cart[0].quantity).toBe(1)
    expect(shop.cartItemCount).toBe(1)

    // Zaktualizuj quantity do 5
    shop.updateCartItemQuantity(1, 5)
    expect(shop.cart[0].quantity).toBe(5)
    expect(shop.cartItemCount).toBe(5)

    // Zaktualizuj quantity do 0 (powinien usunąć produkt)
    shop.updateCartItemQuantity(1, 0)
    expect(shop.cart).toHaveLength(0)
    expect(shop.cartItemCount).toBe(0)
  })
})
