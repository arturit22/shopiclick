import { useEffect } from "react"
import type { AppDispatch, RootState } from "../app/store"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { fetchProducts } from "../features/products/productSlice"

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
        return <div>Loading...</div>
    }

    if (error) {
        return <div>error: {error}</div>
    }

    if (!product) {
        return <div>Product not found</div>
    }




    return (
        <div className="container mx-auto px-4 py-6">
            <div className="gird grid-cols-1 gap-8 md:grid-cols-2">
                <div className="rounded-xl border p-4">
                    <img className="h-80 w-full object-contain" src={product.thumbnail} alt={product.title} />
                </div>

                <h1 className="font-bold text-3xl">{product.title}</h1>
                <p className="mt-4 text-gray-600">{product.description}</p>
                <p className="mt-6 text-2xl font-semibold">${product.price}</p>
            </div>
        </div>
    )
}

