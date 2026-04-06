import { describe, it, expect} from 'vitest'
import cartReducer, { addToCart, removeFromCart } from './cartSlice'
import type { CartItem } from '../../entities/cart/type'

describe('cartSlice', () => {
    it('should add product to cart', () => {
        const initialState = {
            items: []
        }

        const product: Omit<CartItem, 'quantity'> = {
            id: 1,
            title: 'phone',
            price: 100,
            thumbnail: 'image.jpg',
        }

        const nextState = cartReducer(initialState, addToCart(product))
        const nextState2 = cartReducer(nextState, addToCart(product))

        expect(nextState.items).toHaveLength(1)
        expect(nextState.items[0].quantity).toBe(1)
        expect(nextState2.items[0].quantity).toBe(2)
    })

    it('should increase quantity if product alredy exists', () => {
        const initialState = {
            items: []
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
            items: []
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
})