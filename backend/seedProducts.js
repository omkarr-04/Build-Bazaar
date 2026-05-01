const mongoose = require("mongoose");
const Product = require("./models/product");

const sampleProducts = [
  // ===== PRE-BUILT SYSTEMS =====

  {
    name: "Gaming Desktop",
    description: "High-performance gaming desktop with RTX 4070. This powerhouse is equipped with the latest Intel i7-13th Gen processor and 32GB DDR5 RAM, delivering exceptional gaming performance and smooth multitasking. Features a 1TB NVMe SSD for lightning-fast load times, a 750W Gold PSU, and custom RGB lighting. Perfect for 1440p gaming at high settings or 4K gaming at moderate settings. Includes pre-installed Windows 11 Pro.",
    price: 150000,
    stock: 10,
    category: "PCs",
    brand: "Build Bazaar",
    imageUrl: "/images/gaming-pc.jpg",
    rating: 4.6,
  },

  {
    name: "Mac Pro",
    description: "Apple Mac Pro for professional-grade performance. The ultimate workstation for professionals with dual 10-core Intel Xeon processors, 64GB ECC RAM, and AMD Radeon Pro GPU. Supports up to 1.5TB of SSD storage for massive projects. Designed for video editing, 3D rendering, music production, and professional workflows. Includes 4 Thunderbolt 3 ports for high-speed connectivity.",
    price: 729999,
    stock: 5,
    category: "PCs",
    brand: "Apple",
    imageUrl: "/images/mac-pro.png",
    rating: 4.7,
  },

  {
    name: "iMac",
    description: "All-in-one iMac with M3 chip for creative professionals. Stunning 24-inch 4.5K Retina display with True Tone technology. Powered by Apple M3 chip with 8-core CPU and 10-core GPU. Comes with 24GB unified memory and 512GB SSD. Perfect for content creators, designers, and professionals who need a compact yet powerful workstation. Includes Magic Mouse and Magic Keyboard.",
    price: 134999,
    stock: 7,
    category: "PCs",
    brand: "Apple",
    imageUrl: "/images/i-mac.png",
    rating: 4.5,
  },

  {
    name: "Desktop",
    description: "Entry-level desktop PC for office work and light gaming. Budget-friendly system featuring Intel i5-12th Gen, 16GB DDR4 RAM, and 512GB SSD. Integrated Intel UHD Graphics handle everyday tasks and light gaming. Compact form factor fits easily on any desk. Comes with Windows 11 Home pre-installed. Great starter PC for students and office workers.",
    price: 57000,
    stock: 12,
    category: "PCs",
    brand: "Build Bazaar",
    imageUrl: "/images/budget-desktop.jpg",
    rating: 4.3,
  },

  {
    name: "Mac Mini M4",
    description: "Apple Mac Mini with M2 chip for compact performance. Ultra-compact desktop that packs powerful performance into a 5-inch cube. Features M2 chip, 16GB RAM, and 256GB SSD. Perfect for software development, light video editing, and everyday professional tasks. Connect to any monitor and peripherals. Supports up to 3 monitors simultaneously.",
    price: 54999,
    stock: 10,
    category: "PCs",
    brand: "Apple",
    imageUrl: "/images/mac-mini.jpg",
    rating: 4.4,
  },

  {
    name: "All-in-One PC",
    description: "Sleek all-in-one PC with integrated display. Space-saving solution with 21.5-inch Full HD display, Intel Core i3, 8GB RAM, and 256GB SSD integrated into one elegant package. Features built-in stereo speakers and webcam. Perfect for home offices, small businesses, and families sharing a computer. Easy setup with minimal cable clutter.",
    price: 34000,
    stock: 8,
    category: "PCs",
    brand: "Build Bazaar",
    imageUrl: "/images/all-in-one-pc.jpg",
    rating: 4.2,
  },

  {
    name: "Mini PC",
    description: "Compact mini PC for space-saving setups. Ultra-portable system with Intel Celeron processor, 8GB RAM, and 128GB SSD. Perfect for media streaming, document editing, and web browsing. Supports 4K output via HDMI. Fanless design ensures silent operation. Ideal for dormitories, small apartments, and minimalist setups.",
    price: 25000,
    stock: 15,
    category: "PCs",
    brand: "Build Bazaar",
    imageUrl: "/images/mini-pc.jpg",
    rating: 4.1,
  },

  {
    name: "Workstation PC",
    description: "Powerful workstation for professional workloads. High-end system with Intel Xeon processor, 64GB RAM, professional GPU, and 2TB NVMe SSD. Built for CAD, 3D rendering, video editing, and data analysis. Error-correcting memory ensures reliability for mission-critical work. Supports multiple displays and professional peripherals.",
    price: 65000,
    stock: 7,
    category: "PCs",
    brand: "Build Bazaar",
    imageUrl: "/images/workstation-pc.jpg",
    rating: 4.8,
  },

  // ===== LAPTOPS =====
  {
    name: "Lenovo LOQ",
    description: "High-performance gaming laptop with RTX 4060. Features 15.6-inch 144Hz IPS display, Intel i7-12th Gen, 16GB DDR5 RAM, and 512GB NVMe SSD. The RTX 4060 delivers smooth 1080p gaming at high settings. Includes Dolby Atmos speakers and advanced cooling system. Weighs 2.4 kg for portability. Up to 8 hours battery life.",
    price: 79000,
    stock: 8,
    category: "Laptops",
    brand: "Lenovo",
    imageUrl: "/images/gaming-laptop.jpg",
    rating: 4.5,
  },

  {
    name: "MSI Katana 15",
    description: "High-performance MSI gaming laptop with RTX 5050. 15.6-inch 165Hz FHD display with fast response time. Powered by Intel i7-13th Gen and RTX 5050 GPU for excellent 1440p gaming. 16GB DDR5 RAM and 512GB PCIe SSD. Advanced thermal management keeps temperatures low. RGB backlit keyboard. Supports high-speed WiFi 6E.",
    price: 115000,
    stock: 10,
    category: "Laptops",
    brand: "MSI",
    imageUrl: "/images/msi-katana.jpg",
    rating: 4.6,
  },

  {
    name: "ASUS ROG Zephyrus",
    description: "Premium ASUS ROG Zephyrus gaming laptop with RTX 4060. 14-inch 2.5K OLED display with 165Hz refresh rate. Incredibly thin and light at 1.9 kg. Features custom 3D vapor chamber cooling, customizable RGB ROG logo. Intel i9-13th Gen and RTX 4060. 16GB DDR5 RAM, 1TB SSD. Ray-traced gaming at high settings.",
    price: 120000,
    stock: 8,
    category: "Laptops",
    brand: "ASUS",
    imageUrl: "/images/asus-rog-zphyrus.jpg",
    rating: 4.7,
  },

  {
    name: "HP Omen 16",
    description: "High-performance HP Omen gaming laptop with RTX 5050. 16-inch 240Hz display for ultra-smooth gameplay. Intel i9-13th Gen processor paired with RTX 5050 ensures excellent performance. 32GB DDR5 RAM and 1TB NVMe SSD. Advanced liquid cooling for sustained performance. Premium build quality with aluminum chassis.",
    price: 95000,
    stock: 8,
    category: "Laptops",
    brand: "HP",
    imageUrl: "/images/hp-omen.jpg",
    rating: 4.4,
  },

  {
    name: "MacBook Pro M5",
    description: "Apple MacBook Pro with M5 chip for professionals. 16-inch Liquid Retina XDR display with ProMotion 120Hz. M5 chip delivers desktop-class performance for video editing, 3D rendering, and development. 32GB unified memory and 1TB SSD. All-day battery life. Thunderbolt 4 connectivity. Perfect for creative professionals.",
    price: 179999,
    stock: 10,
    category: "Laptops",
    brand: "Apple",
    imageUrl: "/images/macbook-pro.jpg",
    rating: 4.8,
  },

  {
    name: "MacBook Air",
    description: "Lightweight Apple MacBook Air with M4 chip. Incredibly thin and light 13-inch laptop with stunning Liquid Retina display. M4 chip handles demanding tasks with ease. 16GB unified memory and 512GB SSD. Up to 18 hours battery life. Perfect balance of performance and portability for students and professionals.",
    price: 95000,
    stock: 12,
    category: "Laptops",
    brand: "Apple",
    imageUrl: "/images/macbook-air.jpg",
    rating: 4.6,
  },

  {
    name: "ASUS TUF A15",
    description: "Durable gaming laptop with RTX 4060 for immersive gaming. Military-grade durability with MilStd-810H certification. 15.6-inch 144Hz IPS display, AMD Ryzen 7 5800H, RTX 4060. 16GB DDR4 RAM and 512GB SSD. Excellent thermal management. Resistant to dust and water. Average 8 hours battery life.",
    price: 65000,
    stock: 10,
    category: "Laptops",
    brand: "ASUS",
    imageUrl: "/images/asus-tuf-gaming.jpg",
    rating: 4.3,
  },

  {
    name: "Asus Vivobook",
    description: "Laptop with sleek design and solid performance. 15.6-inch FHD display with narrow bezels. Intel Core i5-10th Gen, 8GB RAM, 512GB SSD. Lightweight at 1.8 kg, perfect for students and professionals on the move. Features ASUS ScreenPad for productivity shortcuts. Fast charging technology.",
    price: 56000,
    stock: 15,
    category: "Laptops",
    brand: "ASUS",
    imageUrl: "/images/50k-laptop.jpg",
    rating: 4.2,
  },

  {
    name: "Lenovo IdeaPad",
    description: "Budget-friendly laptop for everyday use for work and entertainment. 15.6-inch HD display, AMD Ryzen 5, 8GB RAM, 256GB SSD. Reliable performance for everyday computing tasks, streaming content, and light work. All-day battery life. Dolby Audio speakers for entertainment. Perfect starter laptop.",
    price: 49000,
    stock: 15,
    category: "Laptops",
    brand: "Lenovo",
    imageUrl: "/images/lenovo-ideapad.jpg",
    rating: 4.0,
  },

  {
    name: "HP Pavilion",
    description: "Versatile laptop for work and multimedia. 15.6-inch FHD display, Intel Core i5-11th Gen, 8GB RAM, 512GB SSD. Excellent for office work, web browsing, and multimedia. HP audio by Bang & Olufsen for great sound. Touchpad is responsive and accurate. Great value for money.",
    price: 61000,
    stock: 10,
    category: "Laptops",
    brand: "HP",
    imageUrl: "/images/hp-pavilion.jpg",
    rating: 4.1,
  },

  {
    name: "Dell Inspiron",
    description: "Reliable laptop for productivity and entertainment. 15.6-inch FHD display, Intel Core i5, 8GB DDR4 RAM, 512GB SSD. Solid performer for productivity, casual gaming, and entertainment. Integrated graphics handle everyday tasks well. Premium design with metallic finish. Excellent after-sales support.",
    price: 58000,
    stock: 12,
    category: "Laptops",
    brand: "Dell",
    imageUrl: "/images/dell-inspiron.jpg",
    rating: 4.2,
  },

  {
    name: "Acer Aspire",
    description: "Affordable laptop for everyday computing needs. 15.6-inch HD display, Intel Core i3, 4GB RAM, 256GB SSD. Perfect for students, office workers, and casual internet users. Lightweight and portable. Decent build quality at the price point. Up to 7 hours battery life.",
    price: 49000,
    stock: 18,
    category: "Laptops",
    brand: "Acer",
    imageUrl: "/images/acer-aspire.jpg",
    rating: 3.9,
  },

  // ===== PC COMPONENTS =====
  {
    name: "CPU Intel i9 14th Gen",
    description: "Top-tier Intel i9 14th Gen processor for extreme performance. 24 cores with a base clock of 3.2 GHz and boost up to 6.2 GHz. Perfect for content creation, 4K video editing, 3D rendering, and gaming. Features Intel's latest Raptor Lake architecture. Compatible with LGA1700 socket motherboards. TDP: 253W.",
    price: 60000,
    stock: 10,
    category: "Components",
    brand: "Intel",
    imageUrl: "/images/intel-i9.jpg",
    rating: 4.7,
  },

  {
    name: "CPU Intel i7 13th Gen",
    description: "Powerful Intel i7 13th Gen processor for gaming and productivity. 16 cores (8 P-cores + 8 E-cores), base clock 3.0 GHz, boost to 5.4 GHz. Excellent for gaming, streaming, and content creation simultaneously. Supports DDR5 RAM. TDP: 125W. Hybrid performance and efficiency.",
    price: 38000,
    stock: 20,
    category: "Components",
    brand: "Intel",
    imageUrl: "/images/intel-i7.jpg",
    rating: 4.5,
  },

  {
    name: "CPU Intel i5 12th Gen",
    description: "Budget-friendly Intel i5 12th Gen processor for everyday use. 10 cores (6 P-cores + 4 E-cores), base 3.3 GHz, boost to 4.7 GHz. Great for gaming, productivity, and multitasking. Supports DDR4 and DDR5 RAM. TDP: 65W. Excellent power efficiency.",
    price: 20000,
    stock: 25,
    category: "Components",
    brand: "Intel",
    imageUrl: "/images/intel-i5.jpg",
    rating: 4.3,
  },

  {
    name: "CPU Intel i3 12th Gen",
    description: "Budget-friendly Intel i3 processor for daily tasks. 6 cores (4 P-cores + 2 E-cores), base 3.3 GHz, boost to 4.3 GHz. Perfect for office work, web browsing, and light gaming. Integrated UHD Graphics 730. TDP: 58W. Energy-efficient for low-power systems.",
    price: 10000,
    stock: 20,
    category: "Components",
    brand: "Intel",
    imageUrl: "/images/intel-i3.jpg",
    rating: 4.0,
  },

  {
    name: "CPU AMD Ryzen 9 9900X",
    description: "High-end AMD Ryzen 9 processor for gaming and content creation. 12 cores / 24 threads with 3D V-Cache for superior gaming performance. Base 3.8 GHz, boost to 5.6 GHz. Exceptional for AAA gaming, streaming, and 4K editing. Compatible with AM5 socket.",
    price: 75000,
    stock: 10,
    category: "Components",
    brand: "AMD",
    imageUrl: "/images/ryzen-9.jpg",
    rating: 4.8,
  },

  {
    name: "CPU AMD Ryzen 7 9700X",
    description: "High-performance AMD Ryzen 7 processor for gaming and multitasking. 8 cores / 16 threads, base 3.6 GHz, boost to 5.4 GHz. Excellent in gaming and productivity applications. Lower power consumption. Good value and performance ratio.",
    price: 35000,
    stock: 15,
    category: "Components",
    brand: "AMD",
    imageUrl: "/images/amd-ryzen-7.jpg",
    rating: 4.5,
  },

  {
    name: "CPU AMD Ryzen 5 9600X",
    description: "Mid-range AMD Ryzen 5 processor for gaming and productivity. 6 cores / 12 threads, base 3.6 GHz, boost to 5.3 GHz. Great for 1080p and 1440p gaming. Solid productivity performance. Excellent power efficiency. Great value processor.",
    price: 20000,
    stock: 18,
    category: "Components",
    brand: "AMD",
    imageUrl: "/images/ryzen-5600x.jpg",
    rating: 4.2,
  },

  {
    name: "CPU AMD Ryzen 3 32000G",
    description: "Budget-friendly AMD Ryzen 3 processor with integrated graphics. 4 cores / 8 threads with Radeon Vega graphics. No dedicated GPU needed for everyday tasks and light gaming. Base 3.5 GHz, boost to 4.6 GHz. Perfect for budget PC builds.",
    price: 6000,
    stock: 25,
    category: "Components",
    brand: "AMD",
    imageUrl: "/images/ryzen-3.jpg",
    rating: 3.9,
  },

  // ===== GPUs =====
  {
    name: "RTX 5090 GPU",
    description: "NVIDIA RTX 5090 for unparalleled gaming performance. Flagship GPU with 32GB GDDR7 memory, 18,176 CUDA cores, and RTX X60 architecture. Powered by Ada architecture. Handles 4K gaming at maximum settings with high frame rates. Supports DLSS Super Resolution and ray tracing. Requires 2x 12-pin connectors.",
    price: 340000,
    stock: 5,
    category: "Components",
    brand: "NVIDIA",
    imageUrl: "/images/rtx-5090.jpg",
    rating: 4.9,
  },

  {
    name: "RTX 4080 GPU",
    description: "NVIDIA RTX 4080 for ultimate gaming performance. Premium GPU with 16GB GDDR6X memory and 9,728 CUDA cores. Ray tracing and DLSS 3 support for superior image quality. Excellent for 4K gaming and professional workloads. Power consumption: 320W. Supports latest game titles.",
    price: 120000,
    stock: 5,
    category: "Components",
    brand: "NVIDIA",
    imageUrl: "/images/rtx-4080.png",
    rating: 4.7,
  },

  {
    name: "RTX 3060 GPU",
    description: "Mid-range NVIDIA RTX 3060 for 1080p gaming. GPU with 12GB GDDR6 memory and 3,584 CUDA cores. Great for 1080p high settings and 1440p medium settings gaming. Supports ray tracing and DLSS. Excellent content creation capabilities. Power efficient at 170W.",
    price: 35000,
    stock: 8,
    category: "Components",
    brand: "NVIDIA",
    imageUrl: "/images/rtx-3060.jpg",
    rating: 4.3,
  },

  {
    name: "RTX 2060 Super GPU",
    description: "Affordable NVIDIA RTX 2060 Super for smooth gaming. GPU with 8GB GDDR6 memory. Handles 1080p gaming easily with high settings. Good entry point for ray tracing. Budget-friendly option for esports titles. Low power consumption at 175W.",
    price: 22000,
    stock: 10,
    category: "Components",
    brand: "NVIDIA",
    imageUrl: "/images/rtx-2060.jpg",
    rating: 4.0,
  },

  {
    name: "RX 7900XT GPU",
    description: "AMD RX 7900XT for high-end gaming and content creation. GPU with 24GB GDDR6 memory and 5,376 stream processors. Competes with RTX 4080 in performance. Excellent for 4K gaming and professional tasks. Power consumption: 420W. Great value proposition.",
    price: 80000,
    stock: 3,
    category: "Components",
    brand: "AMD",
    imageUrl: "/images/rx-7900.jpg",
    rating: 4.6,
  },

  {
    name: "RX 7700 GPU",
    description: "AMD RX 7700 for excellent 1440p gaming performance. GPU with 12GB GDDR6 memory. Handles 1440p gaming at high settings with good frame rates. Ray tracing support. Good alternative to NVIDIA's mid-range options.",
    price: 38000,
    stock: 5,
    category: "Components",
    brand: "AMD",
    imageUrl: "/images/rx-7700.jpg",
    rating: 4.4,
  },

  {
    name: "RX 6600 GPU",
    description: "AMD RX 6600 for solid 1080p gaming performance. GPU with 8GB GDDR6 memory. Excellent for 1080p gaming at high settings. Ray tracing capable. Energy efficient at 132W. Great starter GPU for gaming builds.",
    price: 25000,
    stock: 8,
    category: "Components",
    brand: "AMD",
    imageUrl: "/images/rx-6600.jpg",
    rating: 4.2,
  },

  {
    name: "RX 6500XT GPU",
    description: "Entry-level GPU for esports and light gaming. 4GB GDDR6 memory. Perfect for 1080p gaming in competitive titles like CS:GO and Valorant. Great for eSports enthusiasts on a budget. Low power consumption at 150W.",
    price: 15500,
    stock: 10,
    category: "Components",
    brand: "AMD",
    imageUrl: "/images/rx-6500xt.jpg",
    rating: 3.8,
  },

  // ===== STORAGE =====
  {
    name: "SSD 1TB NVMe",
    description: "Fast NVMe SSD for quick load times. Delivers up to 7,400 MB/s read speed. PCIe 4.0 interface for blazing-fast performance. Perfect for gaming, video editing, and OS installation. 1TB capacity provides ample storage. Excellent gaming load times.",
    price: 13000,
    stock: 20,
    category: "Components",
    brand: "Samsung",
    imageUrl: "/images/1tb-ssd.jpg",
    rating: 4.6,
  },

  {
    name: "SSD 2TB NVMe",
    description: "High-capacity NVMe SSD for gaming and productivity. Read speeds up to 7,400 MB/s with PCIe 4.0 interface. Large 2TB capacity for storing games and large project files. Ideal for content creators and gamers. Includes heatspreader for thermal management.",
    price: 28000,
    stock: 15,
    category: "Components",
    brand: "Samsung",
    imageUrl: "/images/2tb-ssd.jpg",
    rating: 4.7,
  },

  {
    name: "External Hard Drive 2TB",
    description: "Portable external hard drive for data storage. 2TB capacity for backing up important files. USB 3.0 interface provides fast transfer speeds. Compact and lightweight portable design. Perfect for photographers and content creators.",
    price: 8500,
    stock: 22,
    category: "Components",
    brand: "Seagate",
    imageUrl: "/images/external-hdd.jpg",
    rating: 4.3,
  },

  {
    name: "SSD 480GB SATA",
    description: "Affordable SATA SSD for faster boot times. SATA III interface with read speeds up to 550 MB/s. 480GB capacity for OS and applications. Budget-friendly upgrade from mechanical drives. Reliable performance for everyday computing.",
    price: 7200,
    stock: 30,
    category: "Components",
    brand: "Kingston",
    imageUrl: "/images/480gb-ssd.jpg",
    rating: 4.1,
  },

  {
    name: "Internal HDD 1TB",
    description: "Reliable 1TB hard drive for mass storage. 7200 RPM speed ensures good performance for files and media. SATA interface for compatibility with most systems. Perfect secondary drive for large file storage. Cost-effective storage expansion.",
    price: 6500,
    stock: 25,
    category: "Components",
    brand: "Western Digital",
    imageUrl: "/images/1tb-hdd.jpg",
    rating: 4.0,
  },

  {
    name: "External SSD 500GB",
    description: "Portable external SSD for fast data transfer. USB-C interface delivers speeds up to 1050 MB/s. Durable design with protection against drops and water. 500GB capacity perfect for travel and backups.",
    price: 2600,
    stock: 18,
    category: "Components",
    brand: "Samsung",
    imageUrl: "/images/external-ssd.jpg",
    rating: 4.4,
  },

  // ===== RAM =====
  {
    name: "32GB DDR5 RAM",
    description: "High-speed DDR5 RAM for next-gen performance. 32GB capacity with 6000 MHz frequency. Low latency CAS 30 timings for responsive systems. Supports Intel 12th gen and newer processors. RGB lighting with 5 lighting modes. Future-proof your build.",
    price: 52000,
    stock: 20,
    category: "Components",
    brand: "Corsair",
    imageUrl: "/images/ddr5-ram.jpg",
    rating: 4.5,
  },

  {
    name: "16GB DDR5 RAM",
    description: "High-speed DDR4 RAM for smooth multitasking. 16GB capacity with 3200 MHz frequency. Low latency for better performance. Compatible with latest motherboards. Great upgrade for existing systems. Improves multitasking capabilities.",
    price: 13900,
    stock: 25,
    category: "Components",
    brand: "G.Skill",
    imageUrl: "/images/ddr4-ram.jpg",
    rating: 4.3,
  },

  {
    name: "8GB DDR4 RAM",
    description: "Single 8GB DDR4 RAM stick for budget builds. 3000 MHz frequency providing good performance. Perfect for entry-level gaming and productivity builds. Easy upgrade from 4GB. Great value single stick option.",
    price: 4200,
    stock: 40,
    category: "Components",
    brand: "Kingston",
    imageUrl: "/images/8gb-ddr4.jpg",
    rating: 3.9,
  },

  // ===== MOTHERBOARDS =====
  {
    name: "Gaming Motherboard",
    description: "ATX motherboard with RGB lighting. Supports LGA1700 socket for latest Intel processors. Features PCIe 5.0 slots for next-gen graphics cards. Integrated RGB lighting control. Premium VRM for stable overclocking. Supports DDR5 memory.",
    price: 11000,
    stock: 12,
    category: "Components",
    brand: "ASUS",
    imageUrl: "/images/gaming-motherboard.jpg",
    rating: 4.4,
  },

  {
    name: "MSI B650M Motherboard",
    description: "Micro-ATX motherboard with AMD B650 chipset. Supports AMD Ryzen 7000 series processors with AM5 socket. PCIe 5.0 SSD support for ultra-fast storage. DDR5 memory support. Compact form factor for smaller builds.",
    price: 9000,
    stock: 15,
    category: "Components",
    brand: "MSI",
    imageUrl: "/images/msi-motherboard.jpg",
    rating: 4.2,
  },

  {
    name: "Gigabyte B450M Motherboard",
    description: "Micro-ATX motherboard with AMD B450 chipset. Supports older Ryzen processors with AM4 socket. Budget-friendly option for AMD builds. DDR4 memory support. Compact design for mATX cases.",
    price: 7500,
    stock: 18,
    category: "Components",
    brand: "Gigabyte",
    imageUrl: "/images/gigabyte-motherboard.jpg",
    rating: 4.0,
  },

  // ===== CABINETS =====
  {
    name: "Gaming Cabinet",
    description: "High airflow gaming cabinet with tempered glass side panel. Supports up to 4 front fans and 2 rear fans. Tool-less side panel for easy access to internals. Large cable management space. Supports ATX, Micro-ATX, and Mini-ITX motherboards.",
    price: 6999,
    stock: 14,
    category: "Components",
    brand: "Build Bazaar",
    imageUrl: "/images/gaming-cabinet.jpg",
    rating: 4.5,
  },

  {
    name: "Micro-ATX Cabinet",
    description: "Compact cabinet suitable for budget PC builds. Supports Micro-ATX and Mini-ITX motherboards. Small footprint fits easily on desks. Basic cable management. Budget-friendly option for smaller systems.",
    price: 2999,
    stock: 18,
    category: "Components",
    brand: "Build Bazaar",
    imageUrl: "/images/matx-cabinet.jpg",
    rating: 3.8,
  },

  {
    name: "Circle Lucid Cabinet",
    description: "Sleek cabinet with circular design and RGB lighting. Tempered glass front and side panels showcase components. Tool-less design for easy maintenance. Supports multiple fan configurations. Premium aesthetic appeal.",
    price: 6999,
    stock: 10,
    category: "Components",
    brand: "NZXT",
    imageUrl: "/images/circle-lucid.jpg",
    rating: 4.3,
  },

  {
    name: "Frontech Cabinet",
    description: "Modern cabinet with front panel display and RGB lighting. Built-in USB hub for convenient peripheral connectivity. Cable management through rear channels. Supports standard ATX motherboards.",
    price: 1099,
    stock: 12,
    category: "Components",
    brand: "Frontech",
    imageUrl: "/images/frontech-cabinet.jpg",
    rating: 3.7,
  },

  // ===== PSU =====
  {
    name: "PSU 750W Gold",
    description: "High-efficiency 750W PSU with 80+ Gold certification. Modular cables reduce clutter. Semi-fanless design runs quiet at low loads. Over-temperature and short-circuit protection. Perfect for high-end gaming builds.",
    price: 5999,
    stock: 18,
    category: "Components",
    brand: "Corsair",
    imageUrl: "/images/psu-750w.jpg",
    rating: 4.6,
  },

  {
    name: "PSU 650W Bronze",
    description: "Affordable 650W power supply for mid-range PCs. 80+ Bronze certification for decent efficiency. Reliable power delivery for mainstream systems. Semi-modular design.",
    price: 4500,
    stock: 20,
    category: "Components",
    brand: "Seasonic",
    imageUrl: "/images/psu-650W.jpg",
    rating: 4.2,
  },

  {
    name: "PSU 450W Bronze",
    description: "Reliable 450W power supply for budget PCs. 80+ Bronze efficiency rating. Perfect for office and light gaming builds. Non-modular design keeps costs down. Sufficient for entry-level systems.",
    price: 3200,
    stock: 22,
    category: "Components",
    brand: "Gigabyte",
    imageUrl: "/images/psu-450w.jpg",
    rating: 3.9,
  },

  // ===== COOLING =====
  {
    name: "Liquid CPU Cooler",
    description: "All-in-one liquid CPU cooler for optimal cooling. Pre-filled and sealed system, no maintenance needed. Keeps high-end CPUs cool during demanding tasks. Attractive RGB pump block. Easy installation with pre-applied thermal paste.",
    price: 4500,
    stock: 15,
    category: "Components",
    brand: "NZXT",
    imageUrl: "/images/liquid-cpu-cooler.jpg",
    rating: 4.5,
  },

  {
    name: "CPU Air Cooler",
    description: "High-performance air cooler for budget and mid-range CPUs. Direct contact heatpipes for efficient heat dissipation. Supports multiple socket types. Quiet operation with low RPM fan. Easy installation process.",
    price: 2500,
    stock: 20,
    category: "Components",
    brand: "Noctua",
    imageUrl: "/images/cpu-air-cooler.jpg",
    rating: 4.3,
  },

  {
    name: "120mm Case Fan",
    description: "High airflow 120mm case fan with low noise. PWM controlled for automatic speed adjustment. Supports both push and pull configurations. Affordable solution for case ventilation. Reduces system temperatures effectively.",
    price: 600,
    stock: 50,
    category: "Components",
    brand: "Be Quiet",
    imageUrl: "/images/case-fan.jpg",
    rating: 4.1,
  },

  // ===== MONITORS =====
  {
    name: "Gaming Monitor 27-inch",
    description: "100Hz 27-inch gaming monitor. QHD resolution (2560x1440) for sharp visuals. 1ms response time for competitive gaming. AMD FreeSync support eliminates screen tearing. IPS panel for wide viewing angles.",
    price: 25000,
    stock: 15,
    category: "Monitors",
    brand: "LG",
    imageUrl: "/images/gaming-monitor.jpg",
    rating: 4.4,
  },

  {
    name: "Mac Studio Display",
    description: "27-inch 5K Retina display for Mac users. Stunning 5120x2880 resolution. Nano-texture glass option reduces glare. 12MP ultra-wide camera with Center Stage. Built-in speakers and microphone. Supports MacBook Pro and iMac.",
    price: 159999,
    stock: 10,
    category: "Monitors",
    brand: "Apple",
    imageUrl: "/images/studio-display.png",
    rating: 4.7,
  },

  {
    name: "Full HD Monitor 24-inch",
    description: "60Hz 24-inch Full HD monitor for work and casual use. 1920x1080 resolution with IPS panel. Great for office work and web browsing. LED backlit with excellent color accuracy. VESA mount compatible.",
    price: 9799,
    stock: 20,
    category: "Monitors",
    brand: "Dell",
    imageUrl: "/images/24inch-monitor.jpg",
    rating: 4.2,
  },

  {
    name: "Acer 4K Monitor 27-inch",
    description: "4K UHD monitor with HDR support. 3840x2160 resolution with IPS panel. Perfect for content creation and professional work. 100% sRGB color gamut for accurate colors. Compact bezels for increased screen real estate.",
    price: 18999,
    stock: 15,
    category: "Monitors",
    brand: "Acer",
    imageUrl: "/images/acer-4k.jpg",
    rating: 4.5,
  },

  {
    name: "Curved Monitor 32-inch",
    description: "Curved 32-inch monitor with 144Hz refresh rate. VA panel with excellent contrast ratio. 1ms response time for gaming. 1440p resolution for immersive experiences. AMD FreeSync Premium support.",
    price: 29999,
    stock: 10,
    category: "Monitors",
    brand: "LG",
    imageUrl: "/images/curved-monitor.jpg",
    rating: 4.6,
  },

  {
    name: "Monitor 22-inch",
    description: "Affordable 22-inch monitor for basic computing needs. 1680x1050 native resolution. 5ms response time, TN panel. Budget-friendly for home offices and libraries. Adjustable stand for ergonomic positioning.",
    price: 3999,
    stock: 25,
    category: "Monitors",
    brand: "BenQ",
    imageUrl: "/images/budget-monitor.jpg",
    rating: 3.8,
  },

  {
    name: "Portable Monitor 15.6-inch",
    description: "Lightweight portable monitor for on-the-go use. 1920x1080 IPS display in compact 15.6-inch size. USB-C powered, no external power adapter needed. Perfect for remote workers and content creators.",
    price: 7299,
    stock: 12,
    category: "Monitors",
    brand: "ASUS",
    imageUrl: "/images/portable-monitor.jpg",
    rating: 4.3,
  },

  // ===== INPUT & ACCESSORIES =====
  {
    name: "Mechanical Keyboard",
    description: "RGB mechanical keyboard with blue switches. Per-key RGB lighting with multiple effects. Aluminum frame for durability. Cherry MX key switches for satisfying tactile feedback. Programmable macro keys.",
    price: 8000,
    stock: 25,
    category: "Accessories",
    brand: "Corsair",
    imageUrl: "/images/mechanical-keyboard.jpg",
    rating: 4.5,
  },

  {
    name: "Wireless Gaming Mouse",
    description: "High-precision wireless gaming mouse. 16,000 DPI sensor for accuracy. Ergonomic right-handed design. Supports 2.4GHz wireless and Bluetooth. Up to 60-hour battery life. Customizable weight system.",
    price: 3500,
    stock: 30,
    category: "Accessories",
    brand: "Razer",
    imageUrl: "/images/gaming-mouse.jpg",
    rating: 4.4,
  },

  {
    name: "Wired Keyboard & Mouse",
    description: "Affordable keyboard and mouse combo for everyday use. Plug-and-play USB connection, no drivers needed. Durable keys with good key travel. Comfortable mouse grip for extended use. Budget-friendly bundle.",
    price: 999,
    stock: 50,
    category: "Accessories",
    brand: "Generic",
    imageUrl: "/images/keyboard-mouse-combo.jpg",
    rating: 3.6,
  },

  {
    name: "Wired Mouse",
    description: "Entry-level wired gaming mouse with adjustable DPI. 6 programmable buttons for gaming. Optical sensor for precision tracking. Comfortable grip for extended gaming sessions. Affordable gaming essential.",
    price: 1200,
    stock: 40,
    category: "Accessories",
    brand: "Logitech",
    imageUrl: "/images/wired-mouse.jpg",
    rating: 3.9,
  },

  {
    name: "Wired Keyboard",
    description: "Basic wired keyboard for typing and office work. Full-size layout with numeric keypad. Quiet keys for office environments. Durable rubber dome switches. Standard USB connection.",
    price: 800,
    stock: 45,
    category: "Accessories",
    brand: "Generic",
    imageUrl: "/images/wired-keyboard.jpg",
    rating: 3.5,
  },

  {
    name: "Mouse Pad",
    description: "Large gaming mouse pad with non-slip base. Extended surface area for low mouse sensitivity setup. Soft fabric top for smooth gliding. Stitched edges for durability. Water-resistant surface.",
    price: 1200,
    stock: 40,
    category: "Accessories",
    brand: "SteelSeries",
    imageUrl: "/images/mouse-pad.jpg",
    rating: 4.2,
  },

  {
    name: "Gaming Headset",
    description: "Surround sound gaming headset with mic. 7.1 virtual surround sound for positioned audio. Noise-canceling microphone for clear communication. Memory foam ear cushions for comfort. RGB lighting.",
    price: 4500,
    stock: 18,
    category: "Accessories",
    brand: "SteelSeries",
    imageUrl: "/images/gaming-headset.jpg",
    rating: 4.3,
  },

  {
    name: "Webcam 4K",
    description: "High-resolution webcam for streaming. 4K resolution at 30fps for professional quality. Wide 90-degree field of view. Auto-focus and auto-exposure for optimal image. USB plug-and-play.",
    price: 5999,
    stock: 18,
    category: "Accessories",
    brand: "Logitech",
    imageUrl: "/images/webcam.jpg",
    rating: 4.4,
  },

  {
    name: "Gaming Chair",
    description: "Ergonomic gaming chair with adjustable features. Lumbar support for extended gaming sessions. Height adjustable armrests and backrest recline. Premium PU leather with breathable mesh. Supports weights up to 150kg.",
    price: 13000,
    stock: 10,
    category: "Accessories",
    brand: "AKRacing",
    imageUrl: "/images/gaming-chair.jpg",
    rating: 4.5,
  },

  {
    name: "IEMs",
    description: "Comfortable wired headphones for calls and media. Balanced sound signature with decent bass. Lightweight design for all-day wearing comfort. Tangle-free cable with microphone control. Easy storage with carrying case.",
    price: 1500,
    stock: 35,
    category: "Accessories",
    brand: "Philips",
    imageUrl: "/images/basic-headphones.jpg",
    rating: 3.7,
  },

  {
    name: "Bluetooth Speaker",
    description: "Portable Bluetooth speaker with deep bass. 360-degree sound projection. 12-hour battery life on single charge. Water-resistant design for outdoor use. Compact and lightweight for travel.",
    price: 4000,
    stock: 25,
    category: "Accessories",
    brand: "JBL",
    imageUrl: "/images/bluetooth-speaker.jpg",
    rating: 4.2,
  },

  {
    name: "USB-C Hub",
    description: "Multi-port USB-C hub with HDMI and USB 3.0. Expand connectivity with single USB-C port. Supports 4K video output via HDMI. High-speed data transfer via USB 3.0 ports. Compact aluminum design.",
    price: 1999,
    stock: 30,
    category: "Accessories",
    brand: "Anker",
    imageUrl: "/images/usb-c-hub.jpg",
    rating: 4.1,
  },

  // ===== NETWORKING =====
  {
    name: "WiFi 6 PCIe Card",
    description: "High-speed WiFi 6 PCIe adapter with Bluetooth support. 802.11ax WiFi 6 delivers up to 2.4 Gbps speeds. Integrated Bluetooth 5.2 for wireless peripherals. Dual antenna setup for better coverage.",
    price: 4900,
    stock: 25,
    category: "Components",
    brand: "ASUS",
    imageUrl: "/images/wifi-card.jpg",
    rating: 4.3,
  },

  {
    name: "Gigabit Ethernet Adapter",
    description: "PCIe gigabit Ethernet network adapter. 1000 Mbps connection speed for fast networking. Low latency for gaming and streaming. RJ45 connector compatible with standard network cables.",
    price: 400,
    stock: 30,
    category: "Components",
    brand: "TP-Link",
    imageUrl: "/images/ethernet-adapter.jpg",
    rating: 4.0,
  },

  // ===== POWER & BACKUP =====
  {
    name: "UPS 1100VA",
    description: "Uninterruptible power supply for PC protection. 1100VA capacity provides backup for 30-60 minutes. Protects against power surges and brown-outs. Automatic voltage regulation. LCD display for monitoring.",
    price: 7500,
    stock: 12,
    category: "Accessories",
    brand: "APC",
    imageUrl: "/images/ups.jpg",
    rating: 4.4,
  },

  {
    name: "Surge Protector Power Strip",
    description: "Power strip with surge protection for electronics. Multiple outlets with individual switches. Surge protection safeguards expensive devices. Compact design fits behind furniture. Thermal overload protection.",
    price: 1200,
    stock: 30,
    category: "Accessories",
    brand: "Belkin",
    imageUrl: "/images/power-strip.jpg",
    rating: 4.0,
  },

  // ===== SOFTWARE =====
  {
    name: "Windows 11 Home License",
    description: "Genuine Windows 11 Home operating system license. Latest Windows features and security updates. Genuine activation with Microsoft support. Digital license transfer capability. Full operating system functionality.",
    price: 10999,
    stock: 50,
    category: "Components",
    brand: "Microsoft",
    imageUrl: "/images/windows-11.jpg",
    rating: 4.3,
  },

  {
    name: "Microsoft Office 2021",
    description: "Productivity suite with Word, Excel, and PowerPoint. Enhanced collaboration features and cloud integration. Professional document creation and data analysis tools. One-time purchase license for lifetime use.",
    price: 7999,
    stock: 40,
    category: "Components",
    brand: "Microsoft",
    imageUrl: "/images/office-2021.jpg",
    rating: 4.2,
  },

  {
    name: "Thermal Paste",
    description: "High-quality thermal compound for efficient heat transfer. Superior thermal conductivity for better CPU cooling. Non-conductive and non-corrosive formula. Easy application with included applicator. Reliable for system overclocking.",
    price: 350,
    stock: 100,
    category: "Components",
    brand: "Arctic",
    imageUrl: "/images/thermal-paste.jpg",
    rating: 4.4,
  },

  // ===== CONSOLES =====
  {
    name: "PlayStation 5",
    description: "Next-gen gaming console with ultra HD gaming. 4K/120fps gaming capability with ray tracing. SSD for ultra-fast game loading. Innovative DualSense controller with haptic feedback. Huge library of exclusive titles.",
    price: 49990,
    stock: 15,
    category: "Consoles",
    brand: "Sony",
    imageUrl: "/images/ps5.jpg",
    rating: 4.7,
  },

  {
    name: "Nintendo Switch OLED",
    description: "Versatile gaming console with OLED screen. Beautiful 7-inch OLED display with vibrant colors. Handheld, tabletop, and docked gaming modes. Extensive library of Nintendo exclusive games. Long battery life.",
    price: 30990,
    stock: 20,
    category: "Consoles",
    brand: "Nintendo",
    imageUrl: "/images/nintendo-switch.jpg",
    rating: 4.5,
  },

  {
    name: "Xbox Series S",
    description: "Compact next-gen gaming console. 4K gaming at 60fps on supported titles. Fast SSD eliminates load screens. Xbox Game Pass included for hundreds of games. Smallest and most affordable next-gen console.",
    price: 45499,
    stock: 20,
    category: "Consoles",
    brand: "Microsoft",
    imageUrl: "/images/xbox.jpg",
    rating: 4.4,
  },

  {
    name: "Cubonic Rediscover",
    description: "Compact next-gen gaming console with retro design. Dedicated handheld gaming device with extensive library. Portable gaming with excellent screen quality. Perfect for gaming on the go. Long battery life.",
    price: 5499,
    stock: 20,
    category: "Consoles",
    brand: "Cubonic",
    imageUrl: "/images/handheld-console.jpg",
    rating: 3.9,
  },

  // ===== SMART DEVICES / WEARABLES =====
  {
    name: "Samsung Galaxy Watch 6",
    description: "Fitness tracking smartwatch with GPS. Health monitoring including heart rate and SpO2. Multiple sport modes for tracking workouts. AMOLED display for vibrant visuals. Water-resistant for swimming.",
    price: 13999,
    stock: 30,
    category: "Wearables",
    brand: "Samsung",
    imageUrl: "/images/smartwatch.jpg",
    rating: 4.4,
  },

  {
    name: "Apple Watch Series 11",
    description: "Advanced smartwatch with health and fitness features. Always-on Retina display with extended battery. ECG and blood oxygen monitoring. Fall detection and emergency SOS. Seamless iPhone integration.",
    price: 49900,
    stock: 20,
    category: "Wearables",
    brand: "Apple",
    imageUrl: "/images/apple-watch.jpg",
    rating: 4.6,
  },

  {
    name: "Titan Crest 2.0",
    description: "Smartwatch with health monitoring features. Sleep tracking with detailed insights. Heart rate and stress monitoring. Stylish minimalist design. Multi-day battery life.",
    price: 6499,
    stock: 30,
    category: "Wearables",
    brand: "Titan",
    imageUrl: "/images/titan.jpg",
    rating: 4.2,
  },

  {
    name: "AirPods 4",
    description: "Wireless earbuds with high-quality sound. Active noise cancellation for immersive listening. Adaptive audio that adjusts to your environment. Seamless iPhone integration. Up to 30 hours listening time with case.",
    price: 16999,
    stock: 35,
    category: "Wearables",
    brand: "Apple",
    imageUrl: "/images/airpods-4.jpg",
    rating: 4.5,
  },

  {
    name: "OnePlus Buds 4",
    description: "True wireless earbuds with ANC support. Hybrid noise cancellation for better experience. 48-hour battery life with charging case. Clear call quality with dual microphones. Affordable premium earbuds.",
    price: 4999,
    stock: 40,
    category: "Wearables",
    brand: "OnePlus",
    imageUrl: "/images/oneplus-buds.jpg",
    rating: 4.2,
  },

  {
    name: "Fitness Tracker",
    description: "Waterproof fitness tracker with heart rate monitor. All-day activity tracking monitors steps and calories. Sleep quality analysis for better rest. Water-resistant for swimming and water sports.",
    price: 2999,
    stock: 25,
    category: "Wearables",
    brand: "Fitbit",
    imageUrl: "/images/fitness-tracker.jpg",
    rating: 4.1,
  },
];

