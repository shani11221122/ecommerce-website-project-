# ⚡ ElectroHub — Electronics E-Commerce Store

A full-stack electronics e-commerce web application built with React.js (Vite) + Node.js + Express.js.

---

## 📁 Project Structure

```
ecommerce-project/
├── backend/
│   ├── controllers/
│   │   ├── productController.js
│   │   └── cartController.js
│   ├── data/
│   │   └── products.js          ← 12 electronics products
│   ├── routes/
│   │   ├── products.js
│   │   └── cart.js
│   ├── server.js
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── Footer.jsx
    │   │   ├── HeroSection.jsx
    │   │   ├── ProductCard.jsx
    │   │   ├── PromoBanner.jsx
    │   │   └── ToastContainer.jsx
    │   ├── context/
    │   │   └── CartContext.jsx
    │   ├── pages/
    │   │   ├── HomePage.jsx
    │   │   ├── ProductsPage.jsx
    │   │   ├── ProductDetailPage.jsx
    │   │   ├── CartPage.jsx
    │   │   └── CheckoutPage.jsx
    │   ├── services/
    │   │   └── api.js
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── vite.config.js
    └── package.json
```

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js v18+ installed
- npm v9+ installed

---

### Step 1 — Install Backend Dependencies

```bash
cd ecommerce-project/backend
npm install
```

### Step 2 — Install Frontend Dependencies

```bash
cd ecommerce-project/frontend
npm install
```

---

## ▶️ Running the Application

You need **two terminal windows** running simultaneously.

### Terminal 1 — Start Backend Server

```bash
cd ecommerce-project/backend
node server.js
```

Backend runs at: **http://localhost:5000**

---

### Terminal 2 — Start Frontend Dev Server

```bash
cd ecommerce-project/frontend
npm run dev
```

Frontend runs at: **http://localhost:5173**

---

## 🌐 Open in Browser

Navigate to: **http://localhost:5173**

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products (supports ?category, ?search, ?sort) |
| GET | `/api/products/featured` | Get featured products |
| GET | `/api/products/categories` | Get all categories |
| GET | `/api/products/:id` | Get product by ID |
| GET | `/api/cart` | Get current cart |
| POST | `/api/cart` | Add item to cart |
| PUT | `/api/cart/:productId` | Update cart item quantity |
| DELETE | `/api/cart/:productId` | Remove item from cart |
| DELETE | `/api/cart/clear` | Clear entire cart |

---

## 🛍️ Features

### Pages
- **Home** — Hero, featured products, categories, promo banner with live countdown
- **Products** — Grid with sidebar filtering by category, search, and sorting
- **Product Detail** — Image gallery, specs, add to cart, related products
- **Cart** — Quantity controls, remove items, order summary
- **Checkout** — 3-step form (Shipping → Payment → Review) with order confirmation

### E-Commerce Features
- ✅ Add to cart with toast notifications
- ✅ Cart state management (React Context + REST API)
- ✅ Quantity update and item removal
- ✅ Order summary with tax and shipping calculation
- ✅ Full checkout flow UI
- ✅ Payment method selection (Visa, Mastercard, PayPal, JazzCash, EasyPaisa, Bank Transfer)
- ✅ Product search and filtering
- ✅ Category browsing

### Design
- Dark tech-forward aesthetic
- Outfit + DM Sans typography
- Smooth hover animations
- Fully responsive (mobile, tablet, desktop)
- Professional navbar with cart badge
- Sticky sidebar with filters

---

## 💰 Prices

All prices displayed in **Pakistani Rupees (PKR)**.

---

## 🛒 Product Categories

- 💻 Laptops (MacBook Pro, Dell XPS, ThinkPad)
- 📱 Smartphones (iPhone 15 Pro, Samsung S24 Ultra, OnePlus 12)
- 📷 Cameras (Sony A7 IV, Nikon Z8)
- 🎧 Headphones (Sony WH-1000XM5, AirPods Pro)
- 🖥️ Monitors (ASUS ROG Gaming Monitor)
- 📺 Smart TVs (Samsung QLED 65")

---

## ⚡ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, React Router v6 |
| Styling | Custom CSS (CSS Variables Design System) |
| HTTP Client | Axios |
| Icons | Lucide React |
| Backend | Node.js, Express.js |
| Data | In-memory JSON array |
| API Style | REST |

---

*Built for ElectroHub — Pakistan's Premier Electronics Store* 🇵🇰
