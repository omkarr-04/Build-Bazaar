"use client";

import ReactMarkdown from "react-markdown";
import { useState, useRef, useEffect } from "react";
import { useChat } from "@/contexts/ChatContext";
import "./Chat.css";

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string[];
  imageUrl?: string;
  rating?: number;
}

interface Message {
  id: string;
  type: "user" | "assistant";
  content: string;
  products?: Product[];
  timestamp: Date;
}

export default function Chat() {
  const { isOpen, closeChat } = useChat();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "assistant",
      content:
        "Hi! I'm your Build Bazaar Assistant. I can help you find the perfect PC components or build. What are you looking for?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestions = [
    "Gaming Laptop",
    "Best Setup Under 60k",
    "Budget Setup",
    "CPU Recommendation",
  ];

  const categoryDetectionMap: Record<string, string> = {
    laptop: "laptop",
    gpu: "gpu",
    graphics: "GPU",
    monitor: "monitor",
    "pc build": "pc",
    "build pc": "pc",
    cpu: "cpu",
    processor: "cpu",
    ram: "ram",
    memory: "ram",
    ssd: "ssd",
    storage: "storage",
  };

  const detectCategory = (message: string): string | null => {
    const lower = message.toLowerCase();
    for (const [keyword, category] of Object.entries(categoryDetectionMap)) {
      if (lower.includes(keyword)) {
        return category;
      }
    }
    return null;
  };

  const componentMatchers: Record<string, (p: Product) => boolean> = {
    cpu: (p) => p.name.toLowerCase().includes("cpu"),
    gpu: (p) => p.name.toLowerCase().includes("gpu"),
    ram: (p) => p.name.toLowerCase().includes("ram"),
    ssd: (p) => p.name.toLowerCase().includes("ssd"),
    storage: (p) =>
      p.name.toLowerCase().includes("ssd") || p.name.toLowerCase().includes("hdd"),
    monitor: (p) =>
      p.category.toString().toLowerCase().includes("monitor") ||
      p.name.toLowerCase().includes("monitor"),
    laptop: (p) =>
      p.category.toString().toLowerCase().includes("laptop") ||
      p.name.toLowerCase().includes("laptop"),
    pc: (p) => p.category.toString().toLowerCase().includes("pc"),
  };

  const filterProductsByDetectedCategory = (
    products: Product[],
    detected: string,
  ): Product[] => {
    const matcher = componentMatchers[detected];
    if (!matcher) return products;

    const filtered = products.filter((p) => matcher(p));
    return filtered.length > 0 ? filtered : products;
  };

  const detectBudget = (message: string): number | null => {
    const lower = message.toLowerCase();

    const lakhMatch = lower.match(/(\d+)\s*lakh/);
    if (lakhMatch) {
      return parseInt(lakhMatch[1]) * 100000;
    }

    const numberMatch = lower.match(/\d{4,7}/);
    if (numberMatch) {
      return parseInt(numberMatch[0]);
    }

    return null;
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const searchProducts = async (query: string): Promise<Product[]> => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/products/search?q=${encodeURIComponent(query)}`,
      );
      if (response.ok) {
        const data = await response.json();
        return data.results || [];
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    return [];
  };

  const generatePCBuild = async (budget: number) => {
    try {
      const cpu = await searchProducts("cpu");
      const gpu = await searchProducts("gpu");
      const ram = await searchProducts("ram");
      const ssd = await searchProducts("ssd");

      const build = [
        cpu.find((p) => p.price < budget * 0.25),
        gpu.find((p) => p.price < budget * 0.45),
        ram[0],
        ssd[0],
      ].filter((item): item is Product => Boolean(item));

      const total = build.reduce((sum, item) => sum + item.price, 0);

      return { build, total };
    } catch {
      return { build: [], total: 0 };
    }
  };

  const generateResponse = (
    userMessage: string,
    products: Product[],
    categoryLabel?: string,
  ): string => {
    const lower = userMessage.toLowerCase();

    if (products.length > 0) {
      const count = products.length;
      const category = categoryLabel
        ? categoryLabel
        : Array.isArray(products[0].category)
        ? products[0].category[0]
        : products[0].category;

      if (lower.includes("build")) {
        return `I found ${count} great options for you! Here are the top products that match what you're looking for. You can click on any item to add it to your cart.`;
      } else if (lower.includes("recommend")) {
        return `Here are ${count} products I'd recommend based on your search. Check out the options below!`;
      } else {
        return `I found ${count} ${category} options that might work for you. Take a look below and let me know if you'd like recommendations within a specific budget.`;
      }
    }

    // Generic responses
    if (lower.includes("hello") || lower.includes("hi")) {
      return "Hey! How can I help you find the perfect components today?";
    } else if (lower.includes("thank")) {
      return "You're welcome! Feel free to ask me anything about PC builds or components.";
    } else if (lower.includes("budget")) {
      return "Great! Tell me your budget and what you plan to use the PC for, and I can suggest the best components for you.";
    } else if (lower.includes("help")) {
      return "I can help you:\n• Search for specific components (GPU, CPU, RAM, SSD, etc.)\n• Find products by budget\n• Build a complete PC setup\n• Compare components\n\nWhat would you like to do?";
    }

    return "I'd be happy to help! You can ask me about specific components, budgets, or complete PC builds.";
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    setTimeout(() => {
      sendMessage({
        preventDefault: () => {},
      } as React.FormEvent);
    }, 100);
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input;
    const category = detectCategory(userMessage);
    const budget = detectBudget(userMessage);
    // Add user message
    const newUserMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: userMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInput("");
    setLoading(true);

    try {
      //  PC build request
      if (userMessage.toLowerCase().includes("pc") && budget) {
        const buildData = await generatePCBuild(budget);
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: "assistant",
          content: `Here's a balanced PC build under ₹${budget.toLocaleString()} 👇
          Estimated total: ₹${buildData.total.toLocaleString()}`,
          products: buildData.build,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
        return;
      }

      //  Product search
      let rawProducts: Product[] = [];
      if (category) {
        rawProducts = await searchProducts(category);
      } else if (userMessage.length > 3) {
        rawProducts = await searchProducts(userMessage);
      }

      let products: Product[] = rawProducts;
      if (category) {
        products = filterProductsByDetectedCategory(rawProducts, category);
      }

      if (products.length > 0) {
        const responseText = generateResponse(userMessage, products, category || undefined);
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: "assistant",
          content: responseText,
          products: products.slice(0, 6),
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
        return;
      }

      //  AI fallback
      const aiResponse = await fetch("http://localhost:5000/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });
      const data = await aiResponse.json();
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: data.response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="chat-container">
      <div className="chat-header-minimal">
        <h2>Build Bazaar</h2>
        <button className="close-btn" onClick={closeChat} aria-label="Close">
          ✕
        </button>
      </div>

      <div className="chat-area">
        {/* Messages */}
        <div className="messages-container">
          {messages.map((message, idx) => (
            <div key={message.id} className={`message-group ${message.type}`}>
              {message.type === "assistant" && (
                <div className="avatar" aria-label="assistant avatar">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    width="18"
                    height="18"
                  >
                    <path d="M12 2a2 2 0 0 1 2 2v1h2a2 2 0 0 1 2 2v2h-2v-2h-8v2H6V7a2 2 0 0 1 2-2h2V4a2 2 0 0 1 2-2zm-5 11h10v2H7v-2zm-1 4h12v3H6v-3z" />
                  </svg>
                </div>
              )}
              <div className="message-wrapper">
                <div className={`message bubble ${message.type}`}>
                  <ReactMarkdown>{message.content}</ReactMarkdown>
                </div>

                {/* Product Cards */}
                {message.products && message.products.length > 0 && (
                  <div className="products-grid">
                    {message.products.map((product) => (
                      <div key={product._id} className="product-card">
                        {product.imageUrl && (
                          <div className="product-image">
                            <img
                              src={product.imageUrl}
                              alt={product.name}
                              onError={(e) => {
                                e.currentTarget.src =
                                  "https://via.placeholder.com/150?text=No+Image";
                              }}
                            />
                          </div>
                        )}
                        <div className="product-info">
                          <h4 className="product-name">{product.name}</h4>
                          <p className="product-category">
                            {Array.isArray(product.category)
                              ? product.category[0]
                              : product.category}
                          </p>
                          <div className="product-footer">
                            <span className="price">
                              ₹{product.price.toLocaleString()}
                            </span>
                            {product.rating && (
                              <span className="rating">
                                ⭐ {product.rating}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Suggestions - only show after first message */}
                {idx === 0 &&
                  message.type === "assistant" &&
                  messages.length === 1 && (
                    <div className="suggestions-container">
                      {suggestions.map((suggestion) => (
                        <button
                          key={suggestion}
                          className="suggestion-chip"
                          onClick={() => handleSuggestionClick(suggestion)}
                          disabled={loading}
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
              </div>
            </div>
          ))}

          {/* Loading indicator */}
          {loading && (
            <div className="message-group assistant">
              <div className="avatar" aria-label="assistant avatar">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  width="18"
                  height="18"
                >
                  <path d="M12 2a2 2 0 0 1 2 2v1h2a2 2 0 0 1 2 2v2h-2v-2h-8v2H6V7a2 2 0 0 1 2-2h2V4a2 2 0 0 1 2-2zm-5 11h10v2H7v-2zm-1 4h12v3H6v-3z" />
                </svg>
              </div>
              <div className="message-wrapper">
                <div className="message bubble assistant typing">
                  <span className="typing-dot"></span>
                  <span className="typing-dot"></span>
                  <span className="typing-dot"></span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="input-area">
          <form onSubmit={sendMessage} className="input-form">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage(e);
                }
              }}
              placeholder="Search for components, budgets, or builds..."
              disabled={loading}
              className="chat-input"
              autoFocus
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="send-btn"
              aria-label="Send message"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                width="20"
                height="20"
              >
                <path d="M3.4 20.3L21 12 3.4 3.7 3 10.1l13 1.9-13 1.9z" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}