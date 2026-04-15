import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface CatalogState {
  searchValue: string
  selectedCategory: string
}

const initialState: CatalogState = {
  searchValue: '',
  selectedCategory: 'all',
}

const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload
    },
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload
    },
  },
})

export const { setSearchValue, setSelectedCategory } = catalogSlice.actions
export default catalogSlice.reducer
