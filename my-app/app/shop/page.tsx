"use client";
import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getProduct } from "@/utils/product";

export default function ShopPage() {
  const [products, setProducts] = useState<{ [key: string]: any[] }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProduct();
        const groupedProducts = response.reduce((acc: any, product: any) => {
          const category = product.category || "Others";
          if (!acc[category]) acc[category] = [];
          acc[category].push(product);
          return acc;
        }, {});
        setProducts(groupedProducts);
      } catch (err) {
        setError("Failed to fetch products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading)
    return (
      <div className="text-center py-12 text-gray-600">Loading products...</div>
    );
  if (error)
    return <div className="text-center py-12 text-red-600">{error}</div>;

  const renderProductGrid = (items: any[]) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {items.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8 md:py-10">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900 tracking-tight">
            Shop Our Products
          </h1>
        </div>

        {/* Category Tabs */}
        <div className="mb-8">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="flex flex-wrap justify-center gap-2 md:gap-3 bg-transparent p-0 h-auto border-b border-gray-200 pb-4">
              <TabsTrigger
                value="all"
                className="px-5 py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-200
                  data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg
                  data-[state=inactive]:bg-gray-100 data-[state=inactive]:text-gray-700 data-[state=inactive]:hover:bg-gray-200"
              >
                All Products
              </TabsTrigger>
              {Object.keys(products).map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="px-5 py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-200
                    data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg
                    data-[state=inactive]:bg-gray-100 data-[state=inactive]:text-gray-700 data-[state=inactive]:hover:bg-gray-200"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* All Products Tab */}
            <div className="mt-8">
              <TabsContent value="all" className="mt-0">
                {renderProductGrid(Object.values(products).flat())}
              </TabsContent>

              {/* Category Tabs */}
              {Object.entries(products).map(([category, items]) => (
                <TabsContent key={category} value={category} className="mt-0">
                  {renderProductGrid(items)}
                </TabsContent>
              ))}
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
