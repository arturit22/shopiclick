import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../app/store";
import { increaseQuantity, decreaseQuantity, removeFromCart, clearCart } from "../features/cart/cartSlice";
import { selectCartTotalQuantity } from "../features/cart/cartSelector";

export const CartList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const items = useSelector((state: RootState) => state.cart.items)
    const totalPrice = useSelector(selectCartTotalQuantity)

    if (items.length === 0) {
        return <p className="mt-6 text-lg">Cart is empty</p>
    }

  return (
    <div className="mt-8">
        <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Cart</h2>
            <button onClick={() => dispatch(clearCart())} className="rounded-lg border px-4 py-2">Clear Cart</button>
        </div>

        <div className="space-y-4">
            {items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 rounded-xl border p-4 shadow">
                    <img src={item.thumbnail} alt={item.title} className="h-20 w-20 object-contain" />
                    <div className="flex-1">
                        <h3 className="font-semibold">{item.title}</h3>
                        <p className="mt-1">${item.price}</p>
                        <p className="mt-1">{item.quantity}</p>
                    </div>

                    <div className="flex items-center gap-2">
                        <button aria-label={`increase quantity for ${item.title}`} onClick={() => dispatch(increaseQuantity(item.id))} className="rounded-md border px-3 py-1">+</button>
                        <button aria-label={`decrease quantity for ${item.title}`} onClick={() => dispatch(decreaseQuantity(item.id))} className="rounded-md border px-3 py-1">-</button>
                    </div>
                    <button onClick={() => dispatch(removeFromCart(item.id))} className="rounded-md border px-3 py-2">Remove</button>
                </div>
            ))}
        </div>

        <div className="mt-6 rounded-xl border p-4 shadow">
            <p className="text-xl font-bold">Total: ${totalPrice.toFixed(2)}</p>
        </div>
      
    </div>
  )
}