function getRandomRating() {
  // more values near 4.5-5.0 while allowing lower 4.0
  const value = 4 + Math.pow(Math.random(), 1.7); // 4.0..5.0 (skew to higher)
  return Math.round(value * 10) / 10;
}

function generateReviews(productName, baseRating = 4.2) {
  const reviewers = ["Naveen", "Priya", "Anik", "Neha", "Rohit", "Aditi", "Vijay", "Kavita"];
  const positive = [
    { title: "Amazing product", comment: "Been using this for weeks and it exceeds expectations." },
    { title: "Excellent value", comment: "Great performance and quality for the price." },
    { title: "Super happy", comment: "Quick setup and smooth usage. Highly recommend." },
    { title: "Strong build", comment: "Sturdy and reliable, performs flawlessly." },
    { title: "Perfect fit", comment: "Exactly what I needed for my setup." },
  ];
  const neutral = [
    { title: "Good overall", comment: "Workable product, but there is room for improvement." },
    { title: "Decent", comment: "Does the job; some features could be better." },
    { title: "Fair deal", comment: "Not bad, but not great either." },
    { title: "Okay experience", comment: "Standard product with average performance." },
  ];
  const negative = [
    { title: "Not satisfied", comment: "Build quality and support need work." },
    { title: "Could be better", comment: "Some hiccups in performance, but manageable." },
    { title: "Disappointing", comment: "Expectations were higher for the price." },
  ];

  const total = Math.floor(Math.random() * 6) + 5; // 5-10
  const reviews = [];
  for (let i = 0; i < total; i++) {
    const roll = Math.random();
    let source;
    let rating;
    if (roll < 0.65) {
      source = positive;
      // strong positive around 4.2-5.0
      rating = Math.min(5, Math.max(4, Math.round((baseRating + Math.random() * 0.8) * 10) / 10));
    } else if (roll < 0.9) {
      source = neutral;
      // still decent 4.0-4.2 rather than mediocrity
      rating = Math.min(4.2, Math.max(4, Math.round((baseRating - 0.2 + Math.random() * 0.4) * 10) / 10));
    } else {
      source = negative;
      // mild negatives but still close to 4 in worst case
      rating = Math.min(4.2, Math.max(3.5, Math.round((3.5 + Math.random() * 0.7) * 10) / 10));
    }
    const val = source[Math.floor(Math.random() * source.length)];
    reviews.push({
      reviewer: reviewers[Math.floor(Math.random() * reviewers.length)],
      rating: Math.min(5, Math.max(1, Math.round(rating * 10) / 10)),
      title: val.title,
      comment: val.comment,
      verified: Math.random() > 0.3,
      helpful: Math.floor(Math.random() * 30),
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000),
    });
  }
  return reviews;
}

