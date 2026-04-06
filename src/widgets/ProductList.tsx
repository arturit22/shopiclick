import { ProductCard } from "../entities/product/ProductCard"
import type {Product} from '../entities/product/type'

interface ProductListProps {
  products: Product[],
  loading: boolean,
  error: string | null
}

export const ProductList = ({products, loading, error}: ProductListProps) => {
    if (loading) return <div>Loading...</div>
    if (error) return <div>Error... {error}</div>
    if (!loading && !error && products.length === 0) return <div>Products not found...</div>

  return (
    <div className="grid grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product}/>
      ))}
    </div>
  )
}


