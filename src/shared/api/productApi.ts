import type { Product } from '../../entities/product/type'

interface ProductsResponse {
  products: Product[]
  total: number
  skip: number
  limit: number
}

export const getProducts = async (): Promise<Product[]> => {
  const res = await fetch('https://dummyjson.com/products')

  if (!res.ok) {
    throw new Error(`HTTP error: ${res.status}`)
  }

  const data: ProductsResponse = await res.json()
  return data.products
}
