"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getProductDetails } from "@/utils/product";
import { useCart } from "@/contexts/CartContext";
import { Plus, Star, CheckCircle } from "lucide-react";

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

interface Product {
    _id: string;
    name: string;
    description: string;
    category: string;
    price: number;
    originalPrice?: number;
    stock: number;
    imageUrl: string;
    rating?: number;
    reviews?: Review[];
}

function RatingBar({ percent }: { percent: number }) {
    const rounded = Math.round(percent);
    const widthClass =
        rounded === 0 ? "w-0" :
        rounded <= 10 ? "w-[10%]" :
        rounded <= 20 ? "w-[20%]" :
        rounded <= 30 ? "w-[30%]" :
        rounded <= 40 ? "w-[40%]" :
        rounded <= 50 ? "w-[50%]" :
        rounded <= 60 ? "w-[60%]" :
        rounded <= 70 ? "w-[70%]" :
        rounded <= 80 ? "w-[80%]" :
        rounded <= 90 ? "w-[90%]" : "w-full";
    return <div className={`bg-yellow-400 h-1.5 rounded-full ${widthClass}`}></div>;
}

export default function ProductDetailPage() {
    const params = useParams();
    const productId = params.id as string;
    const category = params.category as string;

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { state, addItem } = useCart();

    useEffect(() => {
        if (!productId) return;

        const load = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await getProductDetails(productId);
                setProduct(data);
            } catch (err: any) {
                setError(err?.message || "Unable to load product details.");
            } finally {
                setLoading(false);
            }
        };

        load();
    }, [productId]);

    const cartItem = product
        ? state.items.find(
            (item) =>
                item._id === product._id || item?.productId?._id === product._id,
        )
        : null;

    const handleAddToCart = () => {
        if (!product || cartItem) return;
        addItem({
            _id: product._id,
            productId: product,
            quantity: 1,
            name: product.name,
            price: product.price,
            image: product.imageUrl,
        });
    };

    const calculateAverageRating = () => {
        if (!product?.reviews || product.reviews.length === 0) {
            return product?.rating || 0;
        }
        const sum = product.reviews.reduce((acc, review) => acc + review.rating, 0);
        return Math.round((sum / product.reviews.length) * 10) / 10;
    };

    const getRatingDistribution = () => {
        const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
        if (product?.reviews) {
            product.reviews.forEach((review) => {
                distribution[review.rating as keyof typeof distribution]++;
            });
        }
        return distribution;
    };

    const renderStars = (rating: number) => {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        return (
            <div className="flex gap-0.5">
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
        );
    };

    if (loading) {
        return (
            <div className="p-12 text-center text-gray-600">Loading product...</div>
        );
    }

    if (error) {
        return <div className="p-12 text-center text-red-600">{error}</div>;
    }

    if (!product) {
        return (
            <div className="p-12 text-center text-gray-700">Product not found.</div>
        );
    }

    const avgRating = calculateAverageRating();
    const ratingDist = getRatingDistribution();
    const reviewCount = product.reviews?.length || 0;

    return (
        <div className="min-h-screen bg-white py-10">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                        {product.name}
                    </h1>
                    <Link
                        href={`/shop/${encodeURIComponent(category || "all")}`}
                        className="text-sm text-blue-600 hover:text-blue-800"
                    >
                        ← Back to {category || "Shop"}
                    </Link>
                </div>

                <div className="grid gap-8 lg:grid-cols-2">
                    <div className="rounded-xl bg-gray-50 p-4 shadow-sm">
                        <img
                            src={product.imageUrl || "/images/placeholder.png"}
                            alt={product.name}
                            className="w-full h-80 object-contain rounded-lg"
                        />
                    </div>

                    <div className="space-y-5">
                        <div>
                            <p className="text-sm uppercase tracking-wide text-gray-500">
                                {product.category || "Uncategorized"}
                            </p>
                            <p className="text-3xl font-extrabold text-gray-900 mt-2">
                                ₹{product.price?.toLocaleString() ?? "N/A"}
                            </p>
                            {product.originalPrice && (
                                <p className="text-sm text-gray-500 line-through">
                                    ₹{product.originalPrice?.toLocaleString()}
                                </p>
                            )}
                        </div>

                        {/* Rating Summary */}
                        {reviewCount > 0 && (
                            <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                                <div className="flex items-center gap-4">
                                    <div className="text-center">
                                        <p className="text-2xl font-bold text-gray-900">{avgRating}</p>
                                        <div className="mt-1">{renderStars(avgRating)}</div>
                                        <p className="text-xs text-gray-600 mt-1">
                                            {reviewCount} {reviewCount === 1 ? "review" : "reviews"}
                                        </p>
                                    </div>
                                    <div className="flex-1">
                                        {[5, 4, 3, 2, 1].map((rating) => (
                                            <div key={rating} className="flex items-center gap-2 mb-1">
                                                <span className="text-xs text-gray-600 w-8">{rating}★</span>
                                                <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                                                    <RatingBar percent={reviewCount > 0 ? (ratingDist[rating as keyof typeof ratingDist] / reviewCount) * 100 : 0} />
                                                </div>
                                                <span className="text-xs text-gray-600 w-6">
                                                    {ratingDist[rating as keyof typeof ratingDist]}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                            <h2 className="text-lg font-semibold text-gray-800 mb-2">
                                Description
                            </h2>
                            <p className="text-gray-700 leading-relaxed">
                                {product.description ||
                                    "No description available for this product."}
                            </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                            <button
                                onClick={handleAddToCart}
                                className={`rounded-lg px-5 py-3 font-semibold transition ${cartItem
                                    ? "bg-green-500 text-white hover:bg-green-600"
                                    : "bg-blue-600 text-white hover:bg-blue-700"
                                }`}
                            >
                                {cartItem ? "Added to cart" : "Add to cart"}
                            </button>
                            <span className="text-sm text-gray-500">
                                {product.stock
                                    ? `In stock: ${product.stock}`
                                    : "Stock info unavailable"}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Reviews Section */}
                {product.reviews && product.reviews.length > 0 && (
                    <div className="mt-12 border-t pt-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">
                            Customer Reviews
                        </h2>
                        <div className="space-y-4">
                            {product.reviews.map((review, index) => (
                                <div
                                    key={review._id || index}
                                    className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition"
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <h3 className="font-semibold text-gray-900">
                                                    {review.reviewer}
                                                </h3>
                                                {review.verified && (
                                                    <span className="flex items-center gap-1 bg-green-50 text-green-700 px-2 py-1 rounded text-xs font-medium">
                                                        <CheckCircle size={12} />
                                                        Verified Purchase
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {renderStars(review.rating)}
                                                <span className="text-xs text-gray-600">
                                                    {review.rating} out of 5
                                                </span>
                                            </div>
                                        </div>
                                        {review.createdAt && (
                                            <span className="text-xs text-gray-500">
                                                {new Date(review.createdAt).toLocaleDateString()}
                                            </span>
                                        )}
                                    </div>

                                    <h4 className="font-semibold text-gray-900 mb-2">
                                        {review.title}
                                    </h4>
                                    <p className="text-gray-700 text-sm leading-relaxed mb-3">
                                        {review.comment}
                                    </p>

                                    {review.helpful !== undefined && (
                                        <button className="text-xs text-gray-600 hover:text-gray-900 transition">
                                            👍 Helpful ({review.helpful})
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
