"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Check } from "lucide-react";

interface BuildState {
    chipset: string | null;
    case: string | null;
    motherboard: string | null;
    gpu: string | null;
    cpu: string | null;
    powerSupply: string | null;
    ram: string | null;
    addons?: string[];
}

interface Addon {
    id: string;
    name: string;
    price: number;
    description: string;
}

export default function ReviewPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [buildState, setBuildState] = useState<BuildState>({
        chipset: null,
        case: null,
        motherboard: null,
        gpu: null,
        cpu: null,
        powerSupply: null,
        ram: null,
        addons: [],
    });

    const COMPONENT_IMAGES: Record<string, string> = {
        // GPU
        "RTX 4060": "/images/rtx-4080.png",
        "RTX 4080": "/images/rtx-4080.png",
        "RX 6500 XT": "/images/rx-6500xt.jpg",
        "RTX 5070": "/images/rtx-4080.png",
        // CPU
        "Ryzen 9 9950X3D": "/images/amd-ryzen-7.jpg",
        "Core i9-13900K": "/images/intel-i7.jpg",
        "Ryzen 7 7900X": "/images/amd-ryzen-7.jpg",
        "Core i7-13700K": "/images/intel-i7.jpg",
        // RAM
        "Corsair Vengeance 32GB": "/images/ddr5-ram.jpg",
        "G.Skill Trident Z5 32GB": "/images/ddr5-ram.jpg",
        "Crucial Ballistix 32GB": "/images/ddr4-ram.jpg",
        "Kingston Fury 32GB": "/images/ddr5-ram.jpg",
        // Case
        "Corsair 3500X": "/images/gaming-cabinet.jpg",
        "Cooler Master Elite 681": "/images/gaming-cabinet.jpg",
        "Lian Li Lancool 216": "/images/gaming-cabinet.jpg",
        "MSI MAG PANO": "/images/matx-cabinet.jpg",
        // Motherboard
        "ASUS ROG": "/images/gaming-motherboard.jpg",
        "MSI MPG": "/images/gaming-motherboard.jpg",
        "Gigabyte AORUS": "/images/gaming-motherboard.jpg",
        "ASRock Steel Legend": "/images/gaming-motherboard.jpg",
        // Power Supply
        "Corsair RM850x": "/images/psu-750w.jpg",
        "EVGA SuperNOVA 850PS": "/images/psu-750w.jpg",
        "Seasonic Focus GX-850": "/images/psu-750w.jpg",
        "Asus 750W": "/images/psu-750w.jpg",
        // Chipset
        AMD: "/images/amd-ryzen-7.jpg",
        Intel: "/images/intel-i7.jpg",
    };

    const addons: Addon[] = [
        {
            id: "windows",
            name: "Windows 11 Pro",
            price: 199.99,
            description: "Pre-installed Windows 11 Professional",
        },
        {
            id: "warranty",
            name: "Extended Warranty",
            price: 99.99,
            description: "3-year extended warranty coverage",
        },
        {
            id: "assembly",
            name: "Professional Assembly",
            price: 79.99,
            description: "Expert assembly and testing",
        },
    ];

    const componentPrices: Record<string, number> = {
        // GPU Prices
        "RTX 4060": 16999,
        "RTX 4080": 42999,
        "RX 6500 XT": 22999,
        "RTX 5070": 35999,
        // CPU Prices
        "Ryzen 9 9950X3D": 52999,
        "Core i9-13900K": 49999,
        "Ryzen 7 7900X": 32999,
        "Core i7-13700K": 38999,
        // RAM Prices
        "Corsair Vengeance 32GB": 12999,
        "G.Skill Trident Z5 32GB": 13999,
        "Crucial Ballistix 32GB": 11999,
        "Kingston Fury 32GB": 12499,
        // Case Prices
        "Corsair 3500X": 8999,
        "Cooler Master Elite 681": 6999,
        "Lian Li Lancool 216": 7999,
        "MSI MAG PANO": 9999,
        // Motherboard Prices
        "ASUS ROG": 24999,
        "MSI MPG": 22999,
        "Gigabyte AORUS": 23999,
        "ASRock Steel Legend": 21999,
        // Power Supply Prices
        "Corsair RM850x": 10999,
        "EVGA SuperNOVA 850PS": 9999,
        "Seasonic Focus GX-850": 10499,
        "Asus 750W": 9499,
    };

    useEffect(() => {
        // Load build state from localStorage
        const savedBuild = localStorage.getItem("pc_build");
        console.log("Saved build:", savedBuild);
        if (savedBuild) {
            try {
                const build = JSON.parse(savedBuild);
                console.log("Parsed build:", build);
                setBuildState(build);
            } catch (error) {
                console.error("Failed to load build:", error);
            }
        }
        setIsLoading(false);
    }, []);

    const handleCheckout = () => {
        router.push("/checkout");
    };

    const handleBackToBuild = () => {
        router.push("/build");
    };

    const calculateTotal = () => {
        let total = 0;
        Object.entries(buildState).forEach(([key, value]) => {
            if (key !== "addons" && value && componentPrices[value as string]) {
                total += componentPrices[value as string];
            }
        });
        if (buildState.addons) {
            buildState.addons.forEach((addonId) => {
                const addon = addons.find((a) => a.id === addonId);
                if (addon) total += addon.price;
            });
        }
        return total;
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <p className="text-gray-600">Loading build details...</p>
            </div>
        );
    }

    return (
        <div className="max-w-[1400px] mx-auto p-6 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <button
                    onClick={handleBackToBuild}
                    aria-label="Back to build"
                    className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                >
                    <ArrowLeft className="w-6 h-6 text-gray-600" />
                </button>
                <h1 className="text-2xl font-bold text-gray-800">Review Your Build</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Review Section */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Components Section */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">
                            Selected Components
                        </h2>
                        <div className="space-y-4">
                            {Object.entries(buildState)
                                .filter(([key]) => key !== "addons")
                                .map(([key, value]) => {
                                    if (!value) return null;
                                    return (
                                        <div
                                            key={key}
                                            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                                        >
                                            <div className="flex items-center gap-4 flex-1">
                                                {COMPONENT_IMAGES[value as string] && (
                                                    <img
                                                        src={COMPONENT_IMAGES[value as string]}
                                                        alt={value as string}
                                                        className="w-20 h-20 object-contain rounded bg-white flex-shrink-0"
                                                        onError={(e) => {
                                                            (e.target as HTMLImageElement).src =
                                                                "/images/gaming-cabinet.jpg";
                                                        }}
                                                    />
                                                )}
                                                <div>
                                                    <p className="text-sm text-gray-600 capitalize">
                                                        {key === "powerSupply" ? "Power Supply" : key}
                                                    </p>
                                                    <p className="font-semibold text-gray-800">{value}</p>
                                                </div>
                                            </div>
                                            <div className="text-right ml-4">
                                                <p className="font-semibold text-gray-800">
                                                    ₹
                                                    {componentPrices[value as string]?.toLocaleString(
                                                        "en-IN",
                                                    ) || "0"}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>

                    {/* Add-ons Section */}
                    {buildState.addons && buildState.addons.length > 0 && (
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                Add-ons
                            </h2>
                            <div className="space-y-4">
                                {buildState.addons.map((addonId) => {
                                    const addon = addons.find((a) => a.id === addonId);
                                    return addon ? (
                                        <div
                                            key={addon.id}
                                            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                                        >
                                            <div>
                                                <p className="font-semibold text-gray-800">
                                                    {addon.name}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    {addon.description}
                                                </p>
                                            </div>
                                            <p className="font-semibold text-gray-800 ml-4">
                                                ₹{addon.price.toLocaleString("en-IN")}
                                            </p>
                                        </div>
                                    ) : null;
                                })}
                            </div>
                        </div>
                    )}

                    {/* Performance Indicator */}
                    <div className="bg-blue-50 rounded-lg shadow-sm p-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">
                            Build Performance Level
                        </h2>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <Check className="w-5 h-5 text-green-600" />
                                <span className="text-gray-700">
                                    Gaming Ready - 1440p High Settings
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Check className="w-5 h-5 text-green-600" />
                                <span className="text-gray-700">Content Creation Capable</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Check className="w-5 h-5 text-green-600" />
                                <span className="text-gray-700">
                                    Future Upgrade Path Available
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Price Summary Card */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-6">
                            Order Summary
                        </h3>

                        <div className="space-y-4 mb-6">
                            {Object.entries(buildState)
                                .filter(([key]) => key !== "addons")
                                .map(([key, value]) => {
                                    if (!value) return null;
                                    return (
                                        <div key={key} className="flex justify-between text-sm">
                                            <span className="text-gray-600 capitalize">
                                                {key === "powerSupply" ? "Power Supply" : key}
                                            </span>
                                            <span className="font-medium text-gray-800">
                                                ₹
                                                {componentPrices[value as string]?.toLocaleString(
                                                    "en-IN",
                                                ) || "0"}
                                            </span>
                                        </div>
                                    );
                                })}

                            {buildState.addons && buildState.addons.length > 0 && (
                                <>
                                    <div className="border-t border-gray-200 pt-4 mt-4">
                                        <h4 className="text-sm font-semibold text-gray-800 mb-2">
                                            Add-ons
                                        </h4>
                                        {buildState.addons.map((addonId) => {
                                            const addon = addons.find((a) => a.id === addonId);
                                            return addon ? (
                                                <div
                                                    key={addon.id}
                                                    className="flex justify-between text-sm mb-2"
                                                >
                                                    <span className="text-gray-600">{addon.name}</span>
                                                    <span className="font-medium text-gray-800">
                                                        ₹{addon.price.toLocaleString("en-IN")}
                                                    </span>
                                                </div>
                                            ) : null;
                                        })}
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="border-t border-gray-200 pt-4 mb-6">
                            <div className="flex justify-between items-center">
                                <span className="text-lg font-semibold text-gray-800">
                                    Total
                                </span>
                                <span className="text-2xl font-bold text-blue-600">
                                    ₹{calculateTotal().toLocaleString("en-IN")}
                                </span>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <button
                                onClick={handleCheckout}
                                className="w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Proceed to Checkout
                            </button>
                            <button
                                onClick={handleBackToBuild}
                                className="w-full px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
                            >
                                Back to Build
                            </button>
                        </div>

                        <div className="mt-6 p-4 bg-gray-50 rounded-lg text-sm text-gray-600">
                            <p className="mb-2 font-semibold text-gray-700">
                                ✓ Estimated Delivery
                            </p>
                            <p>Within 5-7 business days</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
