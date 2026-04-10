import { ProductCard } from "../entities/product/ProductCard"
import { ProductCardSkeleton } from "../entities/product/ProductCardSkeleton"
import type {Product} from '../entities/product/type'

interface ProductListProps {
  products: Product[],
  loading: boolean,
  error: string | null
}

export const ProductList = ({products, loading, error}: ProductListProps) => {
    if (loading) {
      return (
        <div className="grid gird-cols 1 gap-6 sm:gird-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({length: 8}).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      )
    }

    if (error) {
      return <p className="text-center mt-10 text-red-500">{error}</p>
    }
    
    if (!loading && !error && products.length === 0) {
      return (
        <div className="mt-10 text-center text-gray-500">
          <p className="text-lg font-medium">No products found</p>
          <p className="text-sm">Try another search or category</p>
        </div>
      )
    }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product}/>
      ))}
    </div>
  )
}


