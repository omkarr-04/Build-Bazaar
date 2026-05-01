import { useRouter } from "next/navigation";
import { Star, Plus } from "lucide-react";
import type { Product } from "@/types/product";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
// import Image from "next/image";

// ... other imports and code ...

interface Review {
  _id?: string;
  reviewer: string;
  rating: number;
  title: string;
  comment: string;
  verified?: boolean;
  helpful?: number;
  createdAt?: string;
}

interface ProductWithReviews extends Product {
  reviews?: Review[];
}

export default function ProductCard({ product }: { product: ProductWithReviews }) {
  const { state, addItem } = useCart();
  const [isHovered, setIsHovered] = useState(false);

  // Find the product in cart to check if it exists
  const cartItem = state.items.find(
    (item) => item._id === product._id || item?.productId?._id === product._id,
  );

  // Get product rating from reviews or use stored rating
  const getProductRating = () => {
    if (product.reviews && product.reviews.length > 0) {
      const sum = product.reviews.reduce((acc, review) => acc + review.rating, 0);
      return Math.round((sum / product.reviews.length) * 10) / 10;
    }
    if (product.rating) return product.rating;
    // Use product ID to generate consistent random rating
    const hash = product._id?.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) || 0;
    const ratings = [3.5, 3.8, 4.0, 4.2, 4.5, 4.7, 4.9, 5.0];
    return ratings[hash % ratings.length];
  };

  const productRating = getProductRating();
  const reviewCount = product.reviews?.length || 0;
  const fullStars = Math.floor(productRating);
  const hasHalfStar = productRating % 1 !== 0;
  const router = useRouter();

  const handleAddToCart = () => {
    if (!cartItem) {
      addItem({
        _id: product._id,
        productId: product,
        quantity: 1,
        name: product.name,
        price: product.price,
        image: product.imageUrl,
      });
    }
  };

  const handleOpenDetails = () => {
    const categorySegment = encodeURIComponent((product.category || "Uncategorized").toString().replace(/\s+/g, "%20"));
    const detailUrl = `/shop/${categorySegment}/${product._id}`;
    router.push(detailUrl);
  };

  return (
    <div
      className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full cursor-pointer"
      onClick={(e) => {
        if ((e.target as HTMLElement).closest('button')) return;
        handleOpenDetails();
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-square bg-gray-50 overflow-hidden flex items-center justify-center">
        <img
          src={product.imageUrl}
          alt={product.name}
          className={`w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300 ${
            isHovered ? "scale-105" : "scale-100"
          }`}
        />

      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col flex-grow justify-between">
        {/* Title */}
        <h3 className="text-base font-semibold text-gray-900 mb-2 line-clamp-2 leading-tight">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={`${
                  i < fullStars
                    ? "text-yellow-400 fill-current"
                    : i === fullStars && hasHalfStar
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-600 font-medium">
            {productRating}
            {reviewCount > 0 && (
              <span className="text-gray-500"> ({reviewCount})</span>
            )}
          </span>
        </div>

        {/* Price and Button Row */}
        <div className="flex justify-between items-center mt-auto gap-3">
          {/* Price Section */}
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-gray-900">
              ₹{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-gray-500 line-through">
                ₹{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart();
            }}
            className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-200 flex items-center justify-center gap-2 whitespace-nowrap ${
              cartItem
                ? "bg-green-500 text-white hover:bg-green-600 active:bg-green-700"
                : "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800"
            }`}
          >
            {cartItem ? (
              <>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Added
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                Add to Cart
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
