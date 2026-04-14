import { useDispatch } from "react-redux"
import type { AppDispatch } from "../../app/store"
import { addToCart } from "../../features/cart/cartSlice"
import { Link } from "react-router-dom"
import type { Product } from './type'
import toast from "react-hot-toast"

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
    toast.success('Product added to cart')
  }

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link to={`/product/${product.id}`} className="block">
        <div className="flex h-60 items-center justify-center bg-gray-50 p-6">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
          />
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-400">
          {product.category}
        </p>

        <Link to={`/product/${product.id}`} className="block">
          <h2 className="min-h-[48px] text-base font-semibold leading-6 text-gray-900 transition group-hover:text-black">
            {product.title}
          </h2>
        </Link>

        <div className="mt-4 flex items-center justify-between">
          <p className="text-2xl font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </p>
        </div>

        <button
          data-keep-minicart-open="true"
          onClick={handleAddToCart}
          className="mt-5 rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 active:scale-[0.98]"
        >
          Add to cart
        </button>
      </div>
    </div>
  )
}
