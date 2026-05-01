"use client";

import type { Product } from "@/types/product";
import "./Products.css";
import Image from "next/image";
import AirPodsMax from "./images/category/AirPodsMax.png";
import AppleWatch from "./images/category/applewatch.png";
import Monitor from "./images/category/monitor.png";
import { useEffect, useState } from "react";
import { getProduct } from "@/utils/product";
import ProductCard from "./ProductCard";

const Products = () => {
  const [products, setProducts] = useState<Record<string, Product[]>>({});
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProduct();
        const groupedProducts = response.reduce(
          (acc: Record<string, Product[]>, product: Product) => {
            const category = product.category || "Others";
            if (!acc[category]) acc[category] = [];
            acc[category].push(product);
            return acc;
          },
          {} as Record<string, Product[]>,
        );

        setProducts(groupedProducts);
        const flatProducts = Object.values(groupedProducts).flat() as Product[];
        setAllProducts(flatProducts);
        setDisplayedProducts(flatProducts.slice(0, 3));
      } catch (err) {
        setError("Failed to fetch products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleLoadMore = () => {
    setDisplayedProducts(allProducts);
  };

  if (loading) return <div className="loading">Loading products...</div>;
  if (error) return <div className="error">{error}</div>;
  return (
    <section className="products">
      <div className="container">
        <h2 className="section-title">Featured Products</h2>
        <div className="product-grid">
          {displayedProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
        {displayedProducts.length < allProducts.length && (
          <div className="load-more-container">
            <button className="load-more-btn" onClick={handleLoadMore}>
              Load More
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Products;
