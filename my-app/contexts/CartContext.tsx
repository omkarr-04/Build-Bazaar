"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
} from "react";
import type { Product, CartItem } from "@/types/product";
import api from "@/utils/api";

interface CartState {
  items: CartItem[];
  total: number;
  isLoading: boolean;
}

interface CartContextType {
  state: CartState;
  addItem: (item: CartItem) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  refreshCart: () => Promise<void>;
  clearCart: () => Promise<void>;
}

type CartAction =
  | { type: "SET_CART"; payload: { items: CartItem[]; total: number } }
  | { type: "SET_LOADING"; payload: boolean };

const CartContext = createContext<CartContextType | undefined>(undefined);

const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((sum, item) => {
    const price = Number(item.price) || 0;
    const quantity = Number(item.quantity) || 0;
    return sum + price * quantity;
  }, 0);
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "SET_CART":
      return {
        ...state,
        items: action.payload.items,
        total: action.payload.total,
      };
    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

const normalizeCategory = (rawCategory: unknown): string => {
  if (Array.isArray(rawCategory)) {
    return String(rawCategory[0] ?? "PC Component");
  }
  return String(rawCategory ?? "PC Component");
};

const normalizeProduct = (item: any): Product => {
  const rawProduct =
    item?.productId && typeof item.productId === "object" ? item.productId : {};

  const images = Array.isArray(rawProduct.images)
    ? rawProduct.images.map((img: any) => ({
        url: String(img?.url ?? ""),
        alt: String(img?.alt ?? ""),
      }))
    : [];

  return {
    _id: String(rawProduct._id ?? item?.productId ?? item?._id ?? ""),
    name: String(rawProduct.name ?? item?.name ?? "Item"),
    price: Number(rawProduct.price ?? item?.price ?? 0),
    originalPrice:
      rawProduct.originalPrice !== undefined
        ? Number(rawProduct.originalPrice)
        : undefined,
    description: String(rawProduct.description ?? ""),
    imageUrl: String(rawProduct.imageUrl ?? rawProduct.image ?? item?.image ?? ""),
    category: normalizeCategory(rawProduct.category ?? item?.category),
    stock: Number(rawProduct.stock ?? 0),
    additionalInfo: {
      weight: String(rawProduct.additionalInfo?.weight ?? ""),
      brand: String(rawProduct.additionalInfo?.brand ?? ""),
      productCategory: String(rawProduct.additionalInfo?.productCategory ?? ""),
      certification: String(rawProduct.additionalInfo?.certification ?? ""),
      warranty: String(rawProduct.additionalInfo?.warranty ?? ""),
      _id: String(rawProduct.additionalInfo?._id ?? ""),
    },
    createdAt: String(rawProduct.createdAt ?? ""),
    updatedAt: String(rawProduct.updatedAt ?? ""),
    __v: Number(rawProduct.__v ?? 0),
    images,
  };
};

const normalizeCartItems = (items: any[]): CartItem[] => {
  return items.map((item: any) => {
    const product = normalizeProduct(item);

    return {
      _id: String(item?._id ?? product._id),
      productId: product,
      name: String(item?.name ?? product.name),
      price: Number(item?.price ?? product.price ?? 0),
      quantity: Math.max(1, Number(item?.quantity ?? 1)),
      image: String(item?.image ?? product.imageUrl ?? ""),
    };
  });
};

const toCartState = (payload: any): { items: CartItem[]; total: number } => {
  const items = normalizeCartItems(Array.isArray(payload?.items) ? payload.items : []);
  const total = Number(payload?.total);
  return {
    items,
    total: Number.isFinite(total) ? total : calculateTotal(items),
  };
};

const hasToken = (): boolean => {
  if (typeof window === "undefined") {
    return false;
  }
  return Boolean(localStorage.getItem("token"));
};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    total: 0,
    isLoading: true,
  });

  const refreshCart = useCallback(async () => {
    if (!hasToken()) {
      dispatch({ type: "SET_CART", payload: { items: [], total: 0 } });
      dispatch({ type: "SET_LOADING", payload: false });
      return;
    }

    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const response = await api.get("/cart");
      dispatch({ type: "SET_CART", payload: toCartState(response.data) });
    } catch (error) {
      console.error("Failed to fetch cart:", error);
      dispatch({ type: "SET_CART", payload: { items: [], total: 0 } });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }, []);

  useEffect(() => {
    void refreshCart();
  }, [refreshCart]);

  const addItem = async (item: CartItem) => {
    if (!hasToken()) {
      alert("Please login to add items to cart.");
      return;
    }

    try {
      const response = await api.post("/cart/add", {
        productId: item.productId._id,
        quantity: item.quantity || 1,
      });
      dispatch({ type: "SET_CART", payload: toCartState(response.data) });
    } catch (error) {
      console.error("Failed to add item:", error);
      alert("Failed to add item to cart.");
    }
  };

  const removeItem = async (itemId: string) => {
    if (!hasToken()) {
      return;
    }

    try {
      const response = await api.delete(`/cart/remove/${itemId}`);
      dispatch({ type: "SET_CART", payload: toCartState(response.data) });
    } catch (error) {
      console.error("Failed to remove item:", error);
      alert("Failed to remove item from cart.");
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (!hasToken()) {
      return;
    }

    if (quantity < 1) {
      await removeItem(itemId);
      return;
    }

    try {
      const response = await api.put("/cart/update", {
        productId: itemId,
        quantity,
      });
      dispatch({ type: "SET_CART", payload: toCartState(response.data) });
    } catch (error) {
      console.error("Failed to update quantity:", error);
      alert("Failed to update item quantity.");
    }
  };

  const clearCart = async () => {
    dispatch({ type: "SET_CART", payload: { items: [], total: 0 } });

    if (!hasToken()) {
      return;
    }

    try {
      await api.delete("/cart/clear");
    } catch (error) {
      console.error("Failed to clear cart:", error);
    }
  };

  return (
    <CartContext.Provider
      value={{ state, addItem, removeItem, updateQuantity, refreshCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
