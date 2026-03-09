const products = [
  {
    id: "1",
    name: "Apple MacBook Pro 16\" M3 Pro",
    category: "laptops",
    price: 549999,
    originalPrice: 599999,
    rating: 4.9,
    reviewCount: 1284,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80",
      "https://images.unsplash.com/photo-1611186871525-1ead00f44b39?w=800&q=80",
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&q=80"
    ],
    description: "The most powerful MacBook Pro ever. Featuring the M3 Pro chip with up to 18-core CPU and 30-core GPU, 36GB unified memory, and a stunning 16-inch Liquid Retina XDR display with ProMotion technology. Perfect for professional video editing, 3D rendering, and software development.",
    specs: {
      "Processor": "Apple M3 Pro (18-core CPU)",
      "RAM": "36GB Unified Memory",
      "Storage": "512GB SSD",
      "Display": "16.2\" Liquid Retina XDR",
      "Battery": "Up to 22 hours",
      "OS": "macOS Sonoma"
    },
    inStock: true,
    badge: "Best Seller",
    featured: true
  },
  {
    id: "2",
    name: "Samsung Galaxy S24 Ultra",
    category: "phones",
    price: 319999,
    originalPrice: 349999,
    rating: 4.8,
    reviewCount: 3421,
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&q=80",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80",
      "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=800&q=80"
    ],
    description: "Galaxy S24 Ultra redefines mobile photography with its 200MP camera system and integrated S Pen. Powered by Snapdragon 8 Gen 3, featuring AI-enhanced photography, 12GB RAM, and a massive 5000mAh battery that keeps you going all day.",
    specs: {
      "Processor": "Snapdragon 8 Gen 3",
      "RAM": "12GB",
      "Storage": "256GB",
      "Display": "6.8\" Dynamic AMOLED 2X",
      "Camera": "200MP + 12MP + 10MP + 10MP",
      "Battery": "5000mAh"
    },
    inStock: true,
    badge: "Hot Deal",
    featured: true
  },
  {
    id: "3",
    name: "Sony WH-1000XM5 Headphones",
    category: "headphones",
    price: 89999,
    originalPrice: 109999,
    rating: 4.9,
    reviewCount: 8762,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80"
    ],
    description: "Industry-leading noise cancellation with the new Integrated Processor V1. Eight microphones and two processors auto-optimize noise cancellation based on your environment. 30-hour battery life with quick charge technology — 3 minutes of charge gives 3 hours of playback.",
    specs: {
      "Driver": "30mm",
      "Frequency": "4Hz - 40,000Hz",
      "Battery": "30 hours",
      "Charging": "USB-C, 3 min = 3 hours",
      "Weight": "250g",
      "Connectivity": "Bluetooth 5.2"
    },
    inStock: true,
    badge: "Editor's Choice",
    featured: true
  },
  {
    id: "4",
    name: "Sony Alpha A7 IV Mirrorless Camera",
    category: "cameras",
    price: 439999,
    originalPrice: 469999,
    rating: 4.8,
    reviewCount: 2156,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80",
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&q=80",
      "https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?w=800&q=80"
    ],
    description: "The A7 IV features a newly developed 33MP back-illuminated full-frame CMOS sensor for both stills and video, delivering high-resolution images even in challenging lighting conditions. With 4K 60p video recording and AI-powered autofocus.",
    specs: {
      "Sensor": "33MP Full-Frame BSI CMOS",
      "ISO": "100-51,200 (expandable)",
      "AF Points": "759 Phase Detection",
      "Video": "4K 60p",
      "Stabilization": "5-axis IBIS",
      "Battery": "NP-FZ100"
    },
    inStock: true,
    badge: "Pro Choice",
    featured: true
  },
  {
    id: "5",
    name: "Dell XPS 15 OLED Laptop",
    category: "laptops",
    price: 419999,
    originalPrice: 459999,
    rating: 4.7,
    reviewCount: 1893,
    image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&q=80",
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&q=80",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80"
    ],
    description: "Experience stunning OLED visuals with the Dell XPS 15. Featuring a 3.5K OLED touch display with 100% DCI-P3 color coverage, Intel Core i9 processor, NVIDIA GeForce RTX 4060, and up to 64GB DDR5 RAM for exceptional performance.",
    specs: {
      "Processor": "Intel Core i9-13900H",
      "RAM": "32GB DDR5",
      "Storage": "1TB NVMe SSD",
      "Display": "15.6\" 3.5K OLED Touch",
      "GPU": "NVIDIA RTX 4060",
      "Battery": "Up to 13 hours"
    },
    inStock: true,
    badge: "New Arrival",
    featured: false
  },
  {
    id: "6",
    name: "Apple AirPods Pro (2nd Gen)",
    category: "headphones",
    price: 79999,
    originalPrice: 89999,
    rating: 4.8,
    reviewCount: 12453,
    image: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=800&q=80",
      "https://images.unsplash.com/photo-1603351154351-5e2d0600bb77?w=800&q=80",
      "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=800&q=80"
    ],
    description: "AirPods Pro now feature the Apple H2 chip, delivering next-level Active Noise Cancellation, Adaptive Audio, and Personalized Spatial Audio. With up to 6 hours of listening time and 30 hours total with the MagSafe charging case.",
    specs: {
      "Chip": "Apple H2",
      "ANC": "Up to 2x more noise reduction",
      "Battery": "6 hours + 24 hours (case)",
      "Charging": "MagSafe / Lightning",
      "Water Resistance": "IPX4",
      "Connectivity": "Bluetooth 5.3"
    },
    inStock: true,
    badge: "Top Rated",
    featured: false
  },
  {
    id: "7",
    name: "iPhone 15 Pro Max",
    category: "phones",
    price: 429999,
    originalPrice: 449999,
    rating: 4.9,
    reviewCount: 5632,
    image: "https://images.unsplash.com/photo-1696446702183-079d87ce3588?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1696446702183-079d87ce3588?w=800&q=80",
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&q=80",
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&q=80"
    ],
    description: "iPhone 15 Pro Max. Forged in titanium and featuring the groundbreaking A17 Pro chip, a customizable Action button, and the most powerful iPhone camera system ever. The 5x telephoto camera lets you zoom in on faraway subjects.",
    specs: {
      "Chip": "A17 Pro (3nm)",
      "RAM": "8GB",
      "Storage": "256GB",
      "Display": "6.7\" Super Retina XDR ProMotion",
      "Camera": "48MP Main + 12MP Ultra + 12MP 5x Tele",
      "Battery": "Up to 29 hours video"
    },
    inStock: true,
    badge: "Premium",
    featured: true
  },
  {
    id: "8",
    name: "ASUS ROG Swift 4K Gaming Monitor",
    category: "monitors",
    price: 189999,
    originalPrice: 219999,
    rating: 4.7,
    reviewCount: 987,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80",
      "https://images.unsplash.com/photo-1616763355548-1b606f439f86?w=800&q=80",
      "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=800&q=80"
    ],
    description: "Dominate your game with the ROG Swift OLED 27\" gaming monitor featuring 4K resolution, 240Hz refresh rate, 0.03ms GtG response time, and NVIDIA G-SYNC Ultimate. Experience HDR gaming with perfect blacks and vibrant colors.",
    specs: {
      "Panel": "27\" OLED",
      "Resolution": "3840x2160 (4K)",
      "Refresh Rate": "240Hz",
      "Response Time": "0.03ms GtG",
      "HDR": "HDR10, VESA DisplayHDR TrueBlack 400",
      "Ports": "2x HDMI 2.1, DisplayPort 1.4"
    },
    inStock: true,
    badge: "Gaming",
    featured: false
  },
  {
    id: "9",
    name: "Nikon Z8 Mirrorless Camera",
    category: "cameras",
    price: 619999,
    originalPrice: 649999,
    rating: 4.9,
    reviewCount: 743,
    image: "https://images.unsplash.com/photo-1607462109225-6b64ae2dd3cb?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1607462109225-6b64ae2dd3cb?w=800&q=80",
      "https://images.unsplash.com/photo-1617528586316-2cb4e61b4a35?w=800&q=80",
      "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&q=80"
    ],
    description: "The Nikon Z8 delivers flagship-level performance in a compact body. With a 45.7MP stacked CMOS sensor, 8K video recording, and subject recognition AF, this camera excels in both professional photography and videography.",
    specs: {
      "Sensor": "45.7MP Stacked CMOS",
      "ISO": "64-25,600",
      "Burst": "20fps RAW",
      "Video": "8K/60p RAW",
      "Stabilization": "6-axis IBIS",
      "Mount": "Nikon Z"
    },
    inStock: true,
    badge: "Flagship",
    featured: false
  },
  {
    id: "10",
    name: "Lenovo ThinkPad X1 Carbon Gen 12",
    category: "laptops",
    price: 379999,
    originalPrice: 409999,
    rating: 4.7,
    reviewCount: 2341,
    image: "https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=800&q=80",
      "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&q=80",
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&q=80"
    ],
    description: "The legendary ThinkPad X1 Carbon Gen 12 is the ultimate business ultrabook. Weighing just 1.12kg with Intel Core Ultra 7 processor, 32GB LPDDR5X RAM, and a 14\" IPS display with 2.8K resolution. MIL-SPEC tested for durability.",
    specs: {
      "Processor": "Intel Core Ultra 7 165U",
      "RAM": "32GB LPDDR5X",
      "Storage": "1TB PCIe 4.0 SSD",
      "Display": "14\" 2.8K IPS",
      "Weight": "1.12kg",
      "Battery": "Up to 15 hours"
    },
    inStock: true,
    badge: "Business",
    featured: false
  },
  {
    id: "11",
    name: "Samsung 65\" 4K QLED Smart TV",
    category: "tvs",
    price: 279999,
    originalPrice: 329999,
    rating: 4.6,
    reviewCount: 3124,
    image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800&q=80",
      "https://images.unsplash.com/photo-1461151304267-38535e780c79?w=800&q=80",
      "https://images.unsplash.com/photo-1571415060716-baff5f717c37?w=800&q=80"
    ],
    description: "Transform your living room with Samsung's 65\" QLED 4K Smart TV. Featuring Quantum Dot technology for 100% color volume, Neo Quantum Processor 4K, and Tizen smart OS with built-in voice assistants for seamless streaming.",
    specs: {
      "Display": "65\" QLED 4K",
      "Resolution": "3840x2160",
      "HDR": "HDR10+, HLG",
      "Refresh Rate": "120Hz",
      "Smart OS": "Tizen",
      "Ports": "4x HDMI, 3x USB"
    },
    inStock: true,
    badge: "Sale",
    featured: false
  },
  {
    id: "12",
    name: "OnePlus 12 5G",
    category: "phones",
    price: 129999,
    originalPrice: 149999,
    rating: 4.7,
    reviewCount: 4213,
    image: "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=800&q=80",
      "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=800&q=80",
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&q=80"
    ],
    description: "OnePlus 12 packs flagship performance at a competitive price. Featuring Snapdragon 8 Gen 3, a Hasselblad-tuned 50MP triple camera, 100W SUPERVOOC charging, and a smooth 120Hz ProXDR display. Performance without compromise.",
    specs: {
      "Processor": "Snapdragon 8 Gen 3",
      "RAM": "12GB",
      "Storage": "256GB",
      "Display": "6.82\" LTPO AMOLED 120Hz",
      "Camera": "50MP + 48MP + 64MP",
      "Charging": "100W SUPERVOOC"
    },
    inStock: true,
    badge: "Value Pick",
    featured: false
  }
];

module.exports = products;
