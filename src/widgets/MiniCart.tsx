import type { AppDispatch, RootState } from "../app/store"
import { useSelector, useDispatch } from "react-redux"
import { selectCartTotalPrice, selectCartTotalQuantity } from "../features/cart/cartSelector"
import { Link } from "react-router-dom"
import { removeFromCart } from "../features/cart/cartSlice"
import {motion} from 'framer-motion'

interface MiniCartProps {
    onClose: () => void
};

export const MiniCart = ({onClose}: MiniCartProps) => {
    const dispatch = useDispatch<AppDispatch>()
    const items = useSelector((state: RootState) => state.cart.items)
    const totalQuantity = useSelector(selectCartTotalQuantity)
    const totalPrice = useSelector(selectCartTotalPrice)

    if (items.length === 0) {
        return (
            <motion.div initial={{opacity: 0, y: -12, scale: 0.97}} animate={{opacity: 1, y: 0, scale: 1}} exit={{opacity: 0, y: -8, scale: 0.98}} transition={{duration: 0.25}} className="absolute right-0 top-14 z-[200] w-80 rounded-2xl border border-gray-200 bg-white p-4 shadow-xl">
                <h3 className="text-lg font-semibold">Cart</h3>
                <p className="mt-3 text-sm text-gray-500">Your cart is empty</p>

                <Link onClick={onClose} to="/" className="mt-4 inline-block rounded-xl border px-4 py-2 text-sm font-medium hover:bg-gray-100">Go shopping</Link>
            </motion.div>
        )
    }

    return (
        <motion.div initial={{opacity: 0, y: -12, scale: 0.97}} animate={{opacity: 1, y: 0, scale: 1}} exit={{opacity: 0, y: -8, scale: 0.98}} transition={{duration: 0.25}} className="absolute right-0 top-14 z-[200] w-80 rounded-2xl border border-gray-200 bg-white p-4 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold">Cart</h3>
                <span className="text-sm text-gray-500">{totalQuantity} items</span>
            </div>

            <div className="max-h-72 space-y-3 overflow-y-auto">
                {items.slice(0, 3).map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                        <img src={item.thumbnail} alt={item.title} className="h-14 w-14 object-contain" />
                        <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium">{item.title}</p>
                            <p className="text-xs text-gray-500">{item.quantity} x ${item.price.toFixed(2)}</p>
                        </div>
                        <button type="button" aria-label={`Remove ${item.title} from cart`} onClick={() => dispatch(removeFromCart(item.id))} className="shrink-0 rounded-md px-2 py-1 text-sm text-gray-400 transition hover:bg-gray-100 hover:text-red-500">x</button>
                    </div>
                ))}
            </div>

            {items.length > 3 && (
                <p className="mt-3 text-xs text-gray-400">And {items.length - 3} more items</p>
            )}

            <div className="mt-4 border-t pt-4">
                <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Total</span>
                    <span className="font-semibold">${totalPrice.toFixed(2)}</span>
                </div>

                <Link
                    to="/cart"
                    onClick={onClose}
                    className="mt-4 block rounded-xl bg-black py-3 text-center text-sm font-semibold text-white transition hover:bg-gray-800"
                >
                    Open cart
                </Link>
            </div>
        </motion.div>
    )
}

