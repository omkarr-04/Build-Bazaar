"use client";

import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import api from "@/utils/api";
import QRCode from "react-qr-code";
import { Trash2, Plus, Minus, CreditCard } from "lucide-react";

const CartPage = () => {
  const { state, removeItem, updateQuantity, clearCart } = useCart();
  const [step, setStep] = useState("form");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [shippingDetails, setShippingDetails] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });
  const [shippingError, setShippingError] = useState("");

  const total = Number(state.total || 0);
  const fakeUPI = "omkarsonawane04@ybl";
  const amount = total.toFixed(2);
  const qrData = `upi://pay?pa=${fakeUPI}&pn=Demo&am=${amount}&cu=INR`;
  const firstItem = state.items[0];
  const isShippingValid = Object.values(shippingDetails).every(
    (value) => value.trim().length > 0,
  );

  const handleProceedToPayment = () => {
    if (!isShippingValid) {
      setShippingError("Please fill all shipping details before proceeding.");
      return;
    }
    setShippingError("");
    setStep("payment");
  };

  const placeOrder = async () => {
    setIsPlacingOrder(true);
    try {
      await api.post("/orders", {
        source: "cart",
        shipping: {
          address: shippingDetails.address,
          city: shippingDetails.city,
          state: shippingDetails.state,
          pincode: shippingDetails.zip,
        },
      });
      await clearCart();
      setStep("success");
    } catch (error) {
      console.error("Order error:", error);
      alert("Failed to place order");
    } finally {
      setIsPlacingOrder(false);
    }
  };

  if (step === "success") {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-md mx-auto px-4">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h2>
              <p className="text-gray-600 text-center mb-6">
                Your order has been placed successfully.
              </p>
              <div className="w-full bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <p className="text-sm text-green-700">
                  You can track your order from the Orders page.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (state.isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="bg-white rounded-lg shadow-sm p-8 text-center text-gray-600">
            Loading cart...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-[1200px] mx-auto px-4">
        {step === "payment" ? (
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <CreditCard className="w-8 h-8 text-blue-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Complete Your Payment</h2>
                <div className="bg-gray-50 p-6 rounded-lg w-full mb-6">
                  <QRCode value={qrData} size={200} className="mx-auto" />
                  <div className="text-center mt-4">
                    <p className="text-sm text-gray-600">Scan with any UPI app</p>
                    <p className="font-medium text-gray-800 mt-1">{fakeUPI}</p>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-800 mb-6">Rs. {amount}</p>
                  <button
                    onClick={placeOrder}
                    disabled={isPlacingOrder}
                    className="w-full bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isPlacingOrder ? "Placing Order..." : "Confirm Order"}
                  </button>
                  <button
                    onClick={() => setStep("form")}
                    className="mt-3 text-gray-600 hover:text-gray-800"
                    disabled={isPlacingOrder}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              {state.items.length > 0 && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-7 mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-5">
                    Shipping Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your full name"
                        value={shippingDetails.fullName}
                        onChange={(e) =>
                          setShippingDetails((prev) => ({
                            ...prev,
                            fullName: e.target.value,
                          }))
                        }
                        className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-800 placeholder:text-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        placeholder="Enter your email"
                        value={shippingDetails.email}
                        onChange={(e) =>
                          setShippingDetails((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                        className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-800 placeholder:text-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address
                      </label>
                      <input
                        type="text"
                        placeholder="Street address"
                        value={shippingDetails.address}
                        onChange={(e) =>
                          setShippingDetails((prev) => ({
                            ...prev,
                            address: e.target.value,
                          }))
                        }
                        className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-800 placeholder:text-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        placeholder="City"
                        value={shippingDetails.city}
                        onChange={(e) =>
                          setShippingDetails((prev) => ({
                            ...prev,
                            city: e.target.value,
                          }))
                        }
                        className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-800 placeholder:text-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        State
                      </label>
                      <input
                        type="text"
                        placeholder="State"
                        value={shippingDetails.state}
                        onChange={(e) =>
                          setShippingDetails((prev) => ({
                            ...prev,
                            state: e.target.value,
                          }))
                        }
                        className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-800 placeholder:text-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        placeholder="ZIP"
                        value={shippingDetails.zip}
                        onChange={(e) =>
                          setShippingDetails((prev) => ({
                            ...prev,
                            zip: e.target.value,
                          }))
                        }
                        className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-800 placeholder:text-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                      />
                    </div>
                  </div>
                  {shippingError && (
                    <p className="mt-3 text-sm text-red-600">{shippingError}</p>
                  )}
                </div>
              )}

              {state.items.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">Your cart is empty</h2>
                  <p className="text-gray-600 mb-6">Add some products to your cart and they will show up here</p>
                  <button
                    onClick={() => window.history.back()}
                    className="text-blue-600 font-medium hover:text-blue-700"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-sm divide-y">
                  {state.items.map((item) => (
                    <div key={item._id || item.productId._id} className="p-6 flex items-center gap-6">
                      <div className="w-24 h-24 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={item.productId.imageUrl || item.image || "/placeholder-product.png"}
                          alt={item.name}
                          className="w-full h-full object-cover object-center"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "/placeholder-product.png";
                            (e.target as HTMLImageElement).onerror = null;
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-800">{item.name}</h3>
                        <p className="text-gray-500 text-sm mt-1">
                          {item.productId.category || "PC Component"}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center border rounded-md bg-white">
                          <button
                            onClick={() => updateQuantity(item.productId._id, item.quantity - 1)}
                            className="p-2 hover:bg-gray-50 disabled:opacity-50 transition-colors text-gray-700"
                            disabled={item.quantity <= 1}
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-5 h-5 stroke-[2.5]" />
                          </button>
                          <span className="px-4 py-2 font-medium text-gray-800 min-w-[40px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.productId._id, item.quantity + 1)}
                            className="p-2 hover:bg-gray-50 transition-colors text-gray-700"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-5 h-5 stroke-[2.5]" />
                          </button>
                        </div>
                        <div className="text-right min-w-[100px]">
                          <p className="font-medium text-gray-800">
                            Rs. {(Number(item.price) * item.quantity).toFixed(2)}
                          </p>
                          <p className="text-sm text-gray-500">
                            Rs. {Number(item.price).toFixed(2)} each
                          </p>
                        </div>
                        <button
                          onClick={() => removeItem(item.productId._id)}
                          className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {state.items.length > 0 && (
              <div className="w-full lg:w-[380px]">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h2>
                  <div className="space-y-3">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal ({state.items.length} items)</span>
                      <span>Rs. {amount}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Shipping</span>
                      <span className="text-green-600">Free</span>
                    </div>
                    <div className="border-t pt-3">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-gray-800">Total</span>
                        <span className="font-bold text-xl text-gray-800">Rs. {amount}</span>
                      </div>
                    </div>
                  </div>
                  {firstItem && (
                    <div className="mt-4 rounded-xl border border-gray-100 bg-gray-50 p-3">
                      <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">
                        Item Preview
                      </p>
                      <div className="flex items-center gap-3">
                        <img
                          src={
                            firstItem.productId.imageUrl ||
                            firstItem.image ||
                            "/placeholder-product.png"
                          }
                          alt={firstItem.name}
                          className="w-12 h-12 rounded-md object-cover object-center bg-white border border-gray-200"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "/placeholder-product.png";
                            (e.target as HTMLImageElement).onerror = null;
                          }}
                        />
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-gray-800 truncate">
                            {firstItem.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            Qty: {firstItem.quantity}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  <button
                    onClick={handleProceedToPayment}
                    className="w-full mt-6 bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!isShippingValid}
                  >
                    Proceed to Payment
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
