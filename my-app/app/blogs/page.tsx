"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const BLOG_POSTS = [
  {
    id: 1,
    title: "How to Choose the Perfect GPU for Your Build",
    excerpt:
      "A comprehensive guide to selecting the right graphics card for your needs and budget...",
    category: "Hardware",
    date: "January 11, 2026",
    readTime: "5 min read",
    imageUrl: "/images/gpu-guide.png",
  },
  {
    id: 2,
    title: "The Ultimate Guide to PC Cable Management",
    excerpt:
      "Learn professional techniques for clean and efficient cable management in your PC build...",
    category: "Building Tips",
    date: "January 10, 2026",
    readTime: "7 min read",
    imageUrl: "/images/cable-management.png",
  },
  {
    id: 3,
    title: "Understanding CPU Cooling Solutions",
    excerpt:
      "Everything you need to know about air cooling vs liquid cooling for your processor...",
    category: "Cooling",
    date: "January 9, 2026",
    readTime: "6 min read",
    imageUrl: "/images/cpu-cooling.png",
  },
];

const CATEGORIES = [
  "All",
  "Hardware",
  "Building Tips",
  "Cooling",
  "Performance",
  "Reviews",
];

export default function Blogs() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const router = useRouter();

  const filteredPosts =
    selectedCategory === "All"
      ? BLOG_POSTS
      : BLOG_POSTS.filter((post) => post.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            BuildBazaar Blog
          </h1>
          <p className="text-xl text-gray-600">
            Latest news, guides, and insights about PC building
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              {/* Image Placeholder */}
              {/* <div className="h-48 bg-gray-200"></div> */}
              <div className="relative h-48 w-full">
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-6">
                <div className="flex items-center mb-4">
                  <span className="text-sm font-medium text-blue-600">
                    {post.category}
                  </span>
                  <span className="mx-2 text-gray-300">•</span>
                  <span className="text-sm text-gray-500">{post.readTime}</span>
                </div>

                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  {post.title}
                </h2>

                <p className="text-gray-600 mb-4">{post.excerpt}</p>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{post.date}</span>
                  <button
                    onClick={() => router.push(`/blogs/${post.id}`)}
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                  >
                    Read More →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-16 bg-blue-600 rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Stay Updated with BuildBazaar
          </h2>
          <p className="text-blue-100 mb-6">
            Subscribe to our newsletter for the latest PC building tips and
            tricks
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="px-6 py-2 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
