import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import { describe, it, expect } from 'vitest'

import { CartList } from './CartList'
import cartReducer from '../features/cart/cartSlice'
import productReducer from '../features/products/productSlice'

describe('CartList', () => {
    const testStore = () =>
        configureStore({
            reducer: {
                cart: cartReducer,
                product: productReducer,
            },
            preloadedState: {
                cart: {
                    items: [
                        {
                            id: 1,
                            title: 'phone',
                            price: 100,
                            thumbnail: 'image.jpg',
                            quantity: 2,
                        },
                    ],
                    product: {
                        items: [],
                        loading: false,
                        error: null,
                    },
                }
            }
        })

    it('should decrease quantity and remove product after second click', async () => {
        const user = userEvent.setup()
        const store = testStore()

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <CartList />
                </MemoryRouter>
            </Provider>
        )

        const decreaseButton = screen.getByRole('button', {name: /decrease quantity for phone/i})
        await user.click(decreaseButton)

        expect(store.getState().cart.items).toHaveLength(1)
        expect(store.getState().cart.items[0].quantity).toBe(1)

        await user.click(decreaseButton)

        expect(store.getState().cart.items).toHaveLength(0)
    })
})