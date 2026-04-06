import type { RootState } from "../app/store"
import { useSelector } from "react-redux"

export const CartSummary = () => {
    const items = useSelector((state: RootState) => state.cart.items)
    const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0)
    const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

    return (
        <div>
            <h2 className="mb-6 rounded-xl border p-4 shadow">Cart</h2>
            <p className="text-xl font-bold">Items: {totalQuantity}</p>
            <p className="mt-2">Total: ${totalPrice.toFixed(2)}</p>
        </div>
    )
}


