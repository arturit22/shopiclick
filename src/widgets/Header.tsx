import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectCartTotalQuantity } from "../features/cart/cartSelector"

export function Header() {
    const totalQuantity = useSelector(selectCartTotalQuantity)

    return (
        <header className="border-b p-4">
            <div className="container mx-auto flex justify-between">
                <Link to="/" className="text-xl font-bold">
                    ShopiClick
                </Link>

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
