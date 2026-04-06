import { useDispatch } from "react-redux"
import type { AppDispatch } from "../../app/store"
import { addToCart } from "../../features/cart/cartSlice"
import { Link } from "react-router-dom"

interface Product {
  id: number
  title: string
  price: number
  thumbnail: string
}

interface ProductCardProps {
  product: Product
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const dispatch = useDispatch<AppDispatch>()

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
      })
    )
  }

  return (
    <div className="border rounded-xl p-4 shadow hover:shadow-2xl transition">
      <Link to={`/product/${product.id}`}>
        <img className="h-40 w-full object-contain" src={product.thumbnail} alt={product.title} />
        <h2 className="font-bold line-clamp-2">{product.title}</h2>
        <p>${product.price}</p>
      </Link>
      <button onClick={handleAddToCart} className="mt-4 w-full rounded-lg bg-black px-4 py-2 text-white">Add to cart</button>
    </div>
  )
}
