'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import ProductCard from '@/components/ProductCard'
import { searchProducts } from '@/utils/product'
import type { Product } from '@/types/product'

export default function SearchPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const query = searchParams.get('q')

  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Redirect to shop if query is empty
    if (!query || query.trim() === '') {
      router.push('/shop')
      return
    }

    const fetchSearchResults = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await searchProducts(query)
        setProducts(data.results || [])
      } catch (err: any) {
        setError(err?.message || 'Failed to search products')
        setProducts([])
      } finally {
        setLoading(false)
      }
    }

    fetchSearchResults()
  }, [query, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <div className="inline-block">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
            <p className="mt-4 text-gray-600">Searching for &ldquo;{query}&rdquo;...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <p className="text-red-600 font-semibold">{error}</p>
            <button
              onClick={() => router.push('/shop')}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Back to Shop
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        {/* Search Results Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight mb-2">
            Search Results
          </h1>
          <p className="text-gray-600">
            {products.length > 0 ? (
              <>
                Found <span className="font-semibold text-blue-600">{products.length}</span> product{products.length !== 1 ? 's' : ''} matching &ldquo;<span className="font-semibold">{query}</span>&rdquo;
              </>
            ) : (
              <>No products found for &ldquo;<span className="font-semibold">{query}</span>&rdquo;</>
            )}
          </p>
        </div>

        {/* Results Grid or Empty State */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="mb-6">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search terms or browse our categories
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => router.push('/shop')}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Browse All Products
              </button>
              <button
                onClick={() => router.push('/checkout')}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}

        {/* Back to Shop Button */}
        {products.length > 0 && (
          <div className="mt-12 text-center">
            <button
              onClick={() => router.push('/shop')}
              className="text-blue-600 hover:text-blue-700 font-medium transition"
            >
              ← Back to Shop
            </button>
          </div>
        )}
      </div>
    </div>
  )
}