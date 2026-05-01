"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { InfoIcon, ChevronDown } from "lucide-react";
import { BUILD_ADDONS, COMPONENT_IMAGES } from "./config";
import "./styles.css";

interface BuildState {
  chipset: string | null;
  case: string | null;
  motherboard: string | null;
  gpu: string | null;
  cpu: string | null;
  powerSupply: string | null;
  ram: string | null;
}

interface BuildStateWithAddons extends BuildState {
  addons: string[];
}

export default function BuildPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Base");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [buildState, setBuildState] = useState<BuildState>({
    chipset: null,
    case: null,
    motherboard: null,
    gpu: null,
    cpu: null,
    powerSupply: null,
    ram: null,
  });

  // Add new state for addons - Initialize with proper structure
  const [buildStateWithAddons, setBuildStateWithAddons] =
    useState<BuildStateWithAddons>({
      chipset: null,
      case: null,
      motherboard: null,
      gpu: null,
      cpu: null,
      powerSupply: null,
      ram: null,
      addons: [],
    });

  const components = [
    {
      id: "chipset",
      label: "Chipset",
      selectText: "Select Chipset",
      options: ["AMD", "Intel"],
    },
    {
      id: "case",
      label: "Case",
      selectText: "Select Case",
      options: [
        "Corsair 3500X",
        "Cooler Master Elite 681",
        "Lian Li Lancool 216",
        "MSI MAG PANO",
      ],
    },
    {
      id: "motherboard",
      label: "Motherboard",
      selectText: "Select Motherboard",
      options: ["ASUS ROG", "MSI MPG", "Gigabyte AORUS", "ASRock Steel Legend"],
    },
    {
      id: "gpu",
      label: "GPU",
      selectText: "Select GPU",
      options: ["RTX 4060", "RTX 4080", "RX 6500 XT", "RTX 5070"],
    },
    {
      id: "cpu",
      label: "CPU",
      selectText: "Select CPU",
      options: [
        "Ryzen 9 9950X3D",
        "Core i9-13900K",
        "Ryzen 7 7900X",
        "Core i7-13700K",
      ],
    },
    {
      id: "powerSupply",
      label: "Power Supply",
      selectText: "Select Power Supply",
      options: [
        "Corsair RM850x",
        "EVGA SuperNOVA 850PS",
        "Seasonic Focus GX-850",
        "Asus 750W",
      ],
    },
    {
      id: "ram",
      label: "RAM",
      selectText: "Select RAM",
      options: [
        "Corsair Vengeance 32GB",
        "G.Skill Trident Z5 32GB",
        "Crucial Ballistix 32GB",
        "Kingston Fury 32GB",
      ],
    },
  ];

  // Add addons data
  const handleSelect = (componentId: string, option: string) => {
    setBuildState((prev) => ({
      ...prev,
      [componentId]: option,
    }));
    setOpenDropdown(null);
  };

  // Sync buildStateWithAddons when buildState changes
  useEffect(() => {
    setBuildStateWithAddons((prev) => ({
      chipset: buildState.chipset,
      case: buildState.case,
      motherboard: buildState.motherboard,
      gpu: buildState.gpu,
      cpu: buildState.cpu,
      powerSupply: buildState.powerSupply,
      ram: buildState.ram,
      addons: prev.addons || [],
    }));
  }, [buildState]);

  // Handle restart button
  const handleRestart = () => {
    setBuildState({
      chipset: null,
      case: null,
      motherboard: null,
      gpu: null,
      cpu: null,
      powerSupply: null,
      ram: null,
    });
    localStorage.removeItem("pc_build");
  };

  // Handle share button
  const handleShare = () => {
    const buildUrl = `${window.location.origin}/build?config=${encodeURIComponent(JSON.stringify(buildState))}`;
    navigator.clipboard.writeText(buildUrl);
    alert("Build configuration link copied to clipboard!");
  };

  // Handle next button
  const handleNext = () => {
    const selectedComponents = Object.values(buildState).filter(Boolean).length;
    if (selectedComponents < components.length) {
      alert("Please select all components before proceeding");
      return;
    }
    // Debug: log what we're saving
    console.log("buildState before save:", buildState);
    console.log("buildStateWithAddons before save:", buildStateWithAddons);
    // Save build state to localStorage before navigating
    localStorage.setItem("pc_build", JSON.stringify(buildStateWithAddons));
    console.log("Saved to localStorage:", localStorage.getItem("pc_build"));
    router.push("/build/review");
  };

  const calculateTotal = () => {
    // Add your component prices here
    const basePrice = 0; // Example base price
    const addonTotal = buildStateWithAddons.addons.reduce((total, addonId) => {
      const addon = BUILD_ADDONS.find((a) => a.id === addonId);
      return total + (addon?.price || 0);
    }, 0);
    return (basePrice + addonTotal).toLocaleString("en-IN");
  };

  return (
    <div className="max-w-[1400px] mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-lg shadow-sm">
        <h1 className="text-2xl font-bold text-gray-800">Custom PC Builder</h1>
        <div className="flex gap-3">
          <button
            className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
            onClick={handleRestart}
          >
            Restart
          </button>
          <button
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
            onClick={handleShare}
          >
            Share Build
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm mb-6">
        <div className="flex border-b">
          {["Base", "Add-ons", "Summary"].map((tab) => (
            <button
              key={tab}
              className={`px-8 py-4 text-sm font-medium transition-colors relative
                ${activeTab === tab
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-800"
                }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-6">
        <div className="w-[420px] flex-shrink-0 bg-white rounded-lg shadow-sm p-4 relative z-20">
          {activeTab === "Base" && (
            <div className="space-y-4">
              {components.map((component) => (
                <div
                  key={component.id}
                  className="p-4 border border-gray-100 rounded-lg hover:border-gray-200 transition-colors"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-800">
                      {component.label}
                    </span>
                    <InfoIcon className="w-4 h-4 text-gray-500" />
                  </div>
                  <div className="relative">
                    <button
                      className="w-full px-4 py-2.5 text-left border border-gray-200 rounded-md hover:border-gray-300 transition-colors flex justify-between items-center"
                      onClick={() =>
                        setOpenDropdown(
                          openDropdown === component.id ? null : component.id,
                        )
                      }
                    >
                      <span className="text-gray-900 font-medium">
                        {buildState[component.id as keyof BuildState] ||
                          component.selectText}
                      </span>

                      <ChevronDown
                        className={`w-4 h-4 text-gray-400 transition-transform ${openDropdown === component.id ? "rotate-180" : ""
                          }`}
                      />
                    </button>
                    {openDropdown === component.id && (
                      <div
                        className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-48 overflow-y-auto dropdown-menu"
                      >
                        {component.options.map((option) => (
                          <button
                            key={option}
                            className="w-full px-4 py-2.5 text-left text-sm text-gray-900 hover:bg-gray-100"
                            onClick={() => handleSelect(component.id, option)}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "Add-ons" && (
            <div className="space-y-4">
              {BUILD_ADDONS.map((addon) => (
                <div
                  key={addon.id}
                  className="p-4 border border-gray-100 rounded-lg"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-medium text-gray-800">
                        {addon.name}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {addon.description}
                      </p>
                    </div>
                    <span className="text-sm font-semibold text-gray-800">
                      ₹{addon.price}
                    </span>
                  </div>
                  <button
                    className={`w-full px-4 py-2.5 text-sm font-medium rounded-md transition-colors
                      ${buildStateWithAddons.addons.includes(addon.id)
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                      }`}
                    onClick={() => {
                      setBuildStateWithAddons((prev) => ({
                        ...prev,
                        addons: prev.addons.includes(addon.id)
                          ? prev.addons.filter((id) => id !== addon.id)
                          : [...prev.addons, addon.id],
                      }));
                    }}
                  >
                    {buildStateWithAddons.addons.includes(addon.id)
                      ? "Remove"
                      : "Add to Build"}
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === "Summary" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Build Summary
                </h2>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-medium text-gray-800 mb-3">
                      Base Components
                    </h3>
                    {Object.entries(buildState).map(
                      ([key, value]) =>
                        value && (
                          <div
                            key={key}
                            className="flex justify-between items-center py-2"
                          >
                            <span className="text-sm text-gray-600">
                              {key.charAt(0).toUpperCase() + key.slice(1)}
                            </span>
                            <span className="text-sm font-medium text-gray-800">
                              {value}
                            </span>
                          </div>
                        ),
                    )}
                  </div>

                  {buildStateWithAddons.addons.length > 0 && (
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-medium text-gray-800 mb-3">
                        Add-ons
                      </h3>
                      {buildStateWithAddons.addons.map((addonId) => {
                        const addon = BUILD_ADDONS.find((a) => a.id === addonId);
                        return (
                          addon && (
                            <div
                              key={addon.id}
                              className="flex justify-between items-center py-2"
                            >
                              <span className="text-sm text-gray-600">
                                {addon.name}
                              </span>
                              <span className="text-sm font-medium text-gray-800">
                                ₹{addon.price}
                              </span>
                            </div>
                          )
                        );
                      })}
                    </div>
                  )}

                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-800">
                        Total Price
                      </span>
                      <span className="font-bold text-blue-600 text-lg">
                        ₹{calculateTotal()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="mt-6 pt-4 border-t border-gray-100">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">
                Estimated Ship Date:{" "}
                <span className="font-medium text-gray-800">03/02/2026</span>
              </span>
              <button
                className={`px-6 py-2.5 text-sm font-medium rounded-md transition-colors
                  ${activeTab !== "Summary" &&
                    Object.values(buildState).filter(Boolean).length !==
                    components.length
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                onClick={handleNext}
                disabled={
                  activeTab !== "Summary" &&
                  Object.values(buildState).filter(Boolean).length !==
                  components.length
                }
              >
                {activeTab === "Summary" ? "Proceed to Checkout" : "Next Step"}
              </button>
            </div>
          </div>
        </div>

        {/* Right Preview Panel */}
        <div className="flex-1 bg-white rounded-lg shadow-sm p-6">
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              {Object.values(buildState).some(Boolean) ? (
                <div className="space-y-4 max-h-[600px] overflow-y-auto">
                  {Object.entries(buildState).map(
                    ([key, value]) =>
                      value && (
                        <div
                          key={key}
                          className="flex flex-col items-center gap-2"
                        >
                          <img
                            src={
                              COMPONENT_IMAGES[value] ||
                              "/images/product/GPU.jpg"
                            }
                            alt={value}
                            className="w-40 h-40 object-contain mx-auto bg-gray-100 rounded"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                "/images/product/GPU.jpg";
                            }}
                          />
                          <span className="text-sm font-medium text-gray-700">
                            {value}
                          </span>
                        </div>
                      ),
                  )}
                </div>
              ) : (
                <>
                  <div className="mb-4">
                    <img
                      src="/placeholder.svg"
                      alt="PC Build"
                      className="w-64 h-64 mx-auto opacity-50"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Start Your Build
                  </h3>
                  <p className="text-gray-500">
                    Select components to visualize your custom PC
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
