import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../app/store";
import { useEffect, useMemo, useState } from "react";
import { fetchProducts } from "../features/products/productSlice";
import { ProductList } from "../widgets/ProductList";
import { useDebounce } from "../shared/hooks/useDebounce";

export const HomePage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {items, loading, error} = useSelector(
        (state: RootState) => state.products
    )
    
    const [userInput, setUserInput] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('all')
    const debouncedInput = useDebounce(userInput, 300);

    

    useEffect(() => {
        if (items.length === 0) {
            dispatch(fetchProducts());
        }
    }, [dispatch, items.length])

    const categories = useMemo(() => {
        const uniqueCategories = new Set(items.map((item) => item.category))
        return ['all', ...uniqueCategories]
    }, [items])

    const filteredProducts = useMemo(() => {
        return items.filter((item) => {
            const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
            const matchesSearch = item.title.toLocaleLowerCase().includes(debouncedInput.toLocaleLowerCase().trim())

            return matchesCategory && matchesSearch
        })
    }, [items, selectedCategory, debouncedInput])

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="mb-6">
                <input id="product-search" name="productsearch" type="text" placeholder="Search products..." value={userInput} onChange={(e) => setUserInput(e.target.value)} className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-1" />
            </div>

            <div className="mb-6 flex flex-wrap gap-2">
                {categories.map((category) => (
                    <button key={category} onClick={() => setSelectedCategory(category)} className={`rounded-lg border px-4 py-2 ${selectedCategory === category ? 'bg-black text-white' : ""}`}>
                        {category}
                    </button>
                ))}
            </div>

            <ProductList products={filteredProducts} loading={loading} error={error} />
        </div>
    )
}


