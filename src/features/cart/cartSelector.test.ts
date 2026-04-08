import { describe, it, expect } from 'vitest'
import { selectCartItems, selectCartTotalPrice, selectCartTotalQuantity } from './cartSelector'

describe('cartSelectors', () => {
    const mockstate = {
        cart: {
            items: [
                {
                    id: 1,
                    title: 'phone',
                    price: 100,
                    thumbnail: 'image1.jpg',
                    quantity: 2,
                },
                {
                    id: 2,
                    title: 'laptop',
                    price: 500,
                    thumbnail: 'image2.jpg',
                    quantity: 1,
                },
            ],
        },
    }

    it('should return cart items', () => {
        const items = selectCartItems(mockstate as any)

        expect(items).toHaveLength(2)
        expect(items[0].title).toBe('phone')
        expect(items[1].title).toBe('laptop')
    })

    it('should return total quantity', () => {
        const totalQuantity = selectCartTotalQuantity(mockstate as any)

        expect(totalQuantity).toBe(3)
    })

    it('should return total price', () => {
        const totalPrice = selectCartTotalPrice(mockstate as any)

        expect(totalPrice).toBe(700)
    })
})