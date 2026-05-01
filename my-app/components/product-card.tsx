"use client";

import "./ProductCard.css";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  const renderStars = (rating: number) => {
    const stars = [];
    const filledStars = Math.floor(rating);
    for (let i = 0; i < 5; i++) {
      if (i < filledStars) {
        stars.push(
          <span key={i} className="star filled">
            ★
          </span>,
        );
      } else {
        stars.push(
          <span key={i} className="star empty">
            ☆
          </span>,
        );
      }
    }
    return stars;
  };

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="product-image"
        />
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <div className="product-rating">
          {renderStars(product.rating || 5.0)}
          <span className="rating-text">({product.rating?.toFixed(1) || "5.0"})</span>
        </div>
        <p className="product-price">₹{product.price}</p>
        <button
          className="add-to-cart-btn"
          onClick={() =>
            addItem({
              _id: product._id,
              productId: product,
              name: product.name,
              price: product.price,
              quantity: 1,
            })
          }
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
