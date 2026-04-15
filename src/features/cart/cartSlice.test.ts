import { describe, it, expect } from 'vitest'
import cartReducer, {
  addToCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from './cartSlice'
import type { CartItem } from '../../entities/cart/type'

describe('cartSlice', () => {
  it('should add product to cart', () => {
    const initialState = {
      items: [],
    }

    const product: Omit<CartItem, 'quantity'> = {
      id: 1,
      title: 'phone',
      price: 100,
      thumbnail: 'image.jpg',
    }

    const nextState = cartReducer(initialState, addToCart(product))

    expect(nextState.items).toHaveLength(1)
    expect(nextState.items[0].quantity).toBe(1)
  })

  it('should increase quantity when adding existing product', () => {
    const initialState = {
      items: [],
    }

    const product: Omit<CartItem, 'quantity'> = {
      id: 1,
      title: 'phone',
      price: 100,
      thumbnail: 'image.jpg',
    }

    const nextState = cartReducer(initialState, addToCart(product))
    const nextState2 = cartReducer(nextState, addToCart(product))

    expect(nextState2.items).toHaveLength(1)
    expect(nextState2.items[0].quantity).toBe(2)
  })

  it('should remove product from cart', () => {
    const initialState = {
      items: [],
    }

    const product: Omit<CartItem, 'quantity'> = {
      id: 1,
      title: 'phone',
      price: 100,
      thumbnail: 'image.jpg',
    }

    const nextState = cartReducer(initialState, addToCart(product))
    const nextState2 = cartReducer(nextState, removeFromCart(product.id))

    expect(nextState.items).toHaveLength(1)
    expect(nextState2.items).toHaveLength(0)
  })
  it('should decrease product quantity', () => {
    const initialState = {
      items: [],
    }

    const product: Omit<CartItem, 'quantity'> = {
      id: 1,
      title: 'phone',
      price: 100,
      thumbnail: 'image.jpg',
    }

    const nextState = cartReducer(initialState, addToCart(product))
    const nextState2 = cartReducer(nextState, addToCart(product))
    const nextState3 = cartReducer(nextState2, decreaseQuantity(product.id))

    expect(nextState3.items[0].quantity).toBe(1)
  })
  it('should remove product when decreasing quantity from 1', () => {
    const initialState = {
      items: [],
    }

    const product: Omit<CartItem, 'quantity'> = {
      id: 1,
      title: 'phone',
      price: 100,
      thumbnail: 'image.jpg',
    }

    const nextState = cartReducer(initialState, addToCart(product))
    const nextState2 = cartReducer(nextState, decreaseQuantity(product.id))

    expect(nextState2.items).toHaveLength(0)
  })
  it('should increase product quantity', () => {
    const initialState = {
      items: [],
    }

    const product: Omit<CartItem, 'quantity'> = {
      id: 1,
      title: 'phone',
      price: 100,
      thumbnail: 'image.jpg',
    }

    const nextState = cartReducer(initialState, addToCart(product))
    const nextState2 = cartReducer(nextState, increaseQuantity(product.id))

    expect(nextState2.items[0].quantity).toBe(2)
  })
})
