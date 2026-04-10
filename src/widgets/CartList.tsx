import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../app/store";
import { increaseQuantity, decreaseQuantity, removeFromCart, clearCart } from "../features/cart/cartSlice";
import { selectCartTotalPrice, selectCartTotalQuantity } from "../features/cart/cartSelector";

export const CartList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const items = useSelector((state: RootState) => state.cart.items)
    const totalPrice = useSelector(selectCartTotalPrice)
    const totalQuantity = useSelector(selectCartTotalQuantity)

    if (items.length === 0) {
        return (
            <div className="mt-16 text-center">
                <h2 className="text-2xl font-semibold">Your cart is empty</h2>
                <p className="mt-2 text-gray-500">Add some products to get started</p>
            </div>
        )
    }

    return (
        <div className="mt-8">
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold">Cart</h2>
                <button
                    onClick={() => dispatch(clearCart())}
                    className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-100"
                >
                    Clear cart
                </button>
            </div>

            <div className="space-y-4">
                {items.map((item) => (
                    <div
                        key={item.id}
                        className="flex items-center gap-4 rounded-2xl border p-4 shadow-sm"
                    >
                        <img
                            src={item.thumbnail}
                            alt={item.title}
                            className="h-20 w-20 object-contain"
                        />

                        <div className="flex-1">
                            <h3 className="font-semibold">{item.title}</h3>
                            <p className="mt-1 text-gray-500">
                                ${item.price.toFixed(2)}
                            </p>
                            <p className="mt-1 text-sm text-gray-400">
                                Total: ${(item.price * item.quantity).toFixed(2)}
                            </p>
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => dispatch(increaseQuantity(item.id))}
                                className="h-9 w-9 rounded-lg border hover:bg-gray-100"
                            >
                                +
                            </button>

                            <span className="w-6 text-center font-medium">
                                {item.quantity}
                            </span>

                            <button
                                onClick={() => dispatch(decreaseQuantity(item.id))}
                                className="h-9 w-9 rounded-lg border hover:bg-gray-100"
                            >
                                -
                            </button>
                        </div>

                        <button
                            onClick={() => dispatch(removeFromCart(item.id))}
                            className="ml-4 text-sm text-red-500 hover:underline"
                        >
                            Remove
                        </button>
                    </div>
                ))}
            </div>

            {/* Total block */}
            <div className="mt-8 rounded-2xl border p-6 shadow-sm">
                <div className="flex items-center justify-between text-lg">
                    <span>Total items:</span>
                    <span>{totalQuantity}</span>
                </div>

                <div className="mt-2 flex items-center justify-between text-xl font-bold">
                    <span>Total price:</span>
                    <span>${totalPrice.toFixed(2)}</span>
                </div>

                <button className="mt-6 w-full rounded-xl bg-black py-3 text-white font-semibold hover:bg-gray-800">
                    Checkout
                </button>
            </div>
        </div>
    )
}


