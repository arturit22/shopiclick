import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import { describe, it, expect } from 'vitest'

import { ProductCard } from './ProductCard'
import { Header } from '../../widgets/Header'
import cartReducer from '../../features/cart/cartSlice'
import productReducer from '../../features/products/productSlice'
import catalogReducer from '../../features/catalog/catalogSlice'

describe('ProductCard', () => {
  const testStore = () =>
    configureStore({
      reducer: {
        cart: cartReducer,
        product: productReducer,
        catalog: catalogReducer,
      },
      preloadedState: {
        cart: {
          items: [],
        },
        product: {
          items: [],
          loading: false,
          error: null,
        },
        catalog: {
          searchValue: '',
          selectedCategory: 'all',
        },
      },
    })

  const product = {
    id: 1,
    title: 'phone',
    description: 'test description',
    price: 100,
    category: 'electronics',
    thumbnail: 'image.jpg',
  }

  it('should add product to card after button click', async () => {
    const user = userEvent.setup()
    const store = testStore()

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
          <ProductCard product={product} />
        </MemoryRouter>
      </Provider>
    )

    const button = screen.getByRole('button', { name: /add to cart/i })
    await user.click(button)

    expect(store.getState().cart.items).toHaveLength(1)
    expect(store.getState().cart.items[0].quantity).toBe(1)
  })

  it('should increase product quantity two times', async () => {
    const user = userEvent.setup()
    const store = testStore()

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
          <ProductCard product={product} />
        </MemoryRouter>
      </Provider>
    )

    const button = screen.getByRole('button', { name: /add to cart/i })

    await user.click(button)
    await user.click(button)

    expect(store.getState().cart.items).toHaveLength(1)
    expect(store.getState().cart.items[0].quantity).toBe(2)
  })
})
