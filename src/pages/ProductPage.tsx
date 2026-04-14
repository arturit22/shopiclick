import { useEffect } from "react"
import type { AppDispatch, RootState } from "../app/store"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { fetchProducts } from "../features/products/productSlice"
import { Link } from "react-router-dom"
import { addToCart } from "../features/cart/cartSlice"
import { ProductPageSkeleton } from "./ProductPageSkeleton"
import toast from "react-hot-toast"

export const ProductPage = () => {
    const { id } = useParams()
    const dispatch = useDispatch<AppDispatch>()
    const { items, loading, error } = useSelector((state: RootState) => state.products)

    useEffect(() => {
        if (items.length === 0) {
            dispatch(fetchProducts())
        }
    }, [dispatch, items.length])

    const product = useSelector((state: RootState) => state.products.items.find((item) => item.id === Number(id)))

    if (loading) {
        return <ProductPageSkeleton />
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-12">
                <p className="text-center text-lg text-red-500">Error: {error}</p>
            </div>
        )
    }

    if (!product) {
        return (
            <div className="container mx-auto px-4 py-12 text-center">
                <h2 className="text-2xl font-semibold">Product not found</h2>
                <Link to="/" className="mt-4 inline-block rounded-lg border px-4 py-2 hover:bg-gray-100">
                    Back to catalog
                </Link>
            </div>
        )
    }

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
        <section className="container mx-auto px-4 py-10">
            <div className="mb-6">
                <Link
                    to="/"
                    className="inline-block text-sm text-gray-500 hover:text-black"
                >
                    ← Back to catalog
                </Link>
            </div>

            <div className="grid gap-10 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:grid-cols-2 md:p-10">
                <div className="flex items-center justify-center rounded-2xl bg-gray-50 p-8">
                    <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="max-h-[420px] w-full object-contain"
                    />
                </div>

                <div className="flex flex-col">
                    <p className="mb-3 text-sm font-medium uppercase tracking-wide text-gray-400">
                        {product.category}
                    </p>

                    <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
                        {product.title}
                    </h1>

                    <p className="mt-6 text-base leading-7 text-gray-600">
                        {product.description}
                    </p>

                    <div className="mt-8">
                        <p className="text-4xl font-extrabold text-gray-900">
                            ${product.price.toFixed(2)}
                        </p>
                    </div>

                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                        <button
                            data-keep-minicart-open="true"
                            onClick={handleAddToCart}
                            className="rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 active:scale-[0.99]"
                        >
                            Add to cart
                        </button>

                        <Link
                            to="/cart"
                            className="rounded-xl border border-gray-300 px-6 py-3 text-center text-sm font-semibold transition hover:bg-gray-100"
                        >
                            Go to cart
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

