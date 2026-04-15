import { useDispatch, useSelector } from 'react-redux'
import { type AppDispatch, type RootState } from '../app/store'
import { useEffect, useMemo } from 'react'
import { fetchProducts } from '../features/products/productSlice'
import { setSelectedCategory } from '../features/catalog/catalogSlice'
import { ProductList } from '../widgets/ProductList'

export const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>()

  const { items, loading, error } = useSelector(
    (state: RootState) => state.products
  )

  const { searchValue, selectedCategory } = useSelector(
    (state: RootState) => state.catalog
  )

  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchProducts())
    }
  }, [dispatch, items.length])

  const categories = useMemo(() => {
    const uniqueCategories = new Set(items.map((item) => item.category))
    return ['all', ...uniqueCategories]
  }, [items])

  const filteredProducts = useMemo(() => {
    return items.filter((item) => {
      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory

      const matchesSearch = item.title
        .toLowerCase()
        .includes(searchValue.toLowerCase().trim())

      return matchesCategory && matchesSearch
    })
  }, [items, selectedCategory, searchValue])

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6 flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => dispatch(setSelectedCategory(category))}
            className={`rounded-lg border px-4 py-2 ${selectedCategory === category ? 'bg-black text-white' : ''}`}
          >
            {category}
          </button>
        ))}
      </div>

      <ProductList
        products={filteredProducts}
        loading={loading}
        error={error}
      />
    </div>
  )
}