// Function to infer brand if not already specified
function inferBrand(productName = "", category = "") {
  if (product.brand) return product.brand;
  const name = productName.toLowerCase();
  if (name.includes("intel")) return "Intel";
  if (name.includes("amd") || name.includes("ryzen")) return "AMD";
  if (name.includes("nvidia") || name.includes("rtx")) return "NVIDIA";
  if (name.includes("asus")) return "ASUS";
  if (name.includes("msi")) return "MSI";
  if (name.includes("lenovo")) return "Lenovo";
  if (name.includes("apple") || name.includes("mac")) return "Apple";
  if (name.includes("hp")) return "HP";
  if (name.includes("dell")) return "Dell";
  if (name.includes("acer")) return "Acer";
  if (category === "Laptops") return "Generic Laptop Brand";
  if (category === "PCs") return "Build Bazaar";
  if (category === "Monitors") return "Generic Monitor Brand";
  return "Generic";
}

function buildSpecifications(product = {}) {
  return {
    model: product.name || "Unknown Model",
    warranty: "1 year",
    stockStatus: product.stock > 0 ? "in-stock" : "out-of-stock",
  };
}

function buildCompatibility(product = {}) {
  const name = (product.name || "").toLowerCase();

  if (name.includes("cpu intel")) {
    return { socket: "LGA1700", ramType: "DDR5", wattage: "125W" };
  }
  if (name.includes("cpu amd") || name.includes("ryzen")) {
    return { socket: "AM5", ramType: "DDR5", wattage: "105W" };
  }
  if (name.includes("motherboard")) {
    const isB450 = name.includes("b450");
    return {
      socket: isB450 ? "AM4" : "AM5",
      ramType: isB450 ? "DDR4" : "DDR5",
      wattage: "N/A",
    };
  }
  if (name.includes("psu")) {
    const wattageMatch = product.name.match(/(\d+)\s*W/i);
    return {
      socket: "N/A",
      ramType: "N/A",
      wattage: wattageMatch ? `${wattageMatch[1]}W` : "650W",
    };
  }

  return {};
}

// Add random ratings and reviews to all products
const productsWithRatings = sampleProducts.map((product) => {
  const category = Array.isArray(product.category)
    ? product.category[0] || ""
    : product.category || "";

  const rating = product.rating || getRandomRating();

  return {
    ...product,
    category,
    brand: product.brand || inferBrand(product.name, category),
    specifications: product.specifications || buildSpecifications(product),
    compatibility: product.compatibility || buildCompatibility(product),
    rating,
    reviews: generateReviews(product.name, rating),
  };
});

async function seedProducts() {
  try {
    await mongoose.connect("mongodb://localhost:27017/buildbazaar");
    console.log("Connected to MongoDB");

    // Clear existing products
    await Product.deleteMany({});
    console.log("Cleared existing products");

    // Insert sample products with ratings
    const products = await Product.insertMany(productsWithRatings);
    console.log(`Inserted ${products.length} products with random ratings`);

    console.log("Products seeded successfully!");
  } catch (error) {
    console.error("Error seeding products:", error);
  } finally {
    await mongoose.connection.close();
    console.log("Database connection closed");
  }
}

seedProducts();
