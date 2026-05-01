'use client'

import { Search, ShoppingCart } from 'lucide-react'
import { useState, useEffect } from 'react'
import './SearchBar.css'
import { useRouter } from 'next/navigation'
import api from '@/utils/api'
import type { Product } from '@/types/product'

const SearchBar = () => {
  const [focused, setFocused] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [suggestions, setSuggestions] = useState<Product[]>([])
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const router = useRouter()

  // Fetch products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products')
        setAllProducts(response.data)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }
    fetchProducts()
  }, [])

  const handleCartClick = () => {
    router.push('/cart')
  }

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    if (term.length > 0) {
      const filtered = allProducts.filter(product =>
        product.name.toLowerCase().includes(term.toLowerCase()) ||
        // product.category.toLowerCase().includes(term.toLowerCase())
        String(product.category).toLowerCase().includes(term.toLowerCase())
      )
      setSuggestions(filtered.slice(0, 6)) // Limit to 6 suggestions
    } else {
      setSuggestions([])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      setFocused(false)
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`)
    }
  }

  const handleSuggestionClick = (product: Product) => {
    setSearchTerm(product.name)
    setFocused(false)
    router.push(`/product/${product._id}`)
  }

  return (
    <div className="search-container">
      <div className="search-layout">
        <div className={`search-wrapper ${focused ? 'focused' : ''}`}>
          <form onSubmit={handleSubmit} className="search-box">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search for products, brands and more..."
              onFocus={() => setFocused(true)}
              onBlur={() => setTimeout(() => setFocused(false), 200)}
            />
          </form>
          {focused && (suggestions.length > 0 || searchTerm.length === 0) && (
            <div className="search-suggestions">
              <div className="popular-searches">
                <h4>{searchTerm.length === 0 ? 'Popular Products' : 'Suggestions'}</h4>
                <div className="suggestion-list">
                  {searchTerm.length === 0 ? (
                    allProducts.slice(0, 6).map((product) => (
                      <button
                        key={product._id}
                        className="suggestion-item"
                        onClick={() => handleSuggestionClick(product)}
                      >
                        <div className="flex items-center gap-2">
                          <span>{product.name}</span>
                          <span className="text-sm text-gray-500">in {product.category}</span>
                        </div>
                        <span className="text-sm font-medium">₹{product.price}</span>
                      </button>
                    ))
                  ) : (
                    suggestions.map((product) => (
                      <button
                        key={product._id}
                        className="suggestion-item"
                        onClick={() => handleSuggestionClick(product)}
                      >
                        <div className="flex items-center gap-2">
                          <span>{product.name}</span>
                          <span className="text-sm text-gray-500">in {product.category}</span>
                        </div>
                        <span className="text-sm font-medium">₹{product.price}</span>
                      </button>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
        <button className="cart-button" onClick={handleCartClick} aria-label="Go to cart">
          <ShoppingCart size={24} />
        </button>
      </div>
    </div>
  )
}

export default SearchBar