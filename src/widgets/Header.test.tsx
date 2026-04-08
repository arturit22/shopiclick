import { configureStore } from "@reduxjs/toolkit";
import {render, screen} from '@testing-library/react'
import { describe, it, expect } from "vitest";
import cartReducer from '../features/cart/cartSlice'
import productReducer from '../features/products/productSlice'
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { Header } from "./Header";


describe('Header', () => {
    it('should render store title and cart quantity', () => {
        const store = configureStore({
            reducer: {
                cart: cartReducer,
                products: productReducer,
            },
            preloadedState: {
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
                products: {
                    items: [],
                    loading: false,
                    error: null,
                },
            },
        })
    
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Header />
                </MemoryRouter>
            </Provider>
        )

        expect(screen.getByText('Store')).toBeInTheDocument()
        expect(screen.getByText(/Cart/i)).toBeInTheDocument()
        expect(screen.getByText(/3/)).toBeInTheDocument()
    })
})