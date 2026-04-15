import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getProducts } from '../../shared/api/productApi'
import type { Product } from '../../entities/product/type'

interface ProductState {
  items: Product[]
  loading: boolean
  error: string | null
}

const initialState: ProductState = {
  items: [],
  loading: false,
  error: null,
}

export const fetchProducts = createAsyncThunk<Product[]>(
  'products/fetchProducts',
  async () => {
    return await getProducts()
  }
)

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Ошибка'
      })
  },
})

export default productsSlice.reducer
