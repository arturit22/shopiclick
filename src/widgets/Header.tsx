import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { selectCartTotalQuantity } from "../features/cart/cartSelector"
import type { AppDispatch, RootState } from "../app/store"
import { setSearchValue } from "../features/catalog/catalogSlice"
import { useEffect, useState } from "react"
import { useDebounce } from "../shared/hooks/useDebounce"
import { ShoppingCart, Search } from "lucide-react"
import { MiniCart } from "./MiniCart"
import { useRef } from "react"
import { AnimatePresence } from "framer-motion"

export function Header() {
    const totalQuantity = useSelector(selectCartTotalQuantity)
    const searchValue = useSelector((state: RootState) => state.catalog.searchValue)
    const dispatch = useDispatch<AppDispatch>()

    const [inputValue, setInputValue] = useState(searchValue)
    const [isMiniCartOpen, setIsMiniCartOpen] = useState(false)
    const debounce = useDebounce(inputValue, 300)
    const miniCartRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        dispatch(setSearchValue(debounce))
    }, [debounce, dispatch])

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (miniCartRef.current && !miniCartRef.current.contains(event.target as Node)) {
                setIsMiniCartOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    useEffect(() => {
        function handleEscape(event: KeyboardEvent) {
            if (event.key === 'Escape') {
                setIsMiniCartOpen(false)
            }
        }

        document.addEventListener("keydown", handleEscape)

        return () => {
            document.removeEventListener('keydown', handleEscape)
        }
    }, [])


    return (
        <header className="sticky top-0 z-50 bg-white/60 backdrop-blur border-b p-4">
            <div className="container mx-auto flex flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:justify-between">
                <Link to="/" className="text-2xl font-extrabold tracking-tight text-gray-900 transition hover:opactity-80">
                    ShopiClick
                </Link>

                <div className="relative w-full md:max-w-xl">
                    <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input id="product-search" name="productSearch" type="text" placeholder="Search products..." value={inputValue} onChange={(e) => setInputValue(e.target.value)} className="w-full rounded-full border border-gray-300 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-black" />
                </div>

                <div className="relative" ref={miniCartRef}>
                    <button type="button" aria-label="Cart" onClick={() => setIsMiniCartOpen((prev) => !prev)} className="relative inline-flex items-center gap-2 self-start rounded-full border border-gray-300 px-4 py-2 font-medium text-gray-900 transition hover:bg-gray-100 md:self-auto">
                        <ShoppingCart size={18} />
                        {totalQuantity > 0 && (
                            <span className="absolute -right-2 -top-2 min-w-5 rounded-full bg-red-500 px-1.5 py-0.5 text-center text-xs font-bold text-white">
                                {totalQuantity}
                            </span>
                        )}
                    </button>
                    <AnimatePresence>
                        {isMiniCartOpen && <MiniCart />}
                    </AnimatePresence>
                </div>

            </div>
        </header>
    )
}
