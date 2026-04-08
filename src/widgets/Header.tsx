import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { selectCartTotalQuantity } from "../features/cart/cartSelector"
import type { AppDispatch, RootState } from "../app/store"
import { setSearchValue } from "../features/catalog/catalogSlice"
import { useEffect, useState } from "react"
import { useDebounce } from "../shared/hooks/useDebounce"

export function Header() {
    const totalQuantity = useSelector(selectCartTotalQuantity)
    const searchValue = useSelector((state: RootState) => state.catalog.searchValue)
    const dispatch = useDispatch<AppDispatch>()

    const [inputValue, setInputValue] = useState(searchValue)
    const debounce = useDebounce(inputValue, 300)

    useEffect(() => {
        dispatch(setSearchValue(debounce))
    }, [debounce, dispatch])




    return (
        <header className="border-b p-4">
            <div className="container mx-auto flex justify-between">
                <Link to="/" className="text-xl font-bold">
                    ShopiClick
                </Link>

                <input type="text" placeholder="Search products..." value={inputValue} onChange={(e) => setInputValue(e.target.value)} className="border rounded-lg px-4 py-2 w-1/3" />

                <Link to="cart" className="relative">
                    Cart
                    <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 rounded-full">
                        {totalQuantity}
                    </span>
                </Link>
            </div>
        </header>
    )
}
