export interface Addon {
  id: string;
  name: string;
  price: number;
  description: string;
}

export const COMPONENT_IMAGES: Record<string, string> = {
  // GPU
  "RTX 4060": "/images/rtx-4060.jpg",
  "RTX 4080": "/images/rtx-4080.png",
  "RX 6500 XT": "/images/rx-6500xt.jpg",
  "RTX 5070": "/images/rtx-5070.jpg",
  // CPU
  "Ryzen 9 9950X3D": "/images/ryzen-9.jpg",
  "Core i9-13900K": "/images/intel-i9.jpg",
  "Ryzen 7 7900X": "/images/amd-ryzen-7.jpg",
  "Core i7-13700K": "/images/intel-i7.jpg",
  // RAM
  "Corsair Vengeance 32GB": "/images/corsair-32gb.jpg",
  "G.Skill Trident Z5 32GB": "/images/gskill-32gb.jpg",
  "Crucial Ballistix 32GB": "/images/crucial-32gb.jpg",
  "Kingston Fury 32GB": "/images/kingston-32gb.jpg",
  // Case
  "Corsair 3500X": "/images/corsair-3500x.jpg",
  "Cooler Master Elite 681": "/images/cooler-master-elite-681.jpg",
  "Lian Li Lancool 216": "/images/lian-li-lancool-216.jpg",
  "MSI MAG PANO": "/images/msi-mag-pano.jpg",
  // Motherboard
  "ASUS ROG": "/images/asus-rog.jpg",
  "MSI MPG": "/images/msi-mpg.jpg",
  "Gigabyte AORUS": "/images/gigabyte-aorus.jpg",
  "ASRock Steel Legend": "/images/ASRock-steel.jpg",
  // Power Supply
  "Corsair RM850x": "/images/corsair-ps.jpg",
  "EVGA SuperNOVA 850PS": "/images/supernova-ps.jpg",
  "Seasonic Focus GX-850": "/images/seasonic-ps.jpg",
  "Asus 750W": "/images/psu-750w.jpg",
  // Chipset
  AMD: "/images/amd.png",
  Intel: "/images/intel.png",
};

export const BUILD_ADDONS: Addon[] = [
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

export const COMPONENT_PRICES: Record<string, number> = {
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
