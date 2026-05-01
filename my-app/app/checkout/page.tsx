"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import QRCode from "react-qr-code";
import { CreditCard, ArrowLeft } from "lucide-react";
import api from "@/utils/api";
import {
  BUILD_ADDONS,
  COMPONENT_IMAGES,
  COMPONENT_PRICES,
} from "@/app/build/config";

interface BuildStateWithAddons {
  chipset: string | null;
  case: string | null;
  motherboard: string | null;
  gpu: string | null;
  cpu: string | null;
  powerSupply: string | null;
  ram: string | null;
  addons: string[];
}

const placeholderImage = "/placeholder-product.png";

export default function CheckoutPage() {
  const router = useRouter();
  console.log("CHECKOUT RENDER");
  const [step, setStep] = useState("form");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [buildState, setBuildState] = useState<BuildStateWithAddons>({
    chipset: null,
    case: null,
    motherboard: null,
    gpu: null,
    cpu: null,
    powerSupply: null,
    ram: null,
    addons: [],
  });

  useEffect(() => {
    const savedBuild = localStorage.getItem("pc_build");
    if (savedBuild) {
      try {
        setBuildState(JSON.parse(savedBuild));
      } catch (error) {
        console.error("Failed to load build:", error);
      }
    }
  }, []);

  const calculateTotal = () => {
    let total = 0;

    Object.entries(buildState).forEach(([key, value]) => {
      if (key !== "addons" && value && COMPONENT_PRICES[value]) {
        total += COMPONENT_PRICES[value];
      }
    });

    buildState.addons.forEach((addonId) => {
      const addon = BUILD_ADDONS.find((item) => item.id === addonId);
      if (addon) {
        total += addon.price;
      }
    });

    return total;
  };

  const getBuildOrderItems = () => {
    const componentItems = Object.entries(buildState)
      .filter(([key, value]) => key !== "addons" && Boolean(value))
      .map(([key, value]) => {
        const name = value as string;
        const price = COMPONENT_PRICES[name] || 0;
        const image = COMPONENT_IMAGES[name] || placeholderImage;

        return {
          _id: `build_${key}_${name}`,
          name,
          price,
          quantity: 1,
          productId: {
            _id: `build_${key}_${name}`,
            name,
            price,
            image,
            category: "PC Component",
          },
          image,
        };
      });

    const addonItems = buildState.addons.flatMap((addonId) => {
      const addon = BUILD_ADDONS.find((item) => item.id === addonId);
      if (!addon) {
        return [];
      }

      return [
        {
          _id: `build_addon_${addon.id}`,
          name: addon.name,
          price: addon.price,
          quantity: 1,
          productId: {
            _id: `build_addon_${addon.id}`,
            name: addon.name,
            price: addon.price,
            image: placeholderImage,
            category: "Addon",
          },
          image: placeholderImage,
        },
      ];
    });

    return [...componentItems, ...addonItems];
  };

  const total = calculateTotal();
  const fakeUPI = "omkarsonawane04@ybl";
  const amount = total.toFixed(2);
  const qrData = `upi://pay?pa=${fakeUPI}&pn=Demo&am=${amount}&cu=INR`;

  const placeOrder = async () => {
    if (!address || !city || !state || !pincode) {
      alert("Please fill all shipping details");
      return;
    }

    setIsPlacingOrder(true);
    try {
      console.log("SENDING SHIPPING:", { address, city, state, pincode });
      const response = await api.post("/orders", {
        items: getBuildOrderItems(),
        shipping: {
          address,
          city,
          state,
          pincode,
        },
      });
      setTransactionId(response?.data?.transactionId || "");

      setStep("success");

      setTimeout(() => {
        localStorage.removeItem("pc_build");
        setTimeout(() => {
          router.push("/");
        }, 1500);
      }, 1500);
    } catch (error) {
      console.error("Order error:", error);
      alert("Failed to place order");
    } finally {
      setIsPlacingOrder(false);
    }
  };

  const handleBackToReview = () => {
    router.push("/build/review");
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
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Payment Successful!
              </h2>
              <p className="text-gray-600 text-center mb-6">
                Your order has been placed successfully. Redirecting to home...
              </p>
              <div className="w-full bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <p className="text-sm text-green-700">
                  Order confirmation will be sent to your email
                </p>
                {transactionId ? (
                  <p className="text-sm text-green-800 mt-2 font-medium">
                    Transaction ID: {transactionId}
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === "payment") {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-md mx-auto px-4">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <CreditCard className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Complete Your Payment
              </h2>
              <div className="bg-gray-50 p-6 rounded-lg w-full mb-6">
                <QRCode value={qrData} size={200} className="mx-auto" />
                <div className="text-center mt-4">
                  <p className="text-sm text-gray-600">Scan with any UPI app</p>
                  <p className="font-medium text-gray-800 mt-1">{fakeUPI}</p>
                </div>
              </div>
              <div className="text-center w-full">
                <p className="text-2xl font-bold text-gray-800 mb-6">
                  Rs. {amount}
                </p>
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
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={handleBackToReview}
            className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
            title="Back to review"
            aria-label="Back to review"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-7">
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
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
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
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
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
                    value={state}
                    onChange={(e) => setState(e.target.value)}
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
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-800 placeholder:text-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                  />
                </div>
              </div>
              <button
                onClick={() => setStep("payment")}
                className="w-full mt-6 bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors"
              >
                Continue to Payment
              </button>
            </div>
          </div>

          <div className="w-full">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-7 lg:sticky lg:top-24">
              <h2 className="text-xl font-semibold text-gray-900 mb-5">
                Order Summary
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>Rs. {amount}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="border-t border-gray-100 pt-3">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-900">Total</span>
                    <span className="font-bold text-2xl text-gray-900">
                      Rs. {amount}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
